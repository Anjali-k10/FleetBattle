import { io } from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const socket = io(SERVER_URL, {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 3000,
  timeout: 10000,
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
