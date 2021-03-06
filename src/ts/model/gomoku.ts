import MDP from "./mdp.js";

// #region Constants

const ROWS = 7;
const COLUMNS = ROWS;
const K = 5;

// #endregion

/**
 * MDP representation of the game of _Gomoku_. The dimensions
 * of the board, as well as the token chain-length can all be
 * tweaked, essentially allowing for the representation of
 * any _m_, _n_, _k_-game.
 * 
 * @see {@link MDP} for generic properties of Markov Decision Processes.
 * @see {@link https://en.wikipedia.org/wiki/Gomoku} for information on this specific game.
 * @see {@link https://en.wikipedia.org/wiki/M,n,k-game} for the theoratical or mathematical representation of any _m_, _n_, _k_-game.
 * 
 */
export default class Gomoku implements MDP {
    // #region Initialization

    private _board: number[];
    private _lastMove: number;
    private _moveNumber: number;

    /**
     * Class constructor.
     * 
     * @param board Arrangement of pieces on the board.
     * @param lastMove Coordinates of the last performed move.
     * @param moveNumber Amount of turns commenced so far, the game's length.
     */
    constructor(board = new Array(ROWS * COLUMNS).fill(0), lastMove: number = -1, moveNumber: number = 1) {
        this._board = board;
        this._lastMove = lastMove;
        this._moveNumber = moveNumber;
    }

    // #endregion

    // #region Properties

    /**
     * The amount of rows on the game board.
     */
    public get rows() {
        return ROWS;
    }

    /**
     * The amount of columns on the game board.
     * Usually equal to the amount of rows.
     */
    public get columns() {
        return COLUMNS;
    }

    /**
     * The amount of moves played so far, i.e. 
     * the length of the game.
     */
    public get moveNumber() {
        return this._moveNumber;
    }

    /**
     * Coordinates of the last move.
     */
    public get lastMove() {
        return this._lastMove;
    }

    // #endregion

    // #region Miscellaneous

    /**
     * Flips a cell to the provided player's number.
     * Also increases the move counter.
     */
    public makeTransition(move: number, player: number): void {
        this._board[move] = player; // Flip given cell to the given player's number.
        this._lastMove = move; // Update the last move.
        this._moveNumber++; // Increment the move number.
    }

    // Inherited docs.
    public makeRandomTransition(player: number): void {
        const emptyCells = this.getEmptyCells();
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        this.makeTransition(randomCell, player);
    }

    /**
     * Checks for all empty positions on the board and 
     * creates a copy of the current game state with 
     * a new move added to the copied state.
     */
    public getSuccessors(player: number): MDP[] {
        let successors = [];

        for (let i = 0; i < (ROWS * COLUMNS); i++) {
            if (this._board[i] === 0) {
                const copy = this.clone();
                copy.makeTransition(i, player)

                successors.push(copy);
            }
        }

        return successors;
    }

    // Inherited docs.
    public isTerminal(): boolean {
        const player = this._board[this._lastMove];

        return this.hasWon(player) || this.isDraw();
    }

    // Inherited docs.
    public getUtilityScore(): number {
        const player = this._board[this._lastMove];
        let winner = this.hasWon(player) ? player : -1;

        return winner;
    }
    
    /**
     * Checks if the specified player has won the game.
     * 
     * @param player The last player.
     * @returns Whether the given player has chained together `N` pieces.
     * @see {@link toDelimitedString} for details on the string format.
     * @see {@link https://stackoverflow.com/a/64760249/13318731} for the original for the RegEx expression.
     */
    public hasWon(player: number): boolean {
        const boardString: string = this.toDelimitedString(this._board, '#', ROWS);
        const win = new RegExp(`(${player})(\\1{${K - 1}}|(${".".repeat(ROWS)}\\1){${K - 1}}|(${".".repeat(ROWS + 1)}\\1){${K - 1}}|((?=.{0,${ROWS - 1}}#)${".".repeat(ROWS - 1)}\\1){${K - 1}})`);

        return win.test(boardString);
    }

    /**
     * Resets the game to its original state.
     */
    public restart() {
        // Reset whole board.
        for (let i: number = 0; i < this._board.length; i++) {
            this._board[i] = 0;
        }
        
        this._lastMove = -1;
        this._moveNumber = 1;
    }

    // #endregion

    // #region Utility

    /**
     * Checks whether the cell at the provided cell is empty.
     * 
     * @param index Coordinates of the cell.
     * @returns Whether the cell is empty.
     */
    public isCellEmpty(index: number): boolean {
        return this._board[index] === 0;
    }

    /**
     * Checks whether the game has ended in a draw.
     * 
     * @returns Whether the game has ended in a draw.
     */
    public isDraw(): boolean {
        return !this._board.includes(0);
    }
    
    // Inherited docs.
    public clone(): MDP {
        return new Gomoku(this._board.slice(), this._lastMove, this._moveNumber);
    }

    /**
     * Aggregates the coordinates of all empty positions on the
     * board in a list.
     * 
     * @returns Coordinates of all emoty positions on the board.
     */
    public getEmptyCells() {
        const cells = [];

        for (let i = 0; i < (ROWS * COLUMNS); i++) {
            if (this._board[i] === 0) {
                cells.push(i);
            }
        }

        return cells;
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
     * // Returns "100#010#001", representing a simple tic-tac-toe board:
     * toDelimitedString([1, 0, 0, 0, 1, 0, 0, 0, 1], '#', 3);
     */
    private toDelimitedString<T>(list: T[], character: string, interval: number): string {
        const delimit = new RegExp(`(.{${interval}})`, "g");

        return list.join("").replace(delimit,`$1${character}`).slice(0, -1);
    }

    // #endregion
}