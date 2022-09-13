const fs = require('fs');
const path = require('path');
const picture = require('./pictureController')

const directory = path.resolve(__dirname,"..","data","products.json")

const controller = {

        //retorna la lista de los productos
    list: (req,resp) => {

         try{
            
           
            const file =  fs.readFileSync(directory);
            const data = JSON.parse( file);
            const category = req.query.category;

            if(category)
            {
                const info = data.filter(el => el.category == category)
                resp.status(200).json(info);
            }
            else
            {
                resp.status(200).json(data);
            }

            

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
                
                if(product.gallery.length > 0)
                {
                    
                     const newGallery = product.gallery.map(el=> {let pic = picture.getPicture(el);
                        console.log(pic)
                        return pic;
                    });
                    product.gallery = newGallery;
                }
               
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

                    if(parametorsModificados.precio)
                    {
                        if(Number(parametorsModificados.precio) < 0)
                        {
                            return req.status(401).json("Precio no puede ser negativo")
                        }
                    }

                    if(parametorsModificados.gallery)
                    {
                       parametorsModificados.gallery.map(el =>{
                           let picture = picture.getPicture(el);
                           return picture;
                       })
                    }
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
        //busca un producto a travez de una palabra clave
    search: (req,resp) => {

            const keyword = req.query.q;

           

        try{
            const file =  fs.readFileSync(directory);
            const data = JSON.parse( file);

            const info = data.filter(el=> {
                let ret;
                if(el.title.includes(keyword) )
                {
                    ret = el;
                }
                if(el.description)
                {
                    if(el.description.includes(keyword))
                        ret = el;
                }
                if(el.category)
                {
                    if(el.category.includes(keyword))
                        ret = el
                }
                return ret;
               
            })

            resp.status(300).json(info);

        }catch(error){
            resp.status(500).json({message : "Error interno", error: error.message})
        }
         



        },

    mostwanted: (req,resp) => {

        try{
            
           
            const file =  fs.readFileSync(directory);
            const data = JSON.parse( file);
          
            const info = data.filter(el => el.mostwanted == true)

            resp.status(200).json(info);

         }catch(error){
            resp.status(500).json( {message : "No se pudo acceder a la informacion"});
         }
    },

    //borra el producto con id pasado por parametro
    delete: (req,resp) => {
        try{
            
           
            const file =  fs.readFileSync(directory);
            const data = JSON.parse( file);
            const product = data.filter(el=>el.id == req.params.id);

            if(product.length > 0)
            {
                const newData = data.filter(el => el.id != req.params.id)
                fs.writeFileSync(directory,JSON.stringify(newData));
                resp.status(200).json(product);
            }
            else
            {
                resp.status(404).json({message: "no existe el articulo"})
            }
            

         }catch(error){
            resp.status(500).json( {message : "Error interno", message: error.message});
         }

    },

            //MIDDLEWARE: chequea que los datos titulo y precio hayan sido pasados envia el producto armado a create
    chekData: (req,resp,next) => {

            let {title,price,description,image,gallery,category, mostwanted, stock} = req.body;
            
            if(!title || !price)
            {
                resp.status(400).json({mssage: "Los valores  title y precio son obligatorios"})
            }
            else {
                if(Number(price) < 0)
                {
                    resp.status(401).json({mssage: "El precio no puede ser negativo"})
                }
                else
                {
                    req.product = {title,price,description,image,gallery,category, mostwanted, stock} 
                    next();
                }
            }
        }

    getProduct: (id) => {
        
        let retorno = null;

        try{
            const file =  fs.readFileSync(directory);
            const data = JSON.parse( file);
            const product = data.filter(el=>el.id == id);

            if(product.length > 0)
            {
                retorno = product[0];
            }
            else
            {
                retorno = -1;
            }

        }catch(error){
            retorno = -1;
        }
       return retorno;
    }
    
}




module.exports = controller;