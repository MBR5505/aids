const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth.routes");
const gameRoutes = require("./routes/game.routes");
const tagRoutes = require("./routes/tag.routes");

const app = express();

mongoose.connect(process.env.DB_URL);

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/tags", tagRoutes);

app.get("/", (req, res) => {
  res.send("Hello chigga");
});

app.listen(process.env.PORT, () => {
  console.log(`Aids running on port ${process.env.PORT}`);
});