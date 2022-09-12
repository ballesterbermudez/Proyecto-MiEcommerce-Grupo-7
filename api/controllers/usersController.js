const fs = require('fs');
const path = require('path');
const userDirectory = path.resolve(__dirname, "..","data", "users.json");

const usersController = {
  listUsers: (req, res) => {
    try {
        const users = JSON.parse(fs.readFileSync(userDirectory, 'utf-8'));
        res.status(200).json({
            ok: true,
            msg: 'Lista de usuarios obtenida correctamente',
            users: users
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al leer la base de datos'
        })
    }
  },
};

module.exports = usersController;
