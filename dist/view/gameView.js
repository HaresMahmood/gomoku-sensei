const BREAKPOINT = 650;
export default class GameView {
    constructor(rows, columns) {
        this.board = $(".board");
        this.cell = ".cell";
        this.populateBoard(rows, columns);
    }
    populateBoard(rows, columns) {
        document.documentElement.style.setProperty("--columns", columns);
        for (let i = 0; i < (rows * columns); i++) {
            this.board.append(`<div class="${this.cell.split('.').join("")}"></div>`);
        }
    }
    setPlayer(player) {
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
    toggleProgressBar() {
        //updateProgressBar(0);
        $("header, body").toggleClass("loading");
    }
    addPiece(index, color, moveNumber) {
        let box = this.board.find(this.cell).eq(index);
        if (box.find(".piece").length === 0) {
            let piece = `<div class="piece ${color}-piece last"><p> ${moveNumber} </p> <div></div></div>`;
            $(".last").removeClass("last");
            box.append(piece);
        }
    }
    restart() {
        $(".piece").remove();
    }
    endGame(color, isDraw) {
        const winText = isDraw ? `Draw!` : `${color} wins!`;
        window.alert(winText);
        // location.reload();
    }
    /*-- Events */
    getClickedCellCoordinates(cell) {
        return cell.index();
    }
    setCellClickHandler(handler) {
        $(this.cell).bind("click", function () {
            handler($(this).index());
        });
    }
    setRestartClickHandler(handler) {
        $("#restart-button").bind("mouseup", function () {
            handler();
        });
    }
}
