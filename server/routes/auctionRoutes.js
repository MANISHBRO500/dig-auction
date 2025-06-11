// server/routes/auctionRoutes.js
const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');

router.get("/teams", auctionController.getTeams);
router.get("/players", auctionController.getPlayers);

module.exports = router;
