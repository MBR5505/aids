const jwt = require("jsonwebtoken");
require ("dotenv").config();

function createJWT(email, role) {
    const jwtToken = jwt.sign(
        { email: email, role: "user" },
        process.env.JWT_SECRET,
    );
    console.log(jwtToken);
    return jwtToken;
}

module.exports = createJWT;