import MDP from "../model/mdp.js";

/**
 * Abstraction of a player participating in a game.
 */
export default interface Player {
    // #region Properties

    /**
     * Identifying number of the player.
     */
    player: number;

    /**
     * Properties of the player, such as its name and
     * corresponding icon. Used by the View.
     */
    information: [string, string];

    // #endregion

    /**
     * Abstraction of the move choice process. Delegates
     * logic to concrete classes.
     * 
     * @param mdp MDP-representation of the game being played. 
     * @returns Coordinates of the chosen move.
     */
    chooseMove(mdp: MDP): number;
}