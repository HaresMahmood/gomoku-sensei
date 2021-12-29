import Event from "../../utility/event.js";
export default class AbstractAI {
    _player;
    _chooseMoveEvent;
    constructor(playerNumber) {
        this._player = playerNumber;
        this._chooseMoveEvent = new Event();
    }
    get player() {
        return this._player;
    }
    get chooseMouseEvent() {
        return this._chooseMoveEvent;
    }
    executeMove(move) {
        this._chooseMoveEvent.trigger(move);
    }
}
