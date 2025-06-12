// server/models/Team.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: String,
  budget: Number,
  playersWon: [{ name: String, price: Number }]
});

module.exports = mongoose.model("Team", teamSchema);
