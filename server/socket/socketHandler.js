const Player = require("../models/Player");
const Team = require("../models/Team");

let currentPlayerIndex = 0;
let players = [];
let currentBid = 0;
let lastBidder = null;
let timer = null;

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("start-auction", async () => {
      players = await Player.find();
      currentPlayerIndex = 0;
      startNextPlayer(io);
    });

    socket.on("next-player", () => {
      startNextPlayer(io);
    });

    socket.on("place-bid", async ({ teamName, amount }) => {
      if (!players[currentPlayerIndex]) return;

      const player = players[currentPlayerIndex];
      const team = await Team.findOne({ name: teamName });

      if (!team || team.budget < amount / 100) return;

      currentBid = amount;
      lastBidder = teamName;

      // Notify all clients of current updated bid
      io.emit("bid-updated", { playerName: player.name, amount, teamName });

      // Restart timer
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        sellPlayer(io, player, team);
      }, 3000); // 3 seconds timeout
    });
  });
};

async function startNextPlayer(io) {
  if (timer) clearTimeout(timer);
  if (currentPlayerIndex >= players.length) {
    io.emit("auction-complete");
    return;
  }

  currentBid = 0;
  lastBidder = null;

  const player = players[currentPlayerIndex];
  io.emit("auction-started", player);
}

async function sellPlayer(io, player, team) {
  const bidPrice = currentBid / 100;

  player.soldPrice = bidPrice;
  player.soldTo = team.name;
  await player.save();

  team.budget -= bidPrice;
  await team.save();

  io.emit("player-sold", { player, team });

  currentPlayerIndex++;
  setTimeout(() => startNextPlayer(io), 2000); // short delay before next player
}
