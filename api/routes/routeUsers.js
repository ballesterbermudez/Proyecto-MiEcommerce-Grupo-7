const express = require("express");
const route = express.Router();
const cartController = require("../controllers/cartController");
const usersController = require("../controllers/usersController");
const {login} = require('../controllers/loginControllers');

//Rutas alias de carts
route.get("/:id/cart", cartController.getCarrito);
route.put("/:id/cart", cartController.putCarrito);

//Rutas de users
route.get("/", usersController.listUsers);
route.get("/:userId", usersController.findUserById);
route.post("/", usersController.createUser);
route.put("/:userId", usersController.editUser);
route.delete("/:userId", usersController.deleteUser);

//Rutas alias de login
route.post('/login', login);

module.exports = route;
