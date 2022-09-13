const express = require('express');
const route = express.Router();
const controller = require('../controllers/productsController');
const pictureController = require('../controllers/pictureController')


// alias pictures
route.get('/:id/pictures', pictureController.listPictures);

// rutas products
route.post('/', controller.chekData, controller.create);
route.put('/:id', controller.modify);
route.delete('/:id', controller.delete);
route.get('/search', controller.search);
route.get('/mostwanted', controller.mostwanted);
route.get('/:id', controller.details);
route.get('/', controller.list);



module.exports = route