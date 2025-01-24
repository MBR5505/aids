const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Tag = model("Tag", tagSchema);

module.exports = Tag;