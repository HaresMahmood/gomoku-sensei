/**
 * Generic interface representing a Markov Decision Process.
 */
export default interface MDP {
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
     * @returns 
     */
    isTerminal(): boolean;

    /**
     * Determines the utility score of the game. In many
     * board-games, this is either:
     * * `1`: A win for player 1.
     * * `2`: A win for player 2.
     * * `-1`: A win for neither; a draw.
     * 
     * @returns 
     */
    getUtilityScore(): number;

    /**
     * Copies the current state.
     * 
     * @returns A deep-clone of the current current state of the game.
     */
    clone(): MDP;
}