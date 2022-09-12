const fs = require('fs');
const path = require('path')

const pictureController = {
    listPictures : (req, res) => {
        let idProd = req.query.product;
        let datosProd = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')), 'utf-8');
        let producto = datosProd.find(ele => ele.id == idProd);
        if(producto) {
            return res.status(200).json(producto.gallery)
        } else {
            return res.status(500).json('Server Error')
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
        
    },
    editPicture : (req, res) => {

    },
    deletePicture : (req, res) => {

    },
    getPicture : (id) => {
        let datosPictures = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/pictures.json')), 'utf-8');
        return datosPictures.find(ele => ele.id == id);
    }
}

module.exports = pictureController;