const express = require('express');
const route = express.Router();


route.get('/', ()=>{});
route.get('/:id', ()=>{});
route.post('/', ()=>{});
route.put('/:id', ()=>{});
route.get('/search', ()=>{});
route.get('/mostwanted', ()=>{});
route.delete('/:id', ()=>{});


module.exports = route