import Game from "../../model/game";
import AI from "./ai";

export default class RandomAI extends AI {
    chooseMove(game: Game, interval) {
        const moves: Game[] = game.getSuccessors(this.player);
        const random: Game = moves[Math.floor(Math.random() * moves.length)];

        this.executeMove(random.lastMove);
    }
}