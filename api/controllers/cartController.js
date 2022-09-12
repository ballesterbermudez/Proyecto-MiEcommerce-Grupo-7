const fs = require("fs");
const path = require("path");
function cargarUsuarios() {
  let retorno = undefined;
  try {
    retorno = JSON.parse(
      fs.readFileSync(path.resolve("./api/data/users.json"))
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Base de datos no encontrada" });
  }
  return retorno;
}
let users = cargarUsuarios();

function getCarrito(req, res) {
  const { id } = req.params;
  const user = users.find((el) => el.id === Number(id));
  if (user) {
    res.status(200).json(user.cart);
  } else {
    res.status(404).json({ msg: `Usuario con id ${id} no fue encontrado` });
  }
}

function putCarrito(req, res) {
  const { id } = req.params;
  const user = users.find((el) => el.id === Number(id));
  if (user) {
    user.cart = req.body;
    res.status(200).json({
      msg: "Carrito modificado",
      cart: user.cart,
    });
  } else {
    res.status(404).json({ msg: `Usuario con id ${id} no fue encontrado` });
  }
}

module.exports = { getCarrito, putCarrito };
