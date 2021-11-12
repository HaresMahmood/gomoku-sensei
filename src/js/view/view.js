const BREAKPOINT = 650;

export default class View {
    constructor(rows, columns) {
        this.board = $(".board");
        this.cell = ".cell";

        this.populateBoard(rows, columns)
    }

    populateBoard(rows, columns) {
        document.documentElement.style.setProperty("--columns", columns);

        for (let i = 0; i < (rows * columns); i++) {
            this.board.append(`<div class="${this.cell.split('.').join("")}"></div>`);
        }
    }

    addPiece(index, color) {
        let box = this.board.find(this.cell).eq(index);

        if (box.find(".piece").length === 0) {
            let piece = `<div class="piece ${color}-piece"></div>`;

            box.append(piece);
        }
    }

    getClickedCellCoordinates(cell) {
        return cell.index();
    }

    setDocumentReadyHandler() {
        $(document).ready(this.movePlayerElement);
    }

    setWindowResizeHandler() {
        $(window).bind("resize", this.movePlayerElement);
    }

    setCellClickHandler(handler) {
        $(this.cell).bind("click", function() {
            handler($(this).index());
        });
    }

    endGame(color, isDraw) {
        const winText = isDraw ? `Draw!` : `${color} wins!`;

        window.alert(winText);
        location.reload();
    }

    movePlayerElement() {
        if (parseInt($(window).width()) <= BREAKPOINT) {
            $("#players-container").detach().prependTo($("main"));
          
            if($("#page-title").length === 0) {
                $("#menu-button").after((`<h3 id="page-title"> Game </h3>`));
            }
        }
        
        if (parseInt($(window).width()) > BREAKPOINT) {
            $("#players-container").detach().insertAfter($("#menu-button"));
            $("#page-title").remove();
        }
    }
}