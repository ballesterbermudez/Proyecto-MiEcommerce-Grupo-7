const express = require('express');
const route = express.Router();
const usersController = require('../controllers/usersController');

route.get('/', usersController.listUsers);
route.get('/:userId', usersController.findUserById)

module.exports = route;