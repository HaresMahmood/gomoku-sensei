export default class View {
    constructor() {
        this.board = $(".board");
        this.rows = ".row";
        this.columns = ".box";
    }

    addPiece(row, column, color) {
        let line = this.board.find(this.rows).eq(row);
        let cell = line.find(this.columns).eq(column);

        if (cell.find(".piece").length === 0) {
            let piece = `<div class="piece ${color}-piece"></div>`;

            cell.append(piece);
        }
    }

    getClickedCellCoordinates(cell) {
        let row = cell.parent().index();
        let column = cell.index();

        return [row, column];
    }

    setCellClickHandler(handler) {
        $(this.columns).bind("click", function() {
            let row = $(this).parent().index();
            let column = $(this).index();

            handler(row, column);
        });
    }

    endGame(color) {
        window.alert(`${color} wins!`);
        location.reload();
    }
}