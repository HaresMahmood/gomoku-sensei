const ROWS = 3;
const COLUMNS = ROWS;
const N = 3;
export default class GameModel {
    _board;
    _history;
    constructor(board = new Array(ROWS * COLUMNS).fill(0), history = []) {
        this._board = board;
        this._history = history;
    }
    /*=== Accessors ===*/
    get rows() {
        return ROWS;
    }
    get columns() {
        return COLUMNS;
    }
    get lastMove() {
        return this._history[this._history.length - 1];
        ;
    }
    /*=== Miscellaneous ===*/
    performMove(index, player, notifyObservers = false) {
        this._board[index] = player;
        this._history.push(index);
        if (notifyObservers) {
        }
    }
    /* TODO: Not sure if this works. */
    undo(notifyObservers = false) {
        let index = this._board.indexOf(this._history.pop());
        this._board[index] = 0;
        if (notifyObservers) {
        }
    }
    getEmptyCells() {
        const cells = [];
        for (let i = 0; i < (ROWS * COLUMNS); i++) {
            if (this._board[i] === 0) {
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
            if (this._board[i] === 0) {
                const clone = this.clone();
                clone.performMove(i, player);
                successors.push(clone);
            }
        }
        return successors;
    }
    performRandomMove(player) {
        const emptyCells = this.getEmptyCells();
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        this.performMove(randomCell, player);
    }
    isOver(player) {
        return this.hasWon(player) || this.isDraw();
    }
    getWinner(player) {
        return this.hasWon(player) ? player : -1;
    }
    isDraw() {
        return !this._board.includes(0);
    }
    /*=== Utility ===*/
    clone() {
        return new GameModel(this._board.slice(), this._history.slice());
    }
    isCellEmpty(index) {
        return this._board[index] === 0;
    }
    hasWon(player) {
        function countConsecutivePieces(pieces) {
            let counter = 0;
            let last = null;
            for (let i = 0; i < pieces.length; i++) {
                if (pieces[i] === player) {
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
        // If the player has not placed enough pieces to win the game, ...
        if (this._board.filter((p) => (p === player)).length < N) {
            return false; // ... Return `false` by default.
        }
        const matrix = this.toMatrix(this._board, ROWS);
        const horizontalCounter = checkHorizontal(matrix, Math.floor(this.lastMove / ROWS));
        const verticalCounter = checkVertical(matrix, this.lastMove % ROWS);
        const diagonalCounterLeft = checkPrimaryDiagonal(matrix, Math.floor(this.lastMove / ROWS), this.lastMove % ROWS);
        const diagonalCounterRight = checkSecondaryDiagonal(matrix, Math.floor(this.lastMove / ROWS), this.lastMove % ROWS);
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
