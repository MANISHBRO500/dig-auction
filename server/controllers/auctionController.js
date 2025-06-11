// server/controllers/auctionController.js
const Player = require("../models/Player");
const Team = require("../models/Team");

exports.getTeams = async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
};

exports.getPlayers = async (req, res) => {
  const players = await Player.find();
  res.json(players);
};
