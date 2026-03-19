import { io } from "socket.io-client";

/* =========================
   SOCKET URL CONFIG
========================= */

const SOCKET_URL =
  import.meta.env.VITE_BACKEND_URL || // ✅ correct name
  (import.meta.env.DEV
    ? "http://localhost:5080"
    : "https://artarena-backend.onrender.com");

/* DEBUG */
console.log("🌐 SOCKET URL:", SOCKET_URL);

/* =========================
   SINGLETON SOCKET
========================= */

let socket = null;

export function getSocket() {

  if (!socket) {

    socket = io(SOCKET_URL, {
      transports: ["websocket"],

      autoConnect: false,

      /* ❌ REMOVE THIS (causes deployment issues) */
      // withCredentials: true,

      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    /* =========================
       DEBUG LOGS
    ========================== */

    socket.on("connect", () => {
      console.log("🟢 Connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("🔴 Disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Connection error:", err.message);
    });

  }

  return socket;
}