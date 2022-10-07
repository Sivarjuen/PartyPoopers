import { BaseScene } from "./BaseScene";
import { io } from "socket.io-client";
import { NetStatus } from "../components/lobby/NetStatus";
import { TextInput } from "../components/lobby/TextInput";

export default class MainScene extends BaseScene {
  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image("logo", "assets/logo.png");
  }

  create() {
    super.create();

    const logo = this.add.image(this.getW() / 2, 250, "logo");
    logo.setScale(1.5, 1.5);
    const status = this.add.existing(
      new NetStatus(this, this.getW() - 32, this.getH() - 32, "bFont")
    );
    const name = this.add.existing(
      new TextInput(this, this.getW() / 2, 600, {
        width: 210,
        height: 50,
        backgroundColor: "#222",
        fontFamily: "beaufort",
        fontSize: "22px",
        maxLength: 12,
        minLength: 3,
        tooltip: "Name must be between 3 and 12 characters",
        placeholder: " Enter name",
      })
    );

    this.tweens.add({
      targets: logo,
      y: logo.y - 30,
      duration: 2000,
      ease: "Sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    const socket = io("ws://localhost:3000");

    let connectionAttempts = 3;
    socket.on("connect", () => {
      console.log("Connected to server.");
      setTimeout(function () {
        status.connectionSuccess();
      }, 2000);
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
        }, 1000);
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
  }
}
