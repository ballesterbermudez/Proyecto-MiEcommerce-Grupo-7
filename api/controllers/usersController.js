const { table } = require("console");
const fs = require("fs");
const path = require("path");

// FUNCIONES POR SI QUERES SACARLAS A OTRO ARCHIVO >>------------------

const readUserDB = (dataFile) => {
  const userDirectory = path.resolve(__dirname, "..", "data", dataFile);
  return JSON.parse(fs.readFileSync(userDirectory, "utf-8"));
};
const findByIdDB = (dataFile, id) => {
  const userDirectory = path.resolve(__dirname, "..", "data", dataFile);
  const data = JSON.parse(fs.readFileSync(userDirectory, "utf-8"));
  return data.find((ele) => ele.id === Number(id));
};
const writeUserDB = (dataFile, arr) => {
  const userDirectory = path.resolve(__dirname, "..", "data", dataFile);
  fs.writeFileSync(userDirectory, JSON.stringify(arr));
};

// ---------------------------------------------------------------------

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
          ok: false,
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
  createUser: (req, res) => {
    try {
      if (findByIdDB("users.json", req.body.id)) {
        res.status(412).json({
          ok: false,
          msg: `El usuario con id ${req.body.id} ya existe`,
        });
      } else if (
        req.body.id !== undefined &&
        req.body.email !== undefined &&
        req.body.username !== undefined &&
        req.body.password !== undefined &&
        req.body.firstname !== undefined &&
        req.body.lastname !== undefined &&
        req.body.role !== undefined
      ) {
        const users = readUserDB("users.json");
        const newUser = {
          id: req.body.id,
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          profilepic:
            req.body.profilepic === undefined ? null : req.body.profilepic,
          role: req.body.role,
          cart: [],
        };

        users.push(newUser);
        console.log("func");
        writeUserDB("users.json", users);

        res.status(200).json({
          ok: true,
          msg: `El usuario ${req.body.firstname} se ha creado correctamente`,
          user: newUser,
        });
      } else {
        res.status(412).json({
          ok: false,
          msg: `El usuario debe tener los siguientes datos: id, email, username, password, firstname, lastname y role.`,
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
  editUser: (req, res) => {
    try {
      const userToEdit = findByIdDB("users.json", req.params.userId);

      if (userToEdit) {
        userToEdit.email =
          req.body.email === undefined ? this.email : req.body.email;
        userToEdit.username =
          req.body.username === undefined ? this.username : req.body.username;
        userToEdit.password =
          req.body.password === undefined ? this.password : req.body.password;
        userToEdit.firstname =
          req.body.firstname === undefined
            ? this.firstname
            : req.body.firstname;
        userToEdit.lastname =
          req.body.lastname === undefined ? this.lastname : req.body.lastname;
        userToEdit.profilepic =
          req.body.profilepic === undefined
            ? this.profilepic
            : req.body.profilepic;
        userToEdit.role =
          req.body.role === undefined ? this.role : req.body.role;

        const users = readUserDB("users.json");
        const newUserData = users.filter(
          (ele) => ele.id !== Number(req.params.userId)
        );
        newUserData.push(userToEdit);
        writeUserDB("users.json", newUserData);

        res.status(200).json({
          ok: true,
          msg: `Usuario ${userToEdit.username} editado con exito`,
          user: userToEdit,
        });
      } else {
        res.status(404).json({
          ok: false,
          msg: `Usuario ${req.params.userId} no existe`,
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
  //HACER UPDATE CON BORRAR CARRITO ANTES DE BORRAR USER
  deleteUser: (req, res) => {
    try {
      const userToDelete = findByIdDB("users.json", req.params.userId);
      if (userToDelete) {
        const users = readUserDB("users.json");
        const newUserData = users.filter(
          (ele) => ele.id !== Number(req.params.userId)
        );
        writeUserDB("users.json", newUserData);
        res.status(200).json({
          ok: true,
          msg: `Se ha borrado el usuario.`,
          userDeleted: userToDelete,
        });
      } else {
        res.status(404).json({
          ok: false,
          msg: `El usuario con id ${req.params.userId} no existe.`,
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
