const Team = require("../models/Team");

exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch teams" });
  }
};
