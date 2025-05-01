import { io } from "socket.io-client";

// Get userId from localStorage or use Redux for more reliability
const userId = localStorage.getItem("userId");

console.log("Connecting to Socket.IO server at:", import.meta.env.VITE_SOCKET_BACKEND_URL);

const socket = io(import.meta.env.VITE_SOCKET_BACKEND_URL, {
  withCredentials: true,
  auth: { userId }, // Optional: not used in backend currently
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

// ✅ On successful connection
socket.on("connect", () => {
  console.log("✅ Socket connected successfully with ID:", socket.id);
  socket.emit("join", userId); // Join user's private room
});

// 🔌 Lifecycle events for better debugging
socket.on("connect_error", (error) => {
  console.error("❌ Socket connection error:", error.message);
});

socket.on("disconnect", (reason) => {
  console.log("⚠️ Socket disconnected. Reason:", reason);
});

socket.on("reconnect", (attemptNumber) => {
  console.log("🔄 Socket reconnected after", attemptNumber, "attempts");
});

socket.on("reconnect_error", (error) => {
  console.error("❌ Socket reconnection error:", error.message);
});

socket.on("reconnect_failed", () => {
  console.error("❌ Socket reconnection failed after all attempts");
});

// ✅ Listen for direct messages
socket.on("message received", (messageData) => {
  console.log("📩 Direct message received:", messageData);
  // Dispatch Redux action or update UI accordingly
});

// ✅ Emit direct message
export const sendDirectMessage = (receiverId, message) => {
  socket.emit("send-message", {
    receiverId,
    message,
  });
};

// ✅ Utility to test socket status
export const testSocketConnection = () => {
  if (socket.connected) {
    console.log("✅ Socket is connected and ready");
    return true;
  } else {
    console.log("❌ Socket is not connected");
    return false;
  }
};

export default socket;
