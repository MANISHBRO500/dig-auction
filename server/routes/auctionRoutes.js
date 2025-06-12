const express = require("express");
const router = express.Router();
const auctionController = require("../controllers/auctionController");

router.get("/teams", auctionController.getTeams); // ✅ this line is required

module.exports = router;
