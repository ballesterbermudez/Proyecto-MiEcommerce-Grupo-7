const jwt = require("jsonwebtoken");
const { request } = require("express");

const verifyJWT = async(req = request, res, next) => {
  const token=req.headers.token;
 
  try {
    const  tokens = await jwt.verify(token, process.env.JSON_AUTH);
    req.tokens = tokens;

    console.log(req.tokens)
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Token invalido",
    });
  }
};

module.exports = verifyJWT;
