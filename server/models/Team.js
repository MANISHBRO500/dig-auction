// server/models/Team.js

const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  budget: { type: Number, required: true },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    }
  ]
});

module.exports = mongoose.model('Team', teamSchema);
