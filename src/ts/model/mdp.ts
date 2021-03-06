/**
 * Generic interface representing a Markov Decision Process.
 */
export default interface MDP {
    // #region Properties

    /**
     * The amount of moves played so far, i.e. 
     * the length of the game.
     */
    moveNumber: number;

    /**
     * Coordinates of the last move.
     */
    lastMove: number;

    // #region Miscellaneous

    // #endregion

    /**
     * Transitions from the current state to another.
     * 
     * @param index Cell on board.
     * @param player Player's who's turn it currently is.
     */
    makeTransition(move: any, player: any): void;

    /**
     * Transitions from the current state to a random one.
     * 
     * @param player Player's who's turn it currently is.
     */
    makeRandomTransition(player: any): void;

    /**
     * Gets a list of successors from the current states.
     * 
     * @param player Player who's turn it currently is to play.
     * @returns All successors from the current game state.
     */
    getSuccessors(player: any): MDP[];

    /**
     * Checks whether the current state is terminal.
     * 
     * @returns Whether the current state is terminal.
     */
    isTerminal(): boolean;

    /**
     * Determines the utility score of the game. In many
     * board-games, this is either:
     * * `1`: A win for player 1.
     * * `2`: A win for player 2.
     * * `-1`: A win or loss for neither; a draw.
     * 
     * @returns The utility score of the game.
     */
    getUtilityScore(): number;

    /**
     * Copies the current state.
     * 
     * @returns A deep-clone of the current current state of the game.
     */
    clone(): MDP;

    // #endregion
}