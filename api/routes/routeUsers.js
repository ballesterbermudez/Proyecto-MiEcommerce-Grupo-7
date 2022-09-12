const express = require('express');
const route = express.Router();
const usersController = require('../controllers/usersController');

route.get('/', usersController.listUsers);
route.get('/:userId', usersController.findUserById);
route.post('/', usersController.createUser);
route.put('/:userId', usersController.editUser);

module.exports = route;