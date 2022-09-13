const express = require("express");
const route = express.Router();
const cartController = require("../controllers/cartController");
const usersController = require("../controllers/usersController");
const {login} = require('../controllers/loginControllers');
const verifiers = require('../middelware/verifys');

//Rutas alias de carts
route.get("/:id/cart",verifiers.checkGetUsers, cartController.getCarrito);
route.put("/:id/cart",verifiers.checkUpdateUser, cartController.putCarrito);

//Rutas de users
route.get("/",verifiers.checkGetUsers, usersController.listUsers);
route.get("/:userId", verifiers.checkGetUsers,usersController.findUserById);
route.post("/", verifiers.checkUpdateUser,usersController.createUser);
route.put("/:userId",verifiers.checkUpdateUser, usersController.editUser);
route.delete("/:userId", verifiers.checkUpdateUser,usersController.deleteUser);

//Rutas alias de login
route.post('/login', login);

module.exports = route;
