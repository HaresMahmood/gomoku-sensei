/**
 * View for the Settings-page.
 *
 * @see `/html/game.html` for the corresponding HTML-page.
 */
export default class GameView {
    // #region Initialization
    /**
     * Class constructor.
     *
     * @param {number} rows Width of the board.
     * @param {number} columns Height of the board.
     */
    constructor(rows, columns) {
        this.board = $(".board");
        this.cell = ".cell";
        this.tokenSound = new Audio("../../res/audio/token.mp3");
        this.gongSound = new Audio("../../res/audio/gong.mp3");
        this.setModalCloseHandler();
        this.setOverlayClickHandler();
        this.populateBoard(rows, columns);
        this.setStorageChangeEventHandler(this.updateSettings);
        this.updateSettings(JSON.parse(localStorage.getItem(0)), JSON.parse(localStorage.getItem(1)), JSON.parse(localStorage.getItem(2)), JSON.parse(localStorage.getItem(3)), JSON.parse(localStorage.getItem(4)));
    }
    // #endregion
    // #region Miscellaneous
    /**
     * Populates the board with cells. The amount of cells
     * is equal to `rows * columns`.
     *
     * @param {number} rows Width of the board.
     * @param {number} columns Height of the board.
     */
    populateBoard(rows, columns) {
        document.documentElement.style.setProperty("--columns", columns);
        for (let i = 0; i < (rows * columns); i++) {
            this.board.append(`<div class="${this.cell.split('.').join("")}"></div>`);
        }
    }
    /**
     * Sets the UI information for the passed-in player.
     *
     * @param {*} player Relevant player.
     */
    setPlayer(player) {
        $(".player__container p").eq(player.player - 1).text(player.information[0]);
        $(".player__container .player-icon").eq(player.player - 1).text(player.information[1]);
    }
    /**
     * Updates the player divisions to match the current
     * player phase.
     *
     * @param {number} currentPlayer The currently moving player.
     */
    changePlayer(currentPlayer) {
        $(".active").removeClass("active");
        $(`.player__container:eq(${currentPlayer - 1})`).addClass("active");
    }
    /**
     * Adds a token to the board.
     *
     * @param {number} index Coordinates of the chosen move.
     * @param {string} color Token color of the player.
     * @param {number} moveNumber Index of the move, length of the game.
     */
    addPiece(index, color, moveNumber) {
        let box = this.board.find(this.cell).eq(index);
        if (box.find(".piece").length === 0) {
            // Settings.
            const showMoveNumbers = JSON.parse(localStorage.getItem(1)) ? "" : "no-numbers";
            const highlightMove = JSON.parse(localStorage.getItem(2)) ? "" : "no-highlight";
            const soundEffects = JSON.parse(localStorage.getItem(3));
            let piece = `<div class="piece ${color}-piece new last ${showMoveNumbers} ${highlightMove}"><p> ${moveNumber} </p> <div></div></div>`;
            if (soundEffects) {
                this.tokenSound.cloneNode().play(); // Ensures previously playing sound is interrupted, if need be.
            }
            $(".last").removeClass("last");
            box.append(piece);
            // Set timeout to update UI.
            window.setTimeout(function () {
                $(".new").removeClass("new");
            }, 1);
        }
    }
    /**
     * Clears all pieces from the board and resets the
     * current player phase.
     *
     * @param {boolean} isDisabled Whether or not the board should be disabled after being cleared.
     */
    restart(isDisabled) {
        $(".piece").remove();
        $(".board").removeClass("inactive");
        $(".player__container").removeClass("lost");
        this.disableUserInterface(isDisabled);
        window.parent.document.title = "Game";
    }
    /**
     * Ends the game by declaring the winner through a pop-up.
     * Disabled user input afterwards.
     *
     * @param {*} winner Winning player.
     * @param {boolean} isDraw Whether or not the game ended in a draw.
     */
    endGame(winner, isDraw) {
        const winText = isDraw ? `Draw!` : `Player ${winner.player} wins!`;
        const soundEffects = JSON.parse(localStorage.getItem(3));
        const otherPlayer = winner.player === 1 ? 2 : 1;
        if (soundEffects) {
            this.gongSound.cloneNode().play();
        }
        $(".player__container").eq(otherPlayer - 1).addClass("lost");
        $("#modal-icon").text(winner.information[1]);
        $("#modal-header").text(winText);
        $("modal").addClass("visible");
        $(".board").addClass("inactive");
        $(".board").addClass("disabled");
        window.parent.document.title = winText;
    }
    /**
     * Toggles UI interactability.
     *
     * @param {boolean} isDisabled Whether or not the UI should be disabled.
     */
    disableUserInterface(isDisabled) {
        $(".board").toggleClass("disabled", isDisabled);
    }
    /**
     * Updates UI elements based on `localStorage` settings.
     *
     * @param {boolean} showCoordinates
     * @param {boolean} showMoveNumbers
     * @param {boolean} highlightMove
     * @param {boolean} soundEffects
     * @param {boolean} devMode
     */
    updateSettings(showCoordinates, showMoveNumbers, highlightMove, soundEffects, devMode) {
        $(".piece").toggleClass("no-numbers", !showMoveNumbers);
        $(".piece").toggleClass("no-highlight", !highlightMove);
    }
    // #endregion
    // #region Utility
    /**
     * Determines the coordinates of a cell on the board.
     *
     * @param {*} cell
     * @returns The coordinates of the cell.
     */
    getClickedCellCoordinates(cell) {
        return cell.index();
    }
    // #endregion
    // #region Events
    setCellClickHandler(handler) {
        $(this.cell).bind("click", function () {
            handler($(this).index());
        });
    }
    setRestartClickHandler(handler) {
        $(".restart-button").bind("mouseup", function () {
            handler();
        });
    }
    setStorageChangeEventHandler(handler) {
        window.addEventListener("storage", () => {
            handler(JSON.parse(localStorage.getItem(0)), JSON.parse(localStorage.getItem(1)), JSON.parse(localStorage.getItem(2)), JSON.parse(localStorage.getItem(3)), JSON.parse(localStorage.getItem(4)));
        });
    }
    setModalCloseHandler() {
        $(`.close-button`).bind("mouseup", function () {
            $("modal").removeClass("visible");
        });
    }
    setOverlayClickHandler() {
        $(`#overlay`).bind("mouseup", function () {
            $("modal").removeClass("visible");
        });
    }
}
