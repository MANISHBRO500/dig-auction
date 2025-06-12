const Team = require("../models/Team");

exports.createTeams = async (req, res) => {
  try {
    await Team.deleteMany(); // optional: clear previous teams
    const teams = await Team.insertMany(req.body);
    res.status(201).json(teams);
  } catch (err) {
    res.status(500).json({ error: "Failed to save teams" });
  }
};
