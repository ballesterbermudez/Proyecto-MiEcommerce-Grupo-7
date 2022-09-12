const express = require('express');
const route = express.Router();
const usersController = require('../controllers/usersController');

route.get('/', usersController.listUsers)

module.exports = route;