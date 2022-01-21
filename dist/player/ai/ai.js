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
    get name() {
        return ["AI", "smart_toy"];
    }
    // #endregion
    // #region Miscellaneous
    get chooseMoveEvent() {
        return this._chooseMoveEvent;
    }
    executeMove(move) {
        this._chooseMoveEvent.trigger(move);
    }
}
