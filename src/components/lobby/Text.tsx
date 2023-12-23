import { h } from "tsx-dom";
import "../components.scss";

export const ConnectedAsText = (name: string) => {
  return (
    <div class="connected-as-text">
      Connected as: <span class="name">{name}</span>
    </div>
  ) as HTMLElement;
};

export const RoomCodeText = (code: string) => {
  return (
    <div class="room-code-text">
      JOIN CODE: <span class="room-code">{code}</span>
    </div>
  ) as HTMLElement;
};

export const ErrorText = (text: string) => {
  return (
    <div class="error-text">
      {text}
    </div>
  ) as HTMLElement;
};