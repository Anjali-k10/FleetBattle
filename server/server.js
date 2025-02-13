const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 5000;
const rooms = {}; // Store active rooms

io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // Creating a new room
  socket.on("createRoom", () => {
    const roomId = Math.random().toString(36).substring(2, 8);
    
    // Ensure no duplicate roomId is generated
    while (rooms[roomId]) {
      roomId = Math.random().toString(36).substring(2, 8);
    }

    rooms[roomId] = { players: [socket.id] };
    socket.join(roomId);
    socket.emit("roomCreated", roomId);
    console.log(`🎉 Room Created: ${roomId} by ${socket.id}`);
  });

  // Joining an existing room
  socket.on("joinRoom", (roomId) => {
    console.log(`🔎 Player ${socket.id} attempting to join room: ${roomId}`);

    if (rooms[roomId]) {
      if (rooms[roomId].players.length < 2) {
        rooms[roomId].players.push(socket.id);
        socket.join(roomId);

        // Notify both players that the room is ready
        io.to(roomId).emit("playerJoined", roomId);

        console.log(`✅ Player ${socket.id} joined room: ${roomId}`);

        // If both players are in the room, start the game
        if (rooms[roomId].players.length === 2) {
          io.to(roomId).emit("startGame", roomId);
          console.log(`🎮 Game starting for room: ${roomId}`);
        }
      } else {
        console.log(`❌ Room ${roomId} is full!`);
        socket.emit("joinError", "Room is full!");
      }
    } else {
      console.log(`❌ Invalid Room ID attempted: ${roomId}`);
      socket.emit("joinError", "Invalid Room ID!");
    }
  });

  // Handling disconnection
  socket.on("disconnect", () => {
    console.log(`🚪 User disconnected: ${socket.id}`);
    
    for (const roomId in rooms) {
      rooms[roomId].players = rooms[roomId].players.filter((id) => id !== socket.id);
      
      if (rooms[roomId].players.length === 0) {
        delete rooms[roomId]; // Remove empty rooms
        console.log(`🗑️ Room ${roomId} deleted (empty)`);
      }
    }
  });
});

// Root route for testing
app.get("/", (req, res) => {
  res.send("Fleet Battle Server is running! 🚀");
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
