import GameModel from "../../model/gameModel.js";
import Event from "../../utility/event.js";

interface iAI {
    chooseMove(game: GameModel, iterations: number): void;
}

export default abstract class AI implements iAI {
    protected playerNumber: number;
    private chooseMoveEvent: Event;

    public constructor(playerNumber: number) {
        this.playerNumber = playerNumber;
        this.chooseMoveEvent = new Event();
    }

    abstract chooseMove(game: GameModel, iterations: number): void;

    public executeMove(move: number):void {
        this.chooseMoveEvent.trigger(move);
    }
}