import { h } from "tsx-dom";
import "../components.scss";

export const LobbyListItem = (text: string) => {
  return (<div class="lobby-list-item">{text}</div>) as HTMLElement;
};

export const LobbyCreate = (<div class="lobby-create">+</div>) as HTMLElement;

export const LobbyList = (entries: HTMLElement[], create: HTMLElement) => {
  if (!entries) entries = [];
  return (
    <div class="lobby-list-container">
      {entries.slice(0, 3).map((Item) => {
        return <div>{Item}</div>;
      })}
      {entries.length < 3 && create}
    </div>
  ) as HTMLElement;
};
