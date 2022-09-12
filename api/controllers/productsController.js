const fs = require('fs');
const path = require('path');

const directory = path.resolve(__dirname,"..","data","products.json")

const controller = {

        //retorna la lista de los productos
    list: (req,resp) => {

         try{
            
           
            const file =  fs.readFileSync(directory);
            const data = JSON.parse( file);
          

            resp.status(200).json(data);

         }catch(error){
            resp.status(500).json( {message : "No se pudo acceder a la informacion"});
         }
        },
    
        //retorna los detalles de un producto
    details: (req,resp) =>{

        try{

            const file =  fs.readFileSync(directory);
            const data = JSON.parse( file);
            const prod = data.filter(el=>el.id == req.params.id);

            if(prod)
            {
                resp.status(200).json(prod);
            }
            else
            {
                resp.status(404).json({message: "Producto no encontrado"});
            }

         }catch(error){
            resp.status(500).json( {message : "No se pudo acceder a la informacion"});
         }

        } ,
            //crea un producto: requiere titulo y precio a travez de un middleware
        create: (req,resp) =>{

            let product = req.product;

            try{

                const file =  fs.readFileSync(directory);
                const data = JSON.parse( file);
                const id = data[data.length - 1].id + 1;

                let newProduct = {id, ...product}

                data.push(newProduct);

                fs.writeFileSync(directory,JSON.stringify(data));

                resp.status(200).json(newProduct);


            }catch(error){
                resp.status(500).json( {message : "Error interno del servidor"});
            }

        },
            //modifica un producto existente
        modify: (req,resp) => {

            try{


                const file =  fs.readFileSync(directory);
                let data = JSON.parse( file);
                let product = data.filter(el=>el.id == req.params.id);

                if(product.length > 0)
                {
                    let {...parametorsModificados} = req.body;

                    const modifiedProd = { ...product[0] , ...parametorsModificados }
                    
                    let newData = data.map(product => {
                        let prod;
                        if (product.id == modifiedProd.id) {
                           prod = modifiedProd;
                        } else {
                           prod =product;
                        }
                        return prod;})

                      

                    fs.writeFileSync(directory,JSON.stringify(newData))

                    resp.status(200).json(modifiedProd);
                }
                else
                {
                    resp.status(404).json({message: "Producto no encontrado"});
                }
               
                    //consultar respuesta 400

            }catch(error){
                resp.status(500).json( {message : "Error interno del servidor"});
            }


        },
            //MIDDLEWARE: chequea que los datos titulo y precio hayan sido pasados envia el producto armado a create
        chekData: (req,resp,next) => {

            let {title,price,description,image,gallery} = req.body;
            
            if(!title || !price)
            {
                resp.status(400).json({mssage: "Los valores  title y precio son obligatorios"})
            }
            else
            {
                req.product = {title,price,description,image,gallery}
                next();
            }
        }
}




module.exports = controller;