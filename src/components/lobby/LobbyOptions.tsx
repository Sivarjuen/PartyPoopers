import { h } from "tsx-dom";
import "../components.scss";

function toggleDropDown(id: string) {
    const dropDown = document.querySelector(`#${id}`);
    dropDown.classList.toggle("is-active");
    dropDown.querySelector(".button").classList.toggle("expanded");
    dropDown.querySelector(".fas").classList.toggle("fa-angle-down");
    dropDown.querySelector(".fas").classList.toggle("fa-angle-up");
}

function setGameName() {
    const gameName = document.querySelector("#game-name");
    gameName.innerHTML = this.innerHTML;
    toggleDropDown("game-select");
}

export const LobbyOptions = (games: string[]) => {
    return (
        <div class="lobby-options-container">
            <div class="game-label">Game</div>
            <div class="dropdown" id="game-select">
                <button
                    class="button"
                    onClick={() => toggleDropDown("game-select")}
                >
                    <div class="button-container">
                        <div id="game-name">{games[0]}</div>
                        <div class="icon is-small">
                            <i class="fas fa-angle-down"></i>
                        </div>
                    </div>
                </button>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                        {games.map((game) => {
                            return (
                                <a class="dropdown-item" onClick={setGameName}>
                                    {game}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    ) as HTMLElement;
};

window.addEventListener("click", (evt) => {
    const dropDowns = document.querySelectorAll(".dropdown");
    dropDowns.forEach((dropDown) => {
        if (
            !evt.composedPath().includes(dropDown) &&
            dropDown.classList.contains("is-active")
        ) {
            const id = dropDown.id;
            toggleDropDown(id);
        }
    });
});
