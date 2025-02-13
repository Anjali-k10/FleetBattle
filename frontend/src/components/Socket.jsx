import { io } from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const socket = io(SERVER_URL, {
  transports: ["websocket"], // Force WebSocket for real-time performance
  reconnection: true, // Auto-reconnect on disconnect
  reconnectionAttempts: Infinity, // Keep trying indefinitely
  reconnectionDelay: 3000, // 3 seconds between reconnection attempts
  autoConnect: true, // Automatically connect on import
  timeout: 10000, // Increase timeout for slow server start
});

socket.on("connect", () => {
  console.log("✅ Connected to server:", SERVER_URL);
});

socket.on("disconnect", (reason) => {
  console.warn("🚪 Disconnected:", reason);
});

socket.on("connect_error", (error) => {
  console.error("❌ Connection Error:", error);
});

export default socket;
