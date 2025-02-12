import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:5000"; // Change to deployed backend URL when needed

const socket = io(SERVER_URL, {
  transports: ["websocket"], // Use WebSocket instead of polling
  reconnection: true, // Enable reconnection
  reconnectionAttempts: 5, // Try to reconnect 5 times before failing
  reconnectionDelay: 1000, // 1-second delay between attempts
});

export default socket;
