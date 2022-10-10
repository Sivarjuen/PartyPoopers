import { io } from "socket.io-client";
import { NetStatus } from "../components/lobby/NetStatus";

export default function connectToServer(status: NetStatus) {
  const socket = io("ws://localhost:3000");

  let connectionAttempts = 3;
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
    if (connectionAttempts == 3) {
      console.log("Failed to connect to server. Trying again...");
    } else {
      console.log("Trying again...");
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

    return socket;
  });
}
