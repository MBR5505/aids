const User = require("../models/user.model.js");
bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const createJWT = require("../utils/jwt.token.js");
const createCookie = require("../utils/cookie.js");

const saltRounds = parseInt(process.env.SALT);

const authController = {
  login: async (req, res) => {
    // res.send("login");

    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    console.log(user);
    let hashedPassword = user.password;
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
    console.log(isPasswordCorrect);

    if (isPasswordCorrect) {

      createJWT(email, role);
      createCookie(res, jwtToken);

      res.status(202).send({ msg: "User found", user: user });
    } else {
      res.status(404).send({ msg: "User not found" });
    }
    // res.send(user);
  },
  register: (req, res) => {
    // res.send("register");
    const { email, password, repeatPassword } = req.body;

    let role = "user";

    if (password == repeatPassword) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) console.log(err, "Error");

        const user = new User({
          email: email,
          password: hash,
          role: role,
        });
        console.log(user);
        user.save();
        
        const jwtToken = createJWT(email, role);
        createCookie(res, jwtToken);
        // console.log(jwtToken, "JWT_Token");

        res.status(201).send({ msg: "User created", user: user });
      });
    } else {
      res.status(500).send({ msg: "Passwords do not match" });
    }
  },
};

module.exports = authController;