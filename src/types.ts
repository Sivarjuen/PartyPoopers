import { Socket as SocketIO } from "socket.io-client";
export declare type Socket = SocketIO & {
  sessionID?: string;
  userID?: string;
  username?: string;
};
