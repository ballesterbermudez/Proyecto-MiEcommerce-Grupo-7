const express = require("express");
const route = express.Router();
const cartController = require("../controllers/cartController");

route.get("/:id/cart", cartController.getCarrito);
route.put("/:id/cart", cartController.putCarrito);

module.exports = route;
