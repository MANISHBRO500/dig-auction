// server/server.js
const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const auctionRoutes = require("./routes/auctionRoutes");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*" }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api", auctionRoutes);

// Sockets
require("./socket/socketHandler")(io);

// Start server
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
