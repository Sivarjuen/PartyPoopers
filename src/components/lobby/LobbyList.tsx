import { h } from "tsx-dom";
import '../components.scss';

export const LobbyListItem = () => { 
    return (
        <div class="lobby-list-item-container">Testlklk</div>
    ) as HTMLElement
}

export const LobbyList = () => {
    return (
        <div class="lobby-list-container">
            <LobbyListItem />
            <LobbyListItem />
            Hello123
            <LobbyListItem />
        </div>
    ) as HTMLElement
}


