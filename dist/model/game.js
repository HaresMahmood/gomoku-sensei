const ROWS = 3;
const COLUMNS = ROWS;
const N = 3;
export default class Game {
    // #region Initialization
    board;
    history;
    constructor(board = new Array(ROWS * COLUMNS).fill(0), history = []) {
        this.board = board;
        this.history = history;
    }
    // #endregion
    // #region Accessors
    get rows() {
        return ROWS;
    }
    get columns() {
        return COLUMNS;
    }
    get lastMove() {
        return this.history[this.history.length - 1];
        ;
    }
    // #endregion
    // #region Miscellaneous
    performMove(index, player, notifyObservers = false) {
        this.board[index] = player;
        this.history.push(index);
        if (notifyObservers) {
        }
    }
    /* TODO: Not sure if this works. */
    undoMove(notifyObservers = false) {
        let index = this.board.indexOf(this.history.pop());
        this.board[index] = 0;
        if (notifyObservers) {
        }
    }
    /*
    public getEmptyCells(player = undefined): any[] {
        const cells = [];

        for (let i = 0; i < (ROWS * COLUMNS); i++) {
            if (this.board[i] === 0) {
                const cell: any = player === undefined ? i : this.clone();

                if (player !== undefined) {
                    cell.performMove(i, player);
                }

                cells.push(cell);
            }
        }

        return cells;
    }
    */
    getEmptyCells() {
        const cells = [];
        for (let i = 0; i < (ROWS * COLUMNS); i++) {
            if (this.board[i] === 0) {
                cells.push(i);
            }
        }
        return cells;
    }
    /*
        TODO: merge this and above methods.
    */
    getSuccessors(player) {
        let successors = [];
        for (let i = 0; i < (ROWS * COLUMNS); i++) {
            if (this.board[i] === 0) {
                const clone = this.clone();
                clone.performMove(i, player);
                successors.push(clone);
            }
        }
        return successors;
    }
    isOver(player) {
        return this.hasWon(player) || this.isDraw();
    }
    getWinner(player) {
        return this.hasWon(player) ? player : -1;
    }
    // #endregion
    // #region Utility
    clone() {
        return new Game(this.board.slice(), this.history.slice());
    }
    isCellEmpty(index) {
        return this.board[index] === 0;
    }
    isDraw() {
        return !this.board.includes(0);
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
        if (this.board.filter((p) => (p === player)).length < N) {
            return false; // ... Return `false` by default.
        }
        if (this.board.filter(p => p === player).length < N) {
            return false;
        }
        const matrix = this.toMatrix(this.board, ROWS);
        if (checkHorizontal(matrix, Math.floor(this.lastMove / ROWS))) {
            return true;
        }
        else if (checkVertical(matrix, this.lastMove % ROWS)) {
            return true;
        }
        else if (checkPrimaryDiagonal(matrix, Math.floor(this.lastMove / ROWS), this.lastMove % ROWS)) {
            return true;
        }
        else if (checkSecondaryDiagonal(matrix, Math.floor(this.lastMove / ROWS), this.lastMove % ROWS)) {
            return true;
        }
        return false;
    }
    toMatrix(array, length) {
        const matrix = [];
        for (let i = 0; i < array.length; i += length) {
            matrix.push(array.slice(i, i + length));
        }
        return matrix;
    }
}
