const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: String,
  basePrice: Number,
  soldPrice: Number,
  soldTo: String
});

module.exports = mongoose.model("Player", playerSchema);
