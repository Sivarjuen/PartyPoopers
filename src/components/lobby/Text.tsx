import { h } from "tsx-dom";
import "../components.scss";

export const ConnectedAsText = (name: string) => {
  return (
    <div class="connected-as-text is-size-4">
      Connected as: <span class="name">{name}</span>
    </div>
  ) as HTMLElement;
};

export const LobbyTitle = (<div class="lobby-title">Lobbies</div>) as HTMLElement;
