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

export type Lobby = {
  hostId: string;
  hostName: string;
  players: Record<string, LobbyPlayer>;
};

export type LobbyPlayer = {
  name: string;
  ready: boolean;
};
