const ROWS = 7;
const COLUMNS = ROWS;
const N = 5;
/**
 * MDP representation of the game of Gomoku. The dimensions
 * of the board, as well as the token chain-length can all be
 * tweaked, essentially allowing for the representation of
 * any m, n, k-game.
 */
export default class Game {
    // #region Initialization
    board;
    lastMove; // TODO: Make private.
    _moveNumber;
    constructor(state = new Array(ROWS * COLUMNS).fill(0), lastMove = -1, moveNumber = 1) {
        this.board = state;
        this.lastMove = lastMove;
        this._moveNumber = moveNumber;
    }
    // #endregion
    // #region Accessors
    /**
     * The amount of rows on the game board.
     */
    get rows() {
        return ROWS;
    }
    /**
     * The amount of columns on the game board.
     * Usually equal to the amount of rows.
     */
    get columns() {
        return COLUMNS;
    }
    //TODO: `k`.
    /**
     * The amount of tokens to chain together in
     * order to win.
     */
    get n() {
        return N;
    }
    /**
     * The amount of moves played so far, i.e.
     * the length of the game.
     */
    get moveNumber() {
        return this._moveNumber;
    }
    // #endregion
    // #region Miscellaneous
    // TODO: `[make]Transition()`.
    /**
     * Flips a cell to the provided player's number.
     * Also increases the move counter.
     *
     * @param index Cell on board.
     * @param player Player's who's turn it currently is.
     */
    performMove(index, player) {
        this.board[index] = player;
        this.lastMove = index;
        this._moveNumber++;
    }
    /**
     * Adds all empty positions on the board to a list.
     *
     * @returns A list of all empty cells.
     */
    getEmptyCells() {
        const cells = [];
        for (let i = 0; i < (ROWS * COLUMNS); i++) {
            if (this.isCellEmpty(i)) {
                cells.push(i);
            }
        }
        return cells;
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
    getSuccessors(player) {
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
    getWinner() {
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
    hasWon(player) {
        const boardString = this.toDelimitedString(this.board, '#', ROWS);
        const win = new RegExp(`(${player})(\\1{${N - 1}}|(${".".repeat(ROWS)}\\1){${N - 1}}|(${".".repeat(ROWS + 1)}\\1){${N - 1}}|((?=.{0,${ROWS - 1}}#)${".".repeat(ROWS - 1)}\\1){${N - 1}})`);
        return win.test(boardString);
    }
    /**
     * Resets the game to its original state.
     */
    restart() {
        // Reset whole board.
        for (let i = 0; i < this.board.length; i++) {
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
    clone() {
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
    toDelimitedString(list, character, interval) {
        const delimit = new RegExp(`(.{${interval}})`, "g");
        return list.join("").replace(delimit, `$1${character}`).slice(0, -1);
    }
}
