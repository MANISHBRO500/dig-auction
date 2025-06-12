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
    .then(res => res.json())
    .then(() => alert("Teams saved!"));
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
  // send players to backend
  fetch("https://dig-auction.onrender.com/api/players", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(players)
  }).then(() => {
    socket.emit("start-auction");
    alert("Auction started!");
  });
}

function nextPlayer() {
  socket.emit("next-player");
}
