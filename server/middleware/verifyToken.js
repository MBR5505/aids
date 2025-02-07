const jwt = require("jsonwebtoken")
const parser = require("cookie-parser")
require("dotenv").config

const User = require("../models/user.model.js") // Import the User model

async function verifyJWT(req, res, next) {
  const jsonwebtoken = req.cookies.jwt

  jwt.verify(jsonwebtoken, process.env.JWT_SECRET, (async (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(401).send({ msg: "user not authenticated" })
    }

    console.log(decoded);

    req.user = decoded
    try {
      const user = await User.findOne({ email: decoded.email })
      console.log(user, "USER2");
      req.user.id = user._id
    } catch (error) {
      console.log(error);
      res.status(404).send({ msg: "user not found" })
      return;
    }
  })).then(() => {
    next();
  })
}

module.exports = verifyJWT