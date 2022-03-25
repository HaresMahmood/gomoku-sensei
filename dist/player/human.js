import AbstractPlayer from "./abstractPlayer.js";
/**
 * Concrete representation of a human player in a game.
 */
export default class Human extends AbstractPlayer {
    // #region Properties 
    // Inherited docs.
    get information() {
        return ["Human", "person"];
    }
    // #endregion
    // #region Miscellaneous
    /**
     * Abstraction of the move choice process. Since
     * the human player's actions are determined by
     * themselves and not computed programatically,
     * this method does nothing.
     *
     * @param mdp MDP-representation of the game being played.
     * @returns `-1`, interpreted as a dummy value.
     */
    chooseMove(mdp) {
        return -1;
    }
}
