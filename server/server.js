const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

const PORT = process.env.PORT || 5000;
const rooms = {};

function generateUniqueRoomId() {
  let roomId;
  do {
    roomId = Math.random().toString(36).substring(2, 8);
  } while (rooms[roomId]);
  return roomId;
}

io.on('connection', (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  socket.on('createRoom', () => {
    const roomId = generateUniqueRoomId();
    rooms[roomId] = { players: [socket.id] };  
    socket.join(roomId);
    socket.emit('roomCreated', roomId); // Emit room ID to creator
    console.log(`🚀 Room Created: ${roomId} by ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log(`🚪 User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
