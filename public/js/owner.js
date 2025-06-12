const socket = io("https://dig-auction.onrender.com");
const teamName = prompt("Enter your team name:");
let teamBudget = 0;
let currentPlayer = {};
let wonPlayers = [];

fetch("https://dig-auction.onrender.com/api/teams")
  .then(res => {
    if (!res.ok) {
      throw new Error(`Failed to fetch teams: ${res.status} ${res.statusText}`);
    }
    return res.json();
  })
  .then(data => {
    const team = data.find(t => t.name === teamName);
    if (!team) return alert("Team not found!");
    teamBudget = team.budget;
    document.getElementById("team-name").textContent = `Your Team: ${team.name}`;
    document.getElementById("budget").textContent = teamBudget.toFixed(2);
  })
  .catch(err => {
    console.error("Fetch error:", err);
    alert("Failed to load teams. Please check your internet or try again later.");
  });

socket.on("auction-started", (player) => {
  currentPlayer = player;
  updateCurrentPlayerUI();
});

socket.on("auction-next", (player) => {
  currentPlayer = player;
  updateCurrentPlayerUI();
});

socket.on("player-sold", ({ player, team }) => {
  if (team.name === teamName) {
    wonPlayers.push({ name: player.name, price: player.soldPrice });
    teamBudget = team.budget;
    updateWonList();
  }
  updateCurrentPlayerUI();
});

function bid(amount, isCrAdd = false) {
  const bidAmount = isCrAdd ? 1 : amount / 100;
  if (teamBudget < bidAmount) return alert("Not enough budget");

  socket.emit("place-bid", {
    teamName,
    amount: isCrAdd ? 100 : amount
  });
}

function updateCurrentPlayerUI() {
  if (!currentPlayer.name) return;
  document.getElementById("current-player-name").textContent = currentPlayer.name;
  document.getElementById("current-player-price").textContent = currentPlayer.basePrice;
}

function updateWonList() {
  const list = document.getElementById("players-won-list");
  list.innerHTML = "";
  wonPlayers.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.name} – ₹${p.price}L`;
    list.appendChild(li);
  });
  document.getElementById("budget").textContent = teamBudget.toFixed(2);
}