import Game from "../../model/game";
import Event from "../../utility/event";

interface iAI {
    chooseMove(game: Game, iterations: number): void;
}

export default abstract class AI implements iAI {
    protected playerNumber: number;
    private chooseMoveEvent: Event;

    public constructor(playerNumber: number) {
        this.playerNumber = playerNumber;
        this.chooseMoveEvent = new Event();
    }

    abstract chooseMove(game: Game, iterations: number): void;

    public executeMove(move: number):void {
        this.chooseMoveEvent.trigger(move);
    }
}