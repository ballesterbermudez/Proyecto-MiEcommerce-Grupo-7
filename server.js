const express = require("express");
const app = express();
const routeCarts = require("./api/routes/routeCarts");
const routeLogin = require("./api/routes/routeLogin");
const routePictures = require("./api/routes/routePictures");
const routeProducts = require("./api/routes/routeProducts");
const routeUsers = require("./api/routes/routeUsers");
const verifyJWT = require('./api/middelware/verifyJWT');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
require("dotenv").config();

app.use(express.json());

// Home

app.get("/api/v1", (req, res) => {
  res.status(200).json("Bienvenido al inicio");
});

// Swagger - Documentacion api

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas

app.use("/api/v1/login", routeLogin);
app.use("/api/v1/pictures",verifyJWT, routePictures);
app.use("/api/v1/products",verifyJWT, routeProducts);
app.use("/api/v1/users", routeUsers);
app.use("/api/v1/carts",verifyJWT, routeCarts);


// Server open

app.listen(process.env.PORT, () => {
  console.log("Se abrio correctamente en el puerto " + process.env.PORT);
});

// Redireccionamiento de pagina

app.get("*", (req, res) => {
  res.redirect("/api/v1");
});
