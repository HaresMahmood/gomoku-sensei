export default interface MDP {
    /**
     * transitions from one state to another.
     * 
     * @param index Cell on board.
     * @param player Player's who's turn it currently is.
     */
    makeTransition(move: any, player: any): void;

    /**
     * Gets a list of successors from the current states.
     * 
     * @param player Player who's turn it currently is to play.
     * @returns All successors from the current game state.
     */
    getSuccessors(player: any): MDP[];

    /**
     * 
     * @returns 
     */
    isTerminal(): boolean;

    /**
     * 
     * @returns 
     */
    getUtilityScore(): number;

    /**
     * Clones the state of the game.
     * 
     * @returns A deep-clone of the current current state of the game.
     */
    clone(): MDP;

}