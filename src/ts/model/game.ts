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
        const matrix: number[][] = this.toMatrix(this.board, ROWS);
        const diagMatrix = this.toMatrix(this.board, ROWS);
        const nextPlayer = player === 1 ? 2 : 1;
        const won = this.hasWon(player);

        function score(currentPlayer, nMin2Open, nMin1Half, nMin1Open) {
            let openCount = 0;
            let halfOpenCount = 0;

            const value = (index: number) => {
                function countConsecutivePieces(pieces: string) {
                    const playerPieces: string = `(${player})(\\1{${index - 1}})`;

                    const lowerBlock = new RegExp(`0${playerPieces}(?!0)`, "g"); // Illustration: `[OXXXX-]`.
                    const upperBlock = new RegExp(`(?<!0)${playerPieces}(?=0)`, "g"); // Illustration: `[-XXXXO]`.
                    const open = new RegExp(`0${playerPieces}(?=0)`, "g"); // Illustration: `[OXXXXO]`.
        
                    const openCount = (pieces.match(open) || []).length;
                    const halfOpenCount = (pieces.match(lowerBlock) || []).length + (pieces.match(upperBlock) || []).length;

                    return [openCount, halfOpenCount];
                }
        
                function checkHorizontal(row: number) {
                    const [horiOpenCount, horiHalfOpenCount] = countConsecutivePieces(matrix[row].join(""));
                    
                    openCount += horiOpenCount;
                    halfOpenCount += horiHalfOpenCount;
                }
        
                function checkVertical(column: number) {
                    const [vertOpenCount, vertHalfOpenCount] = countConsecutivePieces(matrix.map(row => row[column]).join(""));
                    
                    openCount += vertOpenCount;
                    halfOpenCount += vertHalfOpenCount;
                }
        
                function checkPrimaryDiagonalTop(row: number) {
                    let pieces = "";
        
                    for (let i = 0; i < ROWS; i++) {
                        if (matrix[i + row] !== undefined) {
                            pieces += matrix[i][i + row];
                            // diagMatrix[i][i + row] = "d";
                        }
                    }
        
                    const [diagOpenCount, diagHalfOpenCount] = countConsecutivePieces(pieces);
                    
                    openCount += diagOpenCount;
                    halfOpenCount += diagHalfOpenCount;
                }
        
                function checkPrimaryDiagonalBottom(row: number) {
                    let pieces = "";
        
                    for (let i = 1; i < ROWS; i++) {
                        if (matrix[i + row] !== undefined) {
                            pieces += matrix[i + row][i];
                        }
                    }
        
                    const [diagOpenCount, diagHalfOpenCount] = countConsecutivePieces(pieces);
                    
                    openCount += diagOpenCount;
                    halfOpenCount += diagHalfOpenCount;
                }
        
                function checkSecondDiagonalTop(row: number) {
                    let pieces = "";
        
                    for (let i = 0; i < ROWS; i++) {
                        if (matrix[i - row] !== undefined) {
                            pieces += matrix[i - row][(ROWS - 1) - i];
                            diagMatrix[i - row][(ROWS - 1) - i] = "d";
                        }
                    }
        
                    const [diagOpenCount, diagHalfOpenCount] = countConsecutivePieces(pieces);
                    
                    openCount += diagOpenCount;
                    halfOpenCount += diagHalfOpenCount;
                }
        
                function checkSecondDiagonalBottom(row: number) {
                    let pieces = "";
        
                    for (let i = 0; i < ROWS; i++) {
                        if (matrix[i + row] !== undefined) {
                            pieces += matrix[i + row][(ROWS - 1) - i];
                        }
                    }

                    const [diagOpenCount, diagHalfOpenCount] = countConsecutivePieces(pieces);
                    
                    openCount += diagOpenCount;
                    halfOpenCount += diagHalfOpenCount;
                }
        
                for (let i: number = 0; i < ROWS; i++) {
                    checkHorizontal(i);
                    checkVertical(i);  

                    checkPrimaryDiagonalTop(i);
                    checkSecondDiagonalTop(i);
        
                    if (i != 0) {
                        checkPrimaryDiagonalBottom(i);
                        checkSecondDiagonalBottom(i);
                    }
                }
                
                return [openCount, halfOpenCount];
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

            return value(3);
        }

        return score(player, 100, 80, 250); // - score(nextPlayer, 1300, 2000, 5020)
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