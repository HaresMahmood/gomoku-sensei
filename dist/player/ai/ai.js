import Event from "../../utility/event.js";
export default class AI {
    player;
    chooseMoveEvent;
    constructor(playerNumber) {
        this.player = playerNumber;
        this.chooseMoveEvent = new Event();
    }
    executeMove(move) {
        this.chooseMoveEvent.trigger(move);
    }
}
