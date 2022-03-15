import MDP from "../model/mdp";

export default interface Player {
    // #region Properties

    /**
     * Player number of the player.
     */
    player: number;

    /**
     * Properties of the player, such as its name and
     * corresponding icon. Used by the View.
     */
    name: [string, string];

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