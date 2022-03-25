import AbstractPlayer from "../abstractPlayer.js";

/**
 * Generic representation of an AI agent in a game.
 * Delegates the move choice process to concrete classes. 
 * This way, a variety of game-playing algorithms can be
 * used.
 */
export default abstract class AbstractAI extends AbstractPlayer {
    // #region Properties 

    // Inherited docs.
    public get information(): [string, string] {
        return ["AI", "smart_toy"];
    }

    // #endregion
}