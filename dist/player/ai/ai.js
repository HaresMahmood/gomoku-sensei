import Player from "../player.js";
/**
 * Generic representation of an AI agent in a game.
 * Delegates the move choice process to concrete classes.
 * This way, a variety of game-playing algorithms can be
 * used.
 */
export default class AbstractAI extends Player {
    // #region Properties 
    // Inherited docs.
    get name() {
        return ["AI", "smart_toy"];
    }
}
