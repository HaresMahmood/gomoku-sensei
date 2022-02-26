const ROWS = 7;
const COLUMNS = ROWS;
const N = 5;

export default class Game {
    // #region Initialization

    private board: number[];
    public lastMove: number; // TODO: Make private.
    private _moveNumber: number;

    public get moveNumber() {
        return this._moveNumber;
    }

    constructor(state = new Array(ROWS * COLUMNS).fill(0), lastMove: number = -1, moveNumber: number = 1) {
        this.board = state;
        this.lastMove = lastMove;
        this._moveNumber = moveNumber;
    }

    // #endregion

    // #region Accessors

    public get rows() {
        return ROWS;
    }

    public get columns() {
        return COLUMNS;
    }

    public get n() {
        return N;
    }

    // #endregion

    // #region Miscellaneous

    // TODO: `[make]Transition()`.
    /**
     * Flips a cell to the provided player's number.
     * 
     * @param index 
     * @param player 
     */
    public performMove(index: number, player: number): void {
        this.board[index] = player;
        this.lastMove = index;
        this._moveNumber++;
    }

    // TODO: Refactor this function to make it clearner.
    /**
     * Checks for all empty positions on the board and 
     * creates a copy of the current game state with 
     * a new move added to the copied state.
     * 
     * @param player Player who's turn it currently is to play.
     * @returns All successors from the current game state.
     */
    public getSuccessors(player): Game[] {
        let successors = [];

        for (let i = 0; i < (ROWS * COLUMNS); i++) {
            let copy = this.board.slice();

            if (copy[i] === 0) {
                copy[i] = player;

                successors.push(new Game(copy, i, this._moveNumber + 1));
            }
        }

        return successors;
    }

    // TODO: `isTerminal()`.
    /**
     * 
     * @returns 
     */
    isOver() {
        const player = this.board[this.lastMove]; // TODO: Think of better way of doing this.

        return this.hasWon(player) || this.isDraw();
    }

    // TODO: `getReward()`.
    /**
     * 
     * @returns 
     */
    getWinner(): number {
        const player = this.board[this.lastMove]; // FIXME: `player` should be passed in as a parameter.
        let winner = this.hasWon(player) ? player : -1;

        return winner;
    }
    
    // TODO: `isTerminal()`.
    /**
     * Checks if the specified player has won the game.
     * 
     * @param player The last player.
     * @returns Whether the given `player` has won.
     * @see {@link toDelimitedString} for details on the string format.
     * @see {@link https://stackoverflow.com/a/64760249/13318731} for the original for the RegEx expression.
     */
    public hasWon(player): boolean {
        const boardString: string = this.toDelimitedString(this.board, '#', ROWS);
        const win = new RegExp(`(${player})(\\1{${N - 1}}|(${".".repeat(ROWS)}\\1){${N - 1}}|(${".".repeat(ROWS + 1)}\\1){${N - 1}}|((?=.{0,${ROWS - 1}}#)${".".repeat(ROWS - 1)}\\1){${N - 1}})`);

        return win.test(boardString);
    }

    /**
     * Resets the game to its original state.
     */
    public restart() {
        // Reset whole board.
        for (let i: number = 0; i < this.board.length; i++) {
            this.board[i] = 0;
        }
        
        this.lastMove = -1;
        this._moveNumber = 1;
    }

    // #endregion

    // #region Utility

    /**
     * Checks whether the cell at the provided cell is empty.
     * 
     * @param index Cell-index.
     * @returns Whether the cell is empty.
     */
    isCellEmpty(index) {
        return this.board[index] === 0;
    }

    /**
     * 
     * 
     * @returns Whether the game has ended in a draw.
     */
    isDraw() {
        return !this.board.includes(0);
    }

    /**
     * Clones the state of the game.
     * 
     * @returns A deep-clone of the current current state of the game.
     */
    private clone() {
        return new Game(this.board.slice(), this.lastMove, this._moveNumber);
    }

    /**
     * Uses RegEx to join together a 1-dimensional array
     * representing a game board, where after every row
     * the specified character is inserted. Simplifies performing
     * additional RegEx on the resulting string.
     * 
     * @param list 1-D list of any type, representing a board, to be converted.
     * @param character Character to delimit final stirng with.
     * @param interval Number of elements to skip before adding another character.
     * @returns Delimited string representing a game board.
     * @example 
     * // Returns "100#010#100", representing a simple tic-tac-toe board:
     * toDelimitedString([1, 0, 0, 0, 1, 0, 0, 0, 1], '#', 3);
     */
    private toDelimitedString<T>(list: T[], character: string, interval: number): string {
        const delimit = new RegExp(`(.{${interval}})`, "g");

        return list.join("").replace(delimit,`$1${character}`).slice(0, -1);
    }

    // #endregion
}