const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const verifyJWT = require("../middleware/verifyToken");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/user",verifyJWT, authController.user);


module.exports = router;