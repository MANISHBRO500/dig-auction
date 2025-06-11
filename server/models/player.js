// server/models/Player.js
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  basePrice: Number,
  soldTo: String, // team name
  soldPrice: Number
});

module.exports = mongoose.model("Player", playerSchema);
