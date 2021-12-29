import Event from "../../utility/event.js";

export interface AI {
    chooseMove(game): void;
}

export default abstract class AbstractAI implements AI {
    protected _player: number;
    private _chooseMoveEvent: Event;

    public constructor(playerNumber: number) {
        this._player = playerNumber;
        this._chooseMoveEvent = new Event();
    }

    public get player() {
        return this._player;
    }

    public get chooseMouseEvent() {
        return this._chooseMoveEvent;
    }

    abstract chooseMove(game): void;

    public executeMove(move: number):void {
        this._chooseMoveEvent.trigger(move);
    }
}