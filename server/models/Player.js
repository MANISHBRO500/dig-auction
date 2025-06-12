// server/models/Player.js

const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  basePrice: { type: Number, required: true },
  team: { type: String, default: null },
  soldPrice: { type: Number, default: null },
});

module.exports = mongoose.model('Player', playerSchema);
