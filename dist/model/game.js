const ROWS = 9;
const COLUMNS = ROWS;
const N = 5;
export default class Game {
    constructor(state = new Array(ROWS * COLUMNS).fill(0), lastMove = -1) {
        this.state = state;
        this.lastMove = lastMove;
    }
    getRows() {
        return ROWS;
    }
    getColumns() {
        return COLUMNS;
    }
    clone() {
        return new Game(_.clone(this.state), this.lastMove);
    }
    isCellEmpty(index) {
        return this.state[index] === 0;
    }
    performMove(index, player) {
        this.state[index] = player;
        this.lastMove = index;
    }
    getEmptyCells() {
        const cells = [];
        for (let i = 0; i < (ROWS * COLUMNS); i++) {
            if (this.state[i] === 0) {
                cells.push(i);
            }
        }
        return cells;
    }
    getPossibleSuccessors(player) {
        let successors = [];
        for (let i = 0; i < (ROWS * COLUMNS); i++) {
            let copy = _.clone(this.state);
            if (copy[i] === 0) {
                copy[i] = player;
                successors.push(new Game(copy, i));
            }
        }
        return successors;
    }
    isOver() {
        const player = this.state[this.lastMove]; // TODO: Think of better way of doing this.
        return this.hasWon(player) || this.isDraw();
    }
    hasWon(player) {
        function countConsecutivePieces(player, pieces) {
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
        function checkHorizontal(board, player, row) {
            return countConsecutivePieces(player, board[row]);
        }
        function checkVertical(board, player, column) {
            return countConsecutivePieces(player, board.map(row => row[column]));
        }
        function checkPrimaryDiagonal(board, player, row, column) {
            let pieces = [];
            for (let i = -4; i < 5; i++) {
                if (board[row - i] !== undefined && board[column - i] !== undefined) {
                    pieces.push(board[row - i][column - i]);
                }
            }
            return countConsecutivePieces(player, pieces);
        }
        function checkSecondaryDiagonal(board, player, row, column) {
            let pieces = [];
            for (let i = -4; i < 5; i++) {
                if (board[row - i] !== undefined && board[column + i] !== undefined) {
                    pieces.push(board[row - i][column + i]);
                }
            }
            return countConsecutivePieces(player, pieces);
        }
        const horizontalCounter = checkHorizontal(this.toMatrix(), player, Math.floor(this.lastMove / ROWS));
        const verticalCounter = checkVertical(this.toMatrix(), player, this.lastMove % ROWS);
        const diagonalCounterLeft = checkPrimaryDiagonal(this.toMatrix(), player, Math.floor(this.lastMove / ROWS), this.lastMove % ROWS);
        const diagonalCounterRight = checkSecondaryDiagonal(this.toMatrix(), player, Math.floor(this.lastMove / ROWS), this.lastMove % ROWS);
        return horizontalCounter ||
            verticalCounter ||
            diagonalCounterLeft ||
            diagonalCounterRight;
    }
    getWinner() {
        const player = this.state[this.lastMove]; // TODO: Fix this - `player` should be passed in as a parameter.
        let winner = this.hasWon(player) ? player : -1;
        return winner;
    }
    isDraw() {
        return !this.state.includes(0);
    }
    toMatrix() {
        const matrix = [];
        const copy = _.clone(this.state);
        while (copy.length)
            matrix.push(copy.splice(0, ROWS));
        return matrix;
    }
}
