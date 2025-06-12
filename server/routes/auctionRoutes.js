// server/routes/auctionRoutes.js
const express = require("express");
const router = express.Router();
const auctionController = require("../controllers/auctionController");

// Save teams
router.post("/teams", auctionController.saveTeams);

// Save players
router.post("/players", auctionController.savePlayers);

// Get all teams
router.get("/teams", auctionController.getAllTeams);

// Export the router
module.exports = router;
