const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const cors = require("cors")


const authRoutes = require("./routes/auth.routes");
const gameRoutes = require("./routes/game.routes");
const tagRoutes = require("./routes/tag.routes");
const reviewRoutes = require("./routes/review.routes");

const app = express();


let corsOptions = {
  origin: "process.env.CORS_ORIGIN",
  methods: "GET,PUT,POST,DELETE",
  credentials: true
}

app.use(cors(corsOptions))

app.use(cookieParser())

mongoose.connect(process.env.DB_URL);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/reviews", reviewRoutes)

app.get("/", (req, res) => {
  res.send("Hello chigga");
});

app.listen(process.env.PORT, () => {
  console.log(`Aids running on port ${process.env.PORT}`);
});