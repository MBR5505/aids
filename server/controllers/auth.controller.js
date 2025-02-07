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
      const jwtToken = await createJWT(email);
      createCookie(res, jwtToken);

      res.status(202).send({ msg: "Loading Profile...", user: user });
    } else {
      res.status(404).send({ msg: "User not found" });
    }
    // res.send(user);
  },
  register: async (req, res) => {
    try {
      const { email, password, confirmPassword } = req.body;
  
      let role = "user";
  
      console.log("register:", req.body);
  
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
  
      const hash = await bcrypt.hash(password, saltRounds);
      const user = new User({
        email: email,
        password: hash,
        role: role,
      });
      console.log(user);
      await user.save();
  
      const jwtToken = await createJWT(email);
      createCookie(res, jwtToken);
      // console.log(jwtToken, "JWT_Token");
  
      res.status(201).send({ msg: "User created", user: user });
    } catch (err) {
      console.error(err);
      res.status(500).send({ msg: "Error creating user" });
    }
  },
  user:(async(req, res) => {
    console.log(req.user, "USER");
    let email = req.user.email
    try {
      const user = await User.findOne({email: email})

      if(user){
        res.status(202).send({msg: "Loading Profile...", user: user})
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({msg: "bad req"})
    }
  })
};

module.exports = authController;