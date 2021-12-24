import Event from "../../utility/event.js";

export default class RandomAI {
    constructor(player) {
        this.player = player;

        this.chooseMoveEvent = new Event();
    }  
    
    chooseMove(state) {
        let moves = state.getPossibleSuccessors();

        if (moves.length) {
            let random = moves[Math.floor(Math.random() * moves.length)];
            
            this.chooseMoveEvent.trigger(random);

            return random;
        }

        return;
    }
}