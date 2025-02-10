const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

const rooms = {}; // Store active rooms

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Create a new game room
  socket.on('createRoom', () => {
    const roomId = Math.random().toString(36).substring(2, 8); // Generate room ID
    rooms[roomId] = { players: [socket.id] };
    socket.join(roomId);
    socket.emit('roomCreated', roomId); // Send room ID to creator
    console.log(`Room Created: ${roomId}`);
  });

  // Join an existing room
  socket.on('joinRoom', (roomId) => {
    if (rooms[roomId]) {
      if (rooms[roomId].players.length < 2) {
        rooms[roomId].players.push(socket.id);
        socket.join(roomId);
        io.to(roomId).emit('roomJoined', roomId); // Notify both players
        console.log(`Player joined room: ${roomId}`);
      } else {
        socket.emit('joinError', 'Room is full!'); // Room already has 2 players
      }
    } else {
      socket.emit('joinError', 'Invalid Room ID!'); // Room doesn't exist
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Remove player from rooms
    for (const roomId in rooms) {
      rooms[roomId].players = rooms[roomId].players.filter((id) => id !== socket.id);
      if (rooms[roomId].players.length === 0) {
        delete rooms[roomId]; // Delete empty rooms
      }
    }
  });
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});