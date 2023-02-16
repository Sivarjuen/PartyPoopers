import { Socket as SocketIO } from "socket.io-client";
export declare type Socket = SocketIO & {
  sessionID?: string;
  userID?: string;
  username?: string;
};

export type Vector2D = {
  x: number;
  y: number;
};

export type LobbyPlayer = {
  name: string;
  ready: boolean;
};

export type Lobby = {
  id: string;
  hostname: string;
  players: Array<LobbyPlayer>;
};
