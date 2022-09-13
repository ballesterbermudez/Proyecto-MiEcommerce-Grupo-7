const listUsers = require("../data/users.json");

const generateJWT = require("../../helpers/generarToken");
const testRoles=(req,res)=>{
  console.log(listUsers)
  res.send(listUsers)
}
const login = async (req, res) => {

  const { username, password } = req.body;

  try {

    const user = listUsers.find(
      (user) => user.username == username && user.password == password
    );

    if (user != undefined) {
      const payload = {
        id: user.id,
        username: user.username,
        role: user.role,
      };

      res.status(200).json({
        success: true,
        message: "Authorized",
        user: {
          iduser: user.id,
          username: user.username,
        },
        token: await generateJWT(payload),
      });
      
    } else {
      res.status(400).json({
        ok: false,
        msg: "Este usuario no existe",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Login",
    });
  }
};

module.exports = {login,
testRoles}
