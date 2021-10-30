import Event from "../../utility/event.js";

export default class MinimaxAI {
    constructor(player) {
        this.player = player;
        this.chooseMoveEvent = new Event();
    }  

    chooseMove(game) {
        let value = this.minimax(game, -Infinity, Infinity, true);

        console.log(value);
        
        this.chooseMoveEvent.trigger(value);			
        //return path.at(-1);
    }

    /*
    minimax(game, alpha = -Infinity, beta = Infinity) {
        let path = [];
        
        if (game.isOver()) {
            return [this.utility(game), path];
        }

        let multiplier = game.player === 1 ? -1 : 1;
        let value = multiplier * Infinity;
        let successors = game.getPossibleSuccessors();

        for (let i = 0; i < successors.length; i++) {
            let c = successors[i];
            let minimax = this.minimax(c, alpha, beta);
            let bestValue = minimax[0];
            let newPath = minimax[1];
            
            bestValue = game.player === 1 ? Math.max(value, bestValue) : Math.min(value, bestValue);

            if ((game.player === 1 && bestValue > value)
              || (game.player === 2 && bestValue < value)) {
                path = [c].concat(newPath);
            } 

            value = bestValue;

            alpha = game.player === 1 ? Math.max(alpha, value) : alpha;
            beta = game.player === 2 ? Math.min(beta, value) : beta;

            if ((game.player === 1 && alpha >= beta)
              || game.player === 2 && beta <= alpha) {
                break;
            }
        }

        console.log(value, path);
        
        return [value, path];
    }
    */

    minimax(game, alpha, beta, maximizingPlayer) {
        if (game.isOver()) {
            return this.utility(game);
        }

        if (maximizingPlayer) {
            let value = -Infinity;
            let successors = game.getPossibleSuccessors();

            for (let i = 0; i < successors.length; i++) {
                let c = successors[i];

                value = Math.max(value, this.minimax(c, alpha, beta, false));

                if (value >= beta) {
                    break;
                }

                alpha = Math.max(alpha, value);
            }

            console.log(value);

            return value;
        }
        else {
            let value = Infinity;
            let successors = game.getPossibleSuccessors();

            for (let i = 0; i < successors.length; i++) {
                let c = successors[i];

                value = Math.max(value, this.minimax(c, alpha, beta, true));

                if (value <= alpha) {
                    break;
                }

                beta = Math.min(beta, value);
            }

            console.log(value);

            return value;
        }
    }

    utility(game) {
        return game.player === 1 ? 1 : -1;
    }
}