import Event from "../utility/event.js";
export default class GameView {
    // #region Initialization
    constructor(rows, columns) {
        this.restartEvent = new Event();
        this.board = $(".board");
        this.cell = ".cell";
        this.tokenSound = new Audio("../../res/audio/token.mp3");
        this.gongSound = new Audio("../../res/audio/gong.mp3");
        this.setRestartClickHandler(this.restartEvent);
        this.setModalCloseHandler();
        this.setOverlayClickHandler();
        this.populateBoard(rows, columns);
        this.setStorageChangeEventHandler(this.updateSettings);
        this.updateSettings(JSON.parse(localStorage.getItem(0)), JSON.parse(localStorage.getItem(1)), JSON.parse(localStorage.getItem(2)), JSON.parse(localStorage.getItem(3)), JSON.parse(localStorage.getItem(4)));
    }
    // #endregion
    // #region Miscellaneous
    populateBoard(rows, columns) {
        document.documentElement.style.setProperty("--columns", columns);
        for (let i = 0; i < (rows * columns); i++) {
            this.board.append(`<div class="${this.cell.split('.').join("")}"></div>`);
        }
    }
    setPlayer(player) {
        document.title = "Game";
        $(".player__container p").eq(player.player - 1).text(player.name[0]);
        $(".player__container .player-icon").eq(player.player - 1).text(player.name[1]);
    }
    changePlayer(currentPlayer) {
        $(".active").removeClass("active");
        $(`.player__container:eq(${currentPlayer - 1})`).addClass("active");
    }
    updateProgressBar(percentage) {
        $(".pure-material-progress-linear").progressbar({
            value: percentage
        });
    }
    addPiece(index, color, moveNumber) {
        let box = this.board.find(this.cell).eq(index);
        if (box.find(".piece").length === 0) {
            // Settings.
            const showMoveNumbers = JSON.parse(localStorage.getItem(1)) ? "" : "no-numbers";
            const highlightMove = JSON.parse(localStorage.getItem(2)) ? "" : "no-highlight";
            const soundEffects = JSON.parse(localStorage.getItem(3));
            let piece = `<div class="piece ${color}-piece new last ${showMoveNumbers} ${highlightMove}"><p> ${moveNumber} </p> <div></div></div>`;
            $(".last").removeClass("last");
            box.append(piece);
            // Set timeout to update UI.
            window.setTimeout(function () {
                $(".new").removeClass("new");
            }, 1);
            if (soundEffects) {
                this.tokenSound.cloneNode().play(); // Ensures previously playing sound is interrupted, if need be.
            }
        }
    }
    restart(isDisabled) {
        $(".piece").remove();
        $(".board").removeClass("inactive");
        $(".player__container").removeClass("lost");
        this.disableUserInterface(isDisabled);
        // TOOD: Add animation.
        // const pieces = $(".piece").length;
        // const animationDelay = 50;
        // $(".piece").each(function(i) {
        //     $(this).delay(i * animationDelay).fadeOut(125, function() {
        //         $(this).remove();
        //     });
        // });
        // window.setTimeout(function() {
        //     $(".board").removeClass("inactive");
        //     $(".player__container").removeClass("lost");
        // }, pieces * animationDelay);
    }
    endGame(winner, isDraw) {
        const winText = isDraw ? `Draw!` : `Player ${winner.player} wins!`;
        const soundEffects = JSON.parse(localStorage.getItem(3));
        const otherPlayer = winner.player === 1 ? 2 : 1;
        if (soundEffects) {
            this.gongSound.cloneNode().play();
        }
        $(".player__container").eq(otherPlayer - 1).addClass("lost");
        $("#modal-icon").text(winner.name[1]);
        $("#modal-header").text(winText);
        $("modal").addClass("visible");
        $(".board").addClass("inactive");
        $(".board").addClass("disabled");
    }
    disableUserInterface(isDisabled) {
        $(".board").toggleClass("disabled", isDisabled);
    }
    updateSettings(showCoordinates, showMoveNumbers, highlightMove, soundEffects, devMode) {
        $(".piece").toggleClass("no-numbers", !showMoveNumbers);
        $(".piece").toggleClass("no-highlight", !highlightMove);
    }
    // #endregion
    // #region Utility
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
    setRestartClickHandler(event) {
        $(".restart-button").bind("mouseup", function () {
            // handler();
            event.trigger();
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
