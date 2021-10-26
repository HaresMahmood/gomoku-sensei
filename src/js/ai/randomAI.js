export default class RandomAI {
    constructor(player) {
        this.player = player;
    }  
    
    chooseMove(state) {
        let moves = state.getPossibleMoves();

        if (moves.length) {
            let random = moves[Math.floor(Math.random() * moves.length)];

            return random;
        }

        return;
    }
}