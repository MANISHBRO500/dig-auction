const express = require("express");
const router = express.Router();
const auctionController = require("../controllers/auctionController");

router.post("/teams", auctionController.createTeams); // ✅ required

module.exports = router;
