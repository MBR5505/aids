const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const gameSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: false,
  },
  publisher: {
    type: String,
    required: true,
  },
  developer: {
    type: String,
    required: true, 
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  img: [
    {
        type: String,
        required: false,
    },
  ],
  tags: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: false,
    }
],
reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
            required: false,
        }
    ]
});

const Game = model("Game", gameSchema);

module.exports = Game;