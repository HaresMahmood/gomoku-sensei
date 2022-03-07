import Event from "../../utility/event.js";
import Player from "../player.js";
export default class AbstractAI extends Player {
    // #region Initialization
    _chooseMoveEvent;
    constructor(player) {
        super(player);
        this._name = ["AI", "smart_toy"];
        this._chooseMoveEvent = new Event();
    }
    // #endregion
    // #region Accessors 
    /**
     * Properties of the AI, such as its name and
     * corresponding icon. Used by the view.
     */
    get name() {
        return ["AI", "smart_toy"];
    }
    get chooseMoveEvent() {
        return this._chooseMoveEvent;
    }
    // #endregion
    // #region Miscellaneous
    executeMove(move) {
        this._chooseMoveEvent.trigger(move);
    }
}
