export default class View {
    constructor() {
        this.board = $(".board");
        this.cell = ".cell";
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
}