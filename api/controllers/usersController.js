const fs = require("fs");
const path = require("path");

//FUNCIONES POR SI QUERES SACARLAS A OTRO ARCHIVO
const readUserDB = (dataFile) => {
  const userDirectory = path.resolve(__dirname, "..", "data", dataFile);
  return JSON.parse(fs.readFileSync(userDirectory, "utf-8"));
};
const findByIdDB = (dataFile, id) => {
  const userDirectory = path.resolve(__dirname, "..", "data", dataFile);
  const data = JSON.parse(fs.readFileSync(userDirectory, "utf-8"));
  return data.find((ele) => ele.id === Number(id));
};

const usersController = {
  listUsers: (req, res) => {
    try {
      const users = readUserDB("users.json");
      res.status(200).json({
        ok: true,
        msg: "Lista de usuarios obtenida correctamente",
        users: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error al leer la base de datos",
      });
    }
  },
  findUserById: (req, res) => {
    try {
      const user = findByIdDB("users.json", req.params.userId);
      if (user) {
        res.status(200).json({
          ok: true,
          msg: "Usuario obtenido correctamente",
          users: user,
        });
      } else {
        res.status(401).json({
          ok: true,
          msg: `Usuario con id ${req.params.userId} no existe`,
          users: user,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error al leer la base de datos",
      });
    }
  },
};

module.exports = usersController;
