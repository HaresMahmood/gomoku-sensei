const ROWS = 5;
const COLUMNS = ROWS;
const N = 4;
export default class Game {
    // #region Initialization
    board;
    lastMove;
    constructor(state = new Array(ROWS * COLUMNS).fill(0), lastMove = -1) {
        this.board = state;
        this.lastMove = lastMove;
    }
    // #endregion
    // #region Accessors
    get rows() {
        return ROWS;
    }
    get columns() {
        return COLUMNS;
    }
    // #endregion
    // #region Miscellaneous
    clone() {
        return new Game(this.board.slice(), this.lastMove);
    }
    isCellEmpty(index) {
        return this.board[index] === 0;
    }
    performMove(index, player, notifyObservers = false) {
        this.board[index] = player;
        this.lastMove = index;
        if (notifyObservers) {
        }
    }
    getEmptyCells() {
        const cells = [];
        for (let i = 0; i < (ROWS * COLUMNS); i++) {
            if (this.board[i] === 0) {
                cells.push(i);
            }
        }
        return cells;
    }
    getSuccessors(player) {
        let successors = [];
        for (let i = 0; i < (ROWS * COLUMNS); i++) {
            let copy = this.board.slice();
            if (copy[i] === 0) {
                copy[i] = player;
                successors.push(new Game(copy, i));
            }
        }
        return successors;
    }
    isOver() {
        const player = this.board[this.lastMove]; // TODO: Think of better way of doing this.
        return this.hasWon(player) || this.isDraw();
    }
    restart() {
        for (let i = 0; i < this.board.length; i++) {
            this.board[i] = 0;
            this.lastMove = -1;
        }
    }
    // #endregion
    // #region Utility
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
    getHeuristicEvaluation(player) {
        const matrix = this.toMatrix(this.board, ROWS);
        const diagMatrix = this.toMatrix(this.board, ROWS);
        function countConsecutivePieces(pieces) {
            // TODO: Start at `2`, move up to `N`.
            const win = new RegExp(`${player}`.repeat(N), "g");
            if (win.test(pieces)) {
                return Infinity;
            }
            const openFour = new RegExp("0" + `${player}`.repeat(N - 1) + "0", "g");
            if (openFour.test(pieces)) {
                return 9999999;
            }
            const openThree = new RegExp("0" + `${player}`.repeat(N - 2) + "0", "g");
            if (openThree.test(pieces)) {
                return 50;
            }
            // const openTwo = new RegExp("0" + `${player}`.repeat(N - 3) + "0", "g");
            return 0;
        }
        function checkHorizontal(row) {
            return countConsecutivePieces(matrix[row].join(""));
        }
        function checkVertical(column) {
            return countConsecutivePieces(matrix.map(row => row[column]).join(""));
        }
        function checkPrimaryDiagonalTop(row) {
            let pieces = "";
            for (let i = 0; i < ROWS; i++) {
                if (matrix[i + row] !== undefined) {
                    pieces += matrix[i][i + row];
                }
            }
            return countConsecutivePieces(pieces);
        }
        function checkPrimaryDiagonalBottom(row) {
            let pieces = "";
            for (let i = 0; i < ROWS; i++) {
                if (matrix[i + row] !== undefined) {
                    pieces += matrix[i + row][i];
                }
            }
            return countConsecutivePieces(pieces);
        }
        function checkSecondDiagonalBottom(row) {
            let pieces = "";
            for (let i = 0; i < ROWS; i++) {
                if (matrix[i + row] !== undefined) {
                    pieces += matrix[i + row][(ROWS - 1) - i];
                }
            }
            return countConsecutivePieces(pieces);
        }
        function checkSecondDiagonalTop(row) {
            let pieces = "";
            for (let i = 0; i < ROWS; i++) {
                if (matrix[i - row] !== undefined) {
                    pieces += matrix[i - row][(ROWS - 1) - i];
                }
            }
            return countConsecutivePieces(pieces);
        }
        let score = 0;
        for (let i = 0; i < ROWS; i++) {
            score = score
                + checkHorizontal(i)
                + checkVertical(i);
            +checkPrimaryDiagonalTop(i);
            +checkPrimaryDiagonalBottom(i);
            +checkSecondDiagonalTop(i);
            +checkSecondDiagonalBottom(i);
        }
        console.log(checkSecondDiagonalBottom(0));
        return score;
    }
    getWinner() {
        const player = this.board[this.lastMove]; // FIXME: `player` should be passed in as a parameter.
        let winner = this.hasWon(player) ? player : -1;
        return winner;
    }
    isDraw() {
        return !this.board.includes(0);
    }
    toMatrix(array, length) {
        const matrix = [];
        for (let i = 0; i < array.length; i += length) {
            matrix.push(array.slice(i, i + length));
        }
        return matrix;
    }
    toString() {
        return this.toMatrix(this.board, ROWS);
    }
}
