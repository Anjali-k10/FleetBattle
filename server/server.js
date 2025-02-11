const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // Allow frontend to connect
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

const rooms = {}; // Store active rooms

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('createRoom', () => {
    const roomId = Math.random().toString(36).substring(2, 8);
    rooms[roomId] = { players: [socket.id] };
    socket.join(roomId);
    socket.emit('roomCreated', roomId);
    console.log(`Room Created: ${roomId}`);
  });

  socket.on('joinRoom', (roomId) => {
    if (rooms[roomId]) {
      if (rooms[roomId].players.length < 2) {
        rooms[roomId].players.push(socket.id);
        socket.join(roomId);
        io.to(roomId).emit('roomJoined', roomId);
        console.log(`Player joined room: ${roomId}`);
      } else {
        socket.emit('joinError', 'Room is full!');
      }
    } else {
      socket.emit('joinError', 'Invalid Room ID!');
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    for (const roomId in rooms) {
      rooms[roomId].players = rooms[roomId].players.filter((id) => id !== socket.id);
      if (rooms[roomId].players.length === 0) {
        delete rooms[roomId];
      }
    }
  });
});

module.exports = { app, server }; // ✅ Export app & server


 // "builds": [
    //   {
    //     "src": "api/index.js",
    //     "use": "@vercel/node"
    //   }
    // ],