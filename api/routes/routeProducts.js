const express = require('express');
const route = express.Router();
const controller = require('../controllers/productsController');


route.get('/', controller.list);
route.get('/:id', controller.details);
route.post('/', controller.chekData, controller.create);
route.put('/:id', controller.modify);
route.get('/search', ()=>{});
route.get('/mostwanted', ()=>{});
route.delete('/:id', ()=>{});


module.exports = route