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

export type LobbyListItem = {
  name: string;
  players: number;
};
