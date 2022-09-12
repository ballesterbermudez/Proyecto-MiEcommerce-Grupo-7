const express = require('express');
const app = express();
// const routeCarts = require('./api/routes/routeCarts');
// const routeLogin = require('./api/routes/routeLogin');
const routePictures = require('./api/routes/routePictures');
// const routeProducts = require('./api/routes/routeProducts');
// const routeUsers = require('./api/routes/routeUsers');
require('dotenv').config();

app.use(express.json());

app.get('/api/v1', (req, res) => {
    res.status(200).json('Bienvenido al inicio');
})

app.use('/pictures', routePictures)

app.listen(process.env.PORT, () => {
    console.log('Se abrio correctamente en el puerto ' + process.env.PORT);
})

app.get('*',(req, res) => {
    res.redirect('/api/v1');
});