import Event from "../../utility/event.js";
import Player from "../player.js";

export default abstract class AbstractAI extends Player {
    // #region Initialization

    private _chooseMoveEvent: Event;

    public constructor(player: number) {
        super(player);
        
        this._name = ["AI", "smart_toy"];

        this._chooseMoveEvent = new Event();
    }

    // #endregion

    // #region Accessors 

    public get name(): [string, string] {
        return ["AI", "smart_toy"];
    }

    // #endregion

    // #region Miscellaneous

    public get chooseMoveEvent() {
        return this._chooseMoveEvent;
    }

    public executeMove(move: number):void {
        this._chooseMoveEvent.trigger(move);
    }

    // #endregion
}