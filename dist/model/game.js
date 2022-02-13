const ROWS = 7;
const COLUMNS = ROWS;
const N = 5;
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
    // https://stackoverflow.com/questions/64755169/check-for-a-row-of-4-diagonally-vertically-and-horizontally-using-javascript
    hasWon(player) {
        const boardString = this.toDelimitedString(this.board);
        const win = new RegExp(`([${player}])(\\1{${N - 1}}|(${".".repeat(ROWS)}\\1){${N - 1}}|(${".".repeat(ROWS + 1)}\\1){${N - 1}}|((?=.{0,${ROWS - 1}}#)${".".repeat(ROWS - 1)}\\1){${N - 1}})`);
        return win.test(boardString);
    }
    getHeuristicEvaluation(player) {
        const matrix = this.toMatrix(this.board, ROWS);
        // const diagMatrix = this.toMatrix(this.board, ROWS);
        function countConsecutivePieces(pieces) {
            // TODO: Clean this up.
            const win = new RegExp(`${player}`.repeat(N), "g");
            if (win.test(pieces)) {
                return Infinity;
            }
            const openFour = new RegExp("0" + `${player}`.repeat(N - 1) + "0", "g");
            if (openFour.test(pieces)) {
                return 9999999;
            }
            const closedFour = new RegExp("0" + `${player}`.repeat(N - 1) + "|" + `${player}`.repeat(N - 1) + "0", "g");
            if (closedFour.test(pieces)) {
                return 999999; // TODO: Pretty much a random value.
            }
            const openThree = new RegExp("0" + `${player}`.repeat(N - 2) + "0", "g");
            if (openThree.test(pieces)) {
                return 50;
            }
            const closedThree = new RegExp("0" + `${player}`.repeat(N - 2) + "|" + `${player}`.repeat(N - 1) + "0", "g");
            if (closedThree.test(pieces)) {
                return 30; // TODO: Pretty much a random value.
            }
            const openTwo = new RegExp("0" + `${player}`.repeat(N - 3) + "0", "g");
            if (openTwo.test(pieces)) {
                return 500;
            }
            const closedTwo = new RegExp("0" + `${player}`.repeat(N - 2) + "|" + `${player}`.repeat(N - 3) + "0", "g");
            if (closedTwo.test(pieces)) {
                return 15; // TODO: Pretty much a random value.
            }
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
                    // diagMatrix[i][i + row] = "d";
                }
            }
            return countConsecutivePieces(pieces);
        }
        function checkPrimaryDiagonalBottom(row) {
            let pieces = "";
            for (let i = 1; i < ROWS; i++) {
                if (matrix[i + row] !== undefined) {
                    pieces += matrix[i + row][i];
                }
            }
            return countConsecutivePieces(pieces);
        }
        function checkSecondDiagonalTop(row) {
            let pieces = "";
            for (let i = 0; i < ROWS; i++) {
                if (matrix[i - row] !== undefined) {
                    pieces += matrix[i - row][(ROWS - 1) - i];
                    // diagMatrix[i - row][(ROWS - 1) - i] = "d";
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
        let score = 0;
        for (let i = 0; i < ROWS; i++) {
            score += checkHorizontal(i);
            score += checkVertical(i);
            score += checkPrimaryDiagonalBottom(i);
            score += checkSecondDiagonalBottom(i);
            if (i != 0) {
                score += checkPrimaryDiagonalTop(i);
                score += checkSecondDiagonalTop(i);
            }
        }
        console.log(this.toDelimitedString(this.board));
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
    toDelimitedString(array) {
        const delimit = new RegExp(`(.{${ROWS}})`, "g");
        return array.join("").replace(delimit, "$1#").slice(0, -1);
    }
    toString() {
        return this.toMatrix(this.board, ROWS);
    }
}
