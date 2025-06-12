const Player = require("../models/Player");

exports.savePlayers = async (req, res) => {
  try {
    await Player.deleteMany(); // Clear existing players if needed
    await Player.insertMany(req.body);
    res.status(201).json({ message: "Players saved" });
  } catch (err) {
    console.error("Save players error:", err);
    res.status(500).json({ error: "Failed to save players" });
  }
};
