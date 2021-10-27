import Event from "../../utility/event.js";

export default class KillerAI {
    constructor(player) {
        this.player = player;

        this.chooseMoveEvent = new Event();
    }  
    
    chooseMove(state) {
        let moves = state.getPossibleMoves();

        if (moves.length) {
            let random = moves[Math.floor(Math.random() * moves.length)];
            
            this.chooseMoveEvent.trigger(random);

            return random;
        }

        return;
    }
}