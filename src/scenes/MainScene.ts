import { BaseScene } from "./BaseScene";
import { NetStatus } from "../components/lobby/NetStatus";
import { TextInput } from "../components/lobby/TextInput";
import { ConnectButton, JoinButton, HostButton } from "../components/common/Button";
import connectToServer from "../network/Core";
import { Footer } from "../components/lobby/Footer";
import { ConnectedAsText, ErrorText } from "../components/lobby/Text";

export default class MainScene extends BaseScene {
  // Pre-connect elements
  private name: TextInput;
  private connectButton: Phaser.GameObjects.DOMElement;

  // Post-connect elements
  private connectedAsText: Phaser.GameObjects.DOMElement;
  private codeInput: TextInput;
  private joinButton: Phaser.GameObjects.DOMElement;
  private hostButton: Phaser.GameObjects.DOMElement;

  private socket: any;
  private errorText: Phaser.GameObjects.DOMElement;

  private usernameLoaded: Boolean = false;
  private isConnected: Boolean = false;

  constructor() {
    super("MainScene");
  }

  preload(): void {
    this.load.image("logo", "assets/logo.png");
  }

  create(): void {
    super.create();

    // Logo
    const logo = this.add.image(this.getW() / 2, 300, "logo");
    logo.setScale(1.5, 1.5);
    this.tweens.add({
      targets: logo,
      y: logo.y - 30,
      duration: 2000,
      ease: "Sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Name Input
    this.name = this.add.existing(
      new TextInput(this, this.getW() / 2, 600, {
        width: 300,
        height: 80,
        fontFamily: "beaufort",
        fontSize: "36px",
        maxLength: 12,
        minLength: 3,
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "10px",
        paddingBottom: "1px",
        align: "center",
        tooltip: "Name must be between 3 and 12 characters",
        placeholder: "Enter name",
      })
    );
    this.name.setStyle("border-bottom", "5px solid grey");

    // Network
    const status = this.add.existing(new NetStatus(this, this.getW() - 32, this.getH() - 32, "bFont"));

    // Version
    this.add.existing(new Footer(this, 32, this.getH() - 32, "bFont"));

    this.socket = connectToServer(status);
    this.registry.set("socket", this.socket);

    // Connect Button
    this.connectButton = this.add.dom(this.getW() / 2, 750, ConnectButton);
    this.connectButton.addListener("click");
    this.connectButton.on("click", () => this.join());

    this.name.on("textchange", (s: string) => {
      this.connectButton.setVisible(this.isNameValid());
    });

    // Connected As
    this.connectedAsText = this.add.dom(this.getW() / 2, 550, ConnectedAsText(""));
    this.connectedAsText.setVisible(false);

    // Error
    this.errorText = this.add.dom(this.getW() / 2, this.getH() - 64, ErrorText(""));
    this.errorText.setVisible(false);

    // Join or host
    this.joinButton = this.add.dom(1110, 750, JoinButton);
    this.joinButton.addListener("click");
    this.joinButton.on("click", () => this.joinLobby());

    this.hostButton = this.add.dom(this.getW() / 2, 900, HostButton);
    this.hostButton.addListener("click");
    this.hostButton.on("click", () => this.hostLobby());

    // Code Input
    this.codeInput = this.add.existing(
      new TextInput(this, 880, 750, {
        width: 300,
        height: 80,
        fontFamily: "beaufort",
        fontSize: "36px",
        maxLength: 4,
        minLength: 4,
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "10px",
        paddingBottom: "1px",
        align: "center",
        tooltip: "Join code must be 4 characters",
        placeholder: "Enter Code",
      })
    );
    this.codeInput.setStyle("border-bottom", "5px solid grey");

    this.joinButton.setVisible(false);
    this.joinButton.node.toggleAttribute("disabled");
    this.hostButton.setVisible(false);
    this.codeInput.setVisible(false);

    this.codeInput.on("textchange", (s: string) => {
      if (this.isCodeValid()) {
        if (this.joinButton.node.hasAttribute("disabled")) {
          this.joinButton.node.toggleAttribute("disabled");
        }
      } else {
        if (!this.joinButton.node.hasAttribute("disabled")) {
          this.joinButton.node.toggleAttribute("disabled");
        }
      }
    });

    this.handleInput();
  }

  update(_time: number, _delta: number) {
    if (!this.isConnected) {
      if (!this.usernameLoaded && this.socket.username) {
        this.name.text = this.socket.username;
        this.usernameLoaded = true;
        this.connectButton.setVisible(this.isNameValid());
      }
      if (this.name.text.trim().length < this.name.minLength && this.name.text.trim().length > 0) {
        this.name.fontColor = "red";
      } else {
        this.name.fontColor = "white";
      }
    } else {
    }
  }

  handleInput() {
    this.input.keyboard.on("keydown", (event: any) => {
      if (event.code === "ArrowRight") {
        this.scene.start("LobbyScene");
      }
      if (event.code === "ArrowDown") {
        console.log("TOGGLING!");
        this.isConnected ? this.disconnectedView() : this.connectedView();
      }
    });
  }

  connectedView() {
    this.isConnected = true;
    this.connectButton.setVisible(false);
    this.name.setVisible(false);
    this.connectedAsText.setElement(ConnectedAsText(this.socket.username ?? "local"));
    this.connectedAsText.setVisible(true);
    this.joinButton.setVisible(true);
    this.hostButton.setVisible(true);
    this.codeInput.setVisible(true);
    this.errorText.setVisible(false);
  }

  disconnectedView() {
    this.isConnected = false;
    this.name.setVisible(true);
    this.connectedAsText.setVisible(false);
    this.connectButton.setVisible(this.isNameValid());
    this.joinButton.setVisible(false);
    this.hostButton.setVisible(false);
    this.codeInput.setVisible(false);
    this.errorText.setVisible(false);
  }

  isNameValid() {
    return this.name.text.trim().length >= this.name.minLength && this.socket.connected;
  }

  isCodeValid() {
    return this.codeInput.text.trim().length == 4;
  }

  join() {
    this.socket.emit("join", { username: this.name.text });
  
    this.socket.on("username", (username: string) => {
      if (username === null) {
        this.errorText.setElement(ErrorText("Username is taken"));
        this.errorText.setVisible(true);
      } else {
        this.socket.username = username;
        this.connectedView();
      }
    });
  }

  joinLobby() {
    this.socket.emit("joinLobby", this.codeInput.text);
    
    this.socket.on("lobbyJoinFail", (error: string) => {
      this.errorText.setElement(ErrorText(error));
      this.errorText.setVisible(true);
    })
  }

  hostLobby() {
    this.socket.emit("hostLobby");

    this.socket.on("acknowledgeHost", (lobbyCode: string) => {
      this.scene.start("LobbyScene", { lobbyCode });
    })
  }
}
