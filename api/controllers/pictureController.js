const e = require('express');
const fs = require('fs');
const path = require('path')

const pictureController = {
    listPictures : (req, res) => {
        let idProd = req.query.product;
        if(!idProd) {
            idProd = req.params.id;
            if(!idProd){
                return res.status(400).json('debe ingresar un id') 
            }
        }
        let datosProd = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')), 'utf-8');
        let producto = datosProd.find(ele => ele.id == idProd);
        if(producto) {
            return res.status(200).json(producto.gallery)
        } else {
            return res.status(404).json('No se encontro el producto')
        }
    },
    getPictureID : (req, res) => {
        let datosPictures = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/pictures.json')), 'utf-8');
        let picture = datosPictures.find(ele => ele.id == req.params.id);
        if(picture) {
            return res.status(200).json(picture);
        } else {
            return res.status(404).json('no se encontro la imagen')
        }
    },
    createPicture : (req, res) => {
        let id = req.body.id;
        let url = req.body.url;
        let descripcion = req.body.descripcion;
        if(!id || !url) {
            return res.status(400).json('debe ingresar los datos correctamente');
        }
        let picture = {
            id,
            url,
            descripcion,
        }
        let datosPictures = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/pictures.json')), 'utf-8');
        datosPictures.push(picture);
        fs.writeFileSync(path.resolve(__dirname, '../data/pictures.json'), JSON.stringify(datosPictures))
        res.status(200).json(picture);
    },
    editPicture : (req, res) => {
        let id = req.params.id;
        let encontre = false;
        let datosPictures = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/pictures.json')), 'utf-8');
        datosPictures.forEach(ele => {
            if(ele.id == id) {
                if(ele.url)
                    ele.url = req.body.url;
                else 
                    return res.status(400).json('debe ingresar una url')
                if(ele.descripcion)
                    ele.descripcion = req.body.descripcion
                encontre = true;
            }
        });
        if(!encontre) {
            return res.status(404).json('no se encontro la imagen')
        }
        fs.writeFileSync(path.resolve(__dirname, '../data/pictures.json'), JSON.stringify(datosPictures))
        let picture = {
            id,
            url: req.body.url,
            descripcion: req.body.descripcion,
        }
        res.status(200).json(picture);
    },
    deletePicture : (req, res) => {
        let id = req.params.id;
        if(!id) {
            res.status(400).json('debe ingresar un id')
        }
        let datosPictures = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/pictures.json')), 'utf-8');
        let picture;
        let pictures = datosPictures.filter(ele => {
            if(ele.id != id)
                return ele
            else
                picture = ele;
        });
        if(datosPictures.length == pictures.length) {
            res.status(404).json('No se encontro la picture')
        }
        fs.writeFileSync(path.resolve(__dirname, '../data/pictures.json'), JSON.stringify(pictures))
        res.status(200).json(picture);
    },
    getPicture : (id) => {
        let datosPictures = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/pictures.json')), 'utf-8');
        return datosPictures.find(ele => ele.id == id);
    }
}

module.exports = pictureController;