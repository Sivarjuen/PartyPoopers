import { h } from "tsx-dom";
import "../components.scss";
import { LobbyOptions } from "./LobbyOptions";

const LobbyListItem = (text: string, highlight: boolean, isReady: boolean) => {
  let classList = "lobby-list-item";
  if (highlight) classList += " lobby-item-highlight";
  if (isReady) classList += " lobby-ready";
  return (<div class={classList}>{text}</div>) as HTMLElement;
};

const LobbyEmpty = () => {
  return (<div class="lobby-empty"></div>) as HTMLElement;
};

export const LobbyList = (entries: string[], highlightIndex: number, readyIndexes: number[]) => {
  return (
    <div>
      <div class="lobby-outer-container">
        <div class="lobby-container">
          {entries.slice(0, 4).map((name, i) => {
            return LobbyListItem(name, highlightIndex === i, readyIndexes.includes(i));
          })}
          {entries.length < 4 && [...Array(4 - entries.length)].map(() => LobbyEmpty())}
        </div>
        {entries.length > 4 && (
          <div class="lobby-container">
            {entries.slice(4).map((name, i) => {
              return LobbyListItem(name, highlightIndex === i + 4, readyIndexes.includes(i + 4));
            })}
            {entries.length < 8 && [...Array(8 - entries.length)].map(() => LobbyEmpty())}
          </div>
        )}
        {LobbyOptions()}
      </div>
    </div>
  ) as HTMLElement;
};
