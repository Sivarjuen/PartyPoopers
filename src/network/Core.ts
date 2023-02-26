import { Socket } from "../types";
import { io } from "socket.io-client";
import { NetStatus } from "../components/lobby/NetStatus";

export default function connectToServer(status: NetStatus): Socket {
  const socket = io("ws://127.0.0.1:3000", { autoConnect: false, transports: ["websocket"] }) as Socket;

  // Debug
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  const sessionID = localStorage.getItem("sessionID");
  if (sessionID) {
    socket.auth = { sessionID };
  }
  socket.connect();

  socket.on("session", ({ sessionID, userID, username }) => {
    socket.auth = { sessionID };
    localStorage.setItem("sessionID", sessionID);
    socket.sessionID = sessionID;
    socket.userID = userID;
    socket.username = username;
  });

  let connectionAttempts = 2;
  socket.on("connect", () => {
    console.log("Connected to server.");
    setTimeout(function () {
      status.connectionSuccess();
    }, 1000);
  });

  socket.on("reconnect", () => {
    console.log("Reconnected to server.");
    status.connectionSuccess();
  });

  socket.on("connect_error", () => {
    if (connectionAttempts == 2) {
      console.log("Failed to connect to server. \nTrying again... (Retry 1)");
    } else {
      console.log(`Trying again... (Retry ${3 - connectionAttempts})`);
    }
    connectionAttempts -= 1;
    if (connectionAttempts > 0) {
      setTimeout(() => {
        socket.connect();
      }, 300);
    } else {
      console.log("Failed to connect after 3 attempts.");
      socket.close();
      status.connectionFail();
    }
  });

  socket.on("disconnect", (reason) => {
    if (reason === "io server disconnect") {
      console.log("Disconnected by the server.");
      socket.close();
      status.connectionFail();
    } else if (reason === "transport close") {
      console.log("Server has shut down. Closing connection...");
      socket.close();
      status.connectionFail();
    } else {
      console.log("Lost connection to the server. Trying again...");
    }
  });

  return socket;
}

export function join(socket: Socket, requestedUsername: string, callback: () => void) {
  socket.emit("join", { username: requestedUsername });

  socket.on("username", ({ username }) => {
    socket.username = username;
    callback();
  });
}
