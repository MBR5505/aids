const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  recomended:{
    type: Boolean,
    required: true
  },
  stars: {
    type: Number,
    required: true,
    min: [1, "Enter from 1 to 5"],
    max: [6, "Enter from 1 to 5"],
  },
});

const Review = model("Review", reviewSchema);

module.exports = Review;