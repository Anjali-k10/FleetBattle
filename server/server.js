const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow frontend to connect
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 5000;
const rooms = {}; // Store active rooms

io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // Function to generate a unique Room ID
  const generateRoomId = () => Math.random().toString(36).substring(2, 8);

  // Creating a new room
  socket.on("createRoom", () => {
    let roomId;
    do {
      roomId = generateRoomId();
    } while (rooms[roomId]); // Ensure a unique Room ID is created

    rooms[roomId] = { players: [socket.id] }; // Store room creator
    socket.join(roomId);
    socket.emit("roomCreated", roomId); // Send the Room ID to the creator

    console.log(`🏠 Room Created: ${roomId} by ${socket.id}`);
  });

  // Joining an existing room
  socket.on("joinRoom", (roomId) => {
    if (rooms[roomId]) {
      if (rooms[roomId].players.length < 2) {
        rooms[roomId].players.push(socket.id);
        socket.join(roomId);
        io.to(roomId).emit("roomJoined", roomId);
        console.log(`👤 Player ${socket.id} joined room: ${roomId}`);

        if (rooms[roomId].players.length === 2) {
          io.to(roomId).emit("startGame", roomId);
          console.log(`🎮 Game started in room: ${roomId}`);
        }
      } else {
        socket.emit("joinError", "Room is full!");
      }
    } else {
      socket.emit("joinError", "Invalid Room ID!");
    }
  });

  // Handling disconnection
  socket.on("disconnect", () => {
    console.log(`🚪 User disconnected: ${socket.id}`);
    for (const roomId in rooms) {
      rooms[roomId].players = rooms[roomId].players.filter(
        (id) => id !== socket.id
      );
      if (rooms[roomId].players.length === 0) {
        delete rooms[roomId]; // Remove empty rooms
        console.log(`🗑️ Room deleted: ${roomId}`);
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
