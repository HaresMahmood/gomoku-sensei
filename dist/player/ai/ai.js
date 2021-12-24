import Event from "../../utility/event.js";
export default class AI {
    playerNumber;
    chooseMoveEvent;
    constructor(playerNumber) {
        this.playerNumber = playerNumber;
        this.chooseMoveEvent = new Event();
    }
    executeMove(move) {
        this.chooseMoveEvent.trigger(move);
    }
}
