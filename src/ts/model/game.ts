const ROWS = 5;
const COLUMNS = ROWS;
const N = 4;

export default class Game {
    // #region Initialization

    private board: number[];
    public lastMove: number;

    constructor(state = new Array(ROWS * COLUMNS).fill(0), lastMove: number = -1) {
        this.board = state;
        this.lastMove = lastMove;
    }

    // #endregion

    // #region Accessors

    public get rows() {
        return ROWS;
    }

    public get columns() {
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

    public performMove(index: number, player: number, notifyObservers: boolean = false): void {
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

    public restart() {
        for (let i: number = 0; i < this.board.length; i++) {
            this.board[i] = 0;
            this.lastMove = -1;
        }
    }

    // #endregion

    // #region Utility
    
    /**
     * 
     * @param player The last player.
     * @returns Whether the given `player` has won.
     * @see https://stackoverflow.com/questions/64755169/check-for-a-row-of-4-diagonally-vertically-and-horizontally-using-javascript
     */
    hasWon(player) {
        const boardString: string = this.toDelimitedString(this.board);
        const win = new RegExp(`(${player})(\\1{${N - 1}}|(${".".repeat(ROWS)}\\1){${N - 1}}|(${".".repeat(ROWS + 1)}\\1){${N - 1}}|((?=.{0,${ROWS - 1}}#)${".".repeat(ROWS - 1)}\\1){${N - 1}})`);

        return win.test(boardString);
    }

    public getHeuristicEvaluation(player: number) {
        const boardString: string = this.toDelimitedString(this.board);
        const won = this.hasWon(player);
        const nextPlayer = player === 1 ? 2 : 1;

        function score(currentPlayer, nMin2Open, nMin1Half, nMin1Open) {
            const threat = (index: number) => {
                return `(${currentPlayer})(\\1{${index - 1}}|(${".".repeat(ROWS)}\\1){${index - 1}}|(${".".repeat(ROWS + 1)}\\1){${index - 1}}|((?=.{0,${ROWS - 1}}#)${".".repeat(ROWS - 1)}\\1){${index - 1}})`;
            };

            const open = (index) => {
                const match = new RegExp(`0${threat(index)}(?=0)`, "g");

                // console.log(`0${threat(index)}(?=0)`);
                // console.log(boardString.match(match));

                return (boardString.match(match) || []).length;
            }

            const half = (index) => {
                const upperBlock = new RegExp(`(?<!0)${threat(index)}(?=0)`, "g");
                const lowerBlock = new RegExp(`0${threat(index)}(?!0)`);

                return (boardString.match(upperBlock) || []).length + (boardString.match(lowerBlock) || []).length;
            }

            // for (let i: number = 1; i <= N - 3; i++) {
            //     return ((2 * i - 1) - half(i) + (2 * i * open(i)))
            //     + 2 * (N - 2) // TODO: Not sure about this one.
            //     - half(N - 2)
            //     + nMin2Open * open(N - 2)
            //     + nMin1Half * half(N - 1)
            //     + nMin1Open * open(N - 1)
            //     + (won ? 1000000 : 0);
            // }

            return open(3);
        }

        return score(player, 100, 80, 250); // - score(nextPlayer, 1300, 2000, 5020)
    }

    public getHeuristicEvaluation2(player: number) {
        const matrix: number[][] = this.toMatrix(this.board, ROWS);

        function countConsecutivePieces(pieces: string, index: number, isHalfOpen: boolean) {
            const playerPieces: string = `(${player})(\\1{${index - 1}}`;
            let match = `0${playerPieces}`;
            let count = 0;
            
            if (isHalfOpen) {
                const lowerBlock = new RegExp(match, "g"); // Create additional lower block `RegEx`.

                match += "(?!0)"; // Add upper block to `RegEx`.
                count += (pieces.match(lowerBlock) || []).length;
            }

            const regex = new RegExp(match, "g");

            count += (pieces.match(regex) || []).length;
            
            return count;
        }

        function checkHorizontal(row: number, index: number, isHalfOpen: boolean) {
            return countConsecutivePieces(matrix[row].join(""), index, isHalfOpen);
        }

        function checkVertical(column: number, index: number, isHalfOpen: boolean) {
            return countConsecutivePieces(matrix.map(row => row[column]).join(""), index, isHalfOpen);
        }

        function checkPrimaryDiagonalTop(row: number, index: number, isHalfOpen: boolean) {
            let pieces = "";

            for (let i = 0; i < ROWS; i++) {
                if (matrix[i + row] !== undefined) {
                    pieces += matrix[i][i + row];
                    // diagMatrix[i][i + row] = "d";
                }
            }

            return countConsecutivePieces(pieces, index, isHalfOpen);
        }

        function checkPrimaryDiagonalBottom(row: number, index: number, isHalfOpen: boolean) {
            let pieces = "";

            for (let i = 1; i < ROWS; i++) {
                if (matrix[i + row] !== undefined) {
                    pieces += matrix[i + row][i];
                }
            }

            return countConsecutivePieces(pieces, index, isHalfOpen);
        }

        function checkSecondDiagonalTop(row: number, index: number, isHalfOpen: boolean) {
            let pieces = "";

            for (let i = 0; i < ROWS; i++) {
                if (matrix[i - row] !== undefined) {
                    pieces += matrix[i - row][(ROWS - 1) - i];
                }
            }

            return countConsecutivePieces(pieces, index, isHalfOpen);
        }

        function checkSecondDiagonalBottom(row: number, index: number, isHalfOpen: boolean) {
            let pieces = "";

            for (let i = 0; i < ROWS; i++) {
                if (matrix[i + row] !== undefined) {
                    pieces += matrix[i + row][(ROWS - 1) - i];
                }
            }

            return countConsecutivePieces(pieces, index, isHalfOpen);
        }

        let score: number = 0;

        for (let i: number = 0; i < ROWS; i++) {
            score += checkHorizontal(i)
            score += checkVertical(i);  
            score += checkPrimaryDiagonalBottom(i);
            score += checkSecondDiagonalBottom(i);

            if (i != 0) {
                score += checkPrimaryDiagonalTop(i);
                score += checkSecondDiagonalTop(i);
            }
        }
    }

    getWinner() {
        const player = this.board[this.lastMove]; // FIXME: `player` should be passed in as a parameter.
        let winner = this.hasWon(player) ? player : -1;

        return winner;
    }

    isDraw() {
        return !this.board.includes(0);
    }

    private toMatrix(array, length: number) {
        const matrix = []; 
      
        for (let i = 0 ; i < array.length; i += length) {
            matrix.push(array.slice(i, i + length));
        }

        return matrix;
    }

    private toDelimitedString(array): string {
        const delimit = new RegExp(`(.{${ROWS}})`, "g");

        return array.join("").replace(delimit,"$1#").slice(0, -1);
    }

    public toString() {
        return this.toMatrix(this.board, ROWS);
    }

    // #endregion
}