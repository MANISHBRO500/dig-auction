const socket = io(); // connect to server
let players = [];
let currentPlayerIndex = 0;

function saveTeams() {
  const teamAName = document.getElementById("teamAName").value;
  const teamABudget = parseFloat(document.getElementById("teamABudget").value);
  const teamBName = document.getElementById("teamBName").value;
  const teamBBudget = parseFloat(document.getElementById("teamBBudget").value);

  if (!teamAName || !teamBName || isNaN(teamABudget) || isNaN(teamBBudget)) {
    alert("Please fill in all team fields");
    return;
  }

  fetch("https://dig-auction.onrender.com/api/teams", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([
      { name: teamAName, budget: teamABudget },
      { name: teamBName, budget: teamBBudget }
    ])
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to save teams");
      return res.json();
    })
    .then(() => alert("Teams saved!"))
    .catch(err => {
      console.error("Save teams error:", err);
      alert("Error saving teams.");
    });
}

function addPlayer() {
  const name = document.getElementById("playerName").value;
  const price = parseFloat(document.getElementById("basePrice").value);
  if (!name || isNaN(price)) return alert("Fill player info");

  players.push({ name, basePrice: price });
  renderPlayerList();
  document.getElementById("playerName").value = "";
  document.getElementById("basePrice").value = "";
}

function renderPlayerList() {
  const ul = document.getElementById("players");
  ul.innerHTML = "";
  players.forEach((p, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${p.name} – ₹${p.basePrice}L`;
    ul.appendChild(li);
  });
}

function startAuction() {
  fetch("https://dig-auction.onrender.com/api/players", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(players)
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to send players");
      return res.json();
    })
    .then(() => {
      socket.emit("start-auction");
      alert("Auction started!");
    })
    .catch(err => {
      console.error("Start auction error:", err);
      alert("Error starting auction.");
    });
}

function nextPlayer() {
  socket.emit("next-player");
}

// Listen for auction updates
socket.on("auction-started", (player) => {
  document.getElementById("current-player-name").textContent = player.name;
  document.getElementById("current-player-price").textContent = `${player.basePrice} L`;
  document.getElementById("current-player-bidder").textContent = "Waiting for bids...";
});

socket.on("bid-updated", ({ playerName, amount, teamName }) => {
  document.getElementById("current-player-price").textContent = `${amount / 100} L`;
  document.getElementById("current-player-bidder").textContent = `Bid by: ${teamName}`;
});

socket.on("player-sold", ({ player, team }) => {
  document.getElementById("current-player-bidder").textContent = `✅ SOLD to ${team.name} for ₹${player.soldPrice}L`;

  // Optional: append to a sold players list
  const soldList = document.getElementById("sold-players");
  if (soldList) {
    const li = document.createElement("li");
    li.textContent = `${player.name} – ₹${player.soldPrice}L to ${team.name}`;
    soldList.appendChild(li);
  }
});
