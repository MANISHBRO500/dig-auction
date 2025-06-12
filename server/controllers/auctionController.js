// server/controllers/auctionController.js
const Team = require("../models/Team");
const Player = require("../models/Player");

// Save teams
exports.saveTeams = async (req, res) => {
  try {
    await Team.deleteMany(); // clear existing teams
    const teams = await Team.insertMany(req.body);
    res.status(201).json(teams);
  } catch (err) {
    console.error("Error saving teams:", err);
    res.status(500).json({ error: "Failed to save teams" });
  }
};

// Save players
exports.savePlayers = async (req, res) => {
  try {
    await Player.deleteMany(); // clear previous players
    const players = await Player.insertMany(req.body);
    res.status(201).json(players);
  } catch (err) {
    console.error("Error saving players:", err);
    res.status(500).json({ error: "Failed to save players" });
  }
};

// Get all teams
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (err) {
    console.error("Error fetching teams:", err);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
};
