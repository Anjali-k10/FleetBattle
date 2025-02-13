import { io } from "socket.io-client";

// Use environment variable for backend URL
const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const socket = io(SERVER_URL, {
  transports: ["websocket"], // Use WebSocket instead of polling
  reconnection: true, // Enable automatic reconnection
  reconnectionAttempts: 10, // Increased attempts to handle Render's auto-sleep
  reconnectionDelay: 2000, // 2-second delay between attempts
  withCredentials: true, // Needed if backend has authentication or CORS issues
});

export default socket;
