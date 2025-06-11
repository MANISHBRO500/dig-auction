// server/socket/socketHandler.js
const Player = require('../models/Player');
const Team = require('../models/Team');

let currentPlayerIndex = 0;
let players = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log("🟢 A user connected");

    socket.on("start-auction", async () => {
      players = await Player.find();
      io.emit("auction-started", players[currentPlayerIndex]);
    });

    socket.on("next-player", () => {
      currentPlayerIndex++;
      if (currentPlayerIndex < players.length) {
        io.emit("auction-next", players[currentPlayerIndex]);
      } else {
        io.emit("auction-finished");
      }
    });

    socket.on("place-bid", async ({ teamName, amount }) => {
      const team = await Team.findOne({ name: teamName });
      const player = players[currentPlayerIndex];

      if (team.budget >= amount) {
        team.budget -= amount;
        team.playersWon.push({ name: player.name, price: amount });
        await team.save();

        player.soldTo = teamName;
        player.soldPrice = amount;
        await player.save();

        io.emit("player-sold", { player, team });
      } else {
        socket.emit("error", "Not enough budget");
      }
    });
  });
};
