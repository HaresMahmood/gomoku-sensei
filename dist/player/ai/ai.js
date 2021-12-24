import Event from "../../utility/event";
export default class AI {
    constructor(playerNumber) {
        this.playerNumber = playerNumber;
        this.chooseMoveEvent = new Event();
    }
    executeMove(move) {
        this.chooseMoveEvent.trigger(move);
    }
}
