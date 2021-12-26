import Move from "./move";
const ROWS = 9;
const COLUMNS = ROWS;
const N = 5;
export default class GameModel {
    _board;
    _lastMove;
    /*=== Accessors ===*/
    get rows() {
        return ROWS;
    }
    get columns() {
        return COLUMNS;
    }
    constructor() {
    }
    /*=== Miscellaneous ===*/
    /*
    public performMove(index: number, player: number): void {
        let move: Move = new Move(index, player, this._lastMove);

        this._board[index] = move;
        this._lastMove = move;
    }
    */
    performMove(move) {
        this._board[move.index] = move;
        this._lastMove = move;
    }
    /* TODO: Not sure if this works. */
    undo(notifyObservers = false) {
        let index = this._board.indexOf(this._lastMove);
        this._lastMove = this._lastMove.previousMove;
        this._board[index] = new Move(index, 0, this._lastMove);
        if (notifyObservers) {
        }
    }
    getEmptyCells() {
        const cells = [];
        for (let i = 0; i < (ROWS * COLUMNS); i++) {
            if (this._board[i].isEmpty()) {
                cells.push(i);
            }
        }
        return cells;
    }
    /*
        TODO: Instead of a Game object in State/Node, hold a Move object instead.
    */
    getSuccessors(player) {
        let successors = [];
        for (let i = 0; i < (ROWS * COLUMNS); i++) {
            if (this._board[i].isEmpty()) {
                successors.push(new Move(i, player, this._lastMove));
            }
        }
        return successors;
    }
    performRandomMove(player) {
        const successors = this.getEmptyCells();
        const randomCell = successors[Math.floor(Math.random() * successors.length)];
        const move = new Move(randomCell, player, this._lastMove);
        this.performMove(move);
    }
    isOver(player) {
        return this.hasWon(player) || this.isDraw();
    }
    getWinner(player) {
        return this.hasWon(player) ? player : -1;
    }
    isDraw() {
        return !this._board.some(m => m.isEmpty());
    }
    /*=== Utility ===*/
    togglePlayer(player) {
        return player === 1 ? 2 : 1;
    }
    hasWon(player) {
        function countConsecutivePieces(pieces) {
            let counter = 0;
            let last = null;
            for (let i = 0; i < pieces.length; i++) {
                if (pieces[i].index === player) {
                    if (pieces[i] !== last) {
                        counter = 0;
                    }
                    counter++;
                }
                last = pieces[i];
            }
            return counter >= N;
        }
        function checkHorizontal(board, row) {
            return countConsecutivePieces(board[row]);
        }
        function checkVertical(board, column) {
            return countConsecutivePieces(board.map(row => row[column]));
        }
        function checkPrimaryDiagonal(board, row, column) {
            let pieces = [];
            for (let i = -(N - 1); i < N; i++) {
                if (board[row - i] !== undefined && board[column - i] !== undefined) {
                    pieces.push(board[row - i][column - i]);
                }
            }
            return countConsecutivePieces(pieces);
        }
        function checkSecondaryDiagonal(board, row, column) {
            let pieces = [];
            for (let i = -(N - 1); i < N; i++) {
                if (board[row - i] !== undefined && board[column + i] !== undefined) {
                    pieces.push(board[row - i][column + i]);
                }
            }
            return countConsecutivePieces(pieces);
        }
        const matrix = this.toMatrix(this._board, ROWS);
        const horizontalCounter = checkHorizontal(matrix, Math.floor(this._lastMove.index / ROWS));
        const verticalCounter = checkVertical(matrix, this._lastMove.index % ROWS);
        const diagonalCounterLeft = checkPrimaryDiagonal(matrix, Math.floor(this._lastMove.index / ROWS), this._lastMove.index % ROWS);
        const diagonalCounterRight = checkSecondaryDiagonal(matrix, Math.floor(this._lastMove.index / ROWS), this._lastMove.index % ROWS);
        return horizontalCounter ||
            verticalCounter ||
            diagonalCounterLeft ||
            diagonalCounterRight;
    }
    toMatrix(array, length) {
        const matrix = [];
        for (let i = 0; i < array.length; i += length) {
            matrix.push(array.slice(i, i + length));
        }
        return matrix;
    }
}
