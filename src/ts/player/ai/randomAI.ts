import Game from "../../model/game";
import AbstractAI from "./ai.js";

export default class RandomAI extends AbstractAI {
    chooseMove(game: Game) {
        const moves: Game[] = game.getSuccessors(this._player);
        const random: Game = moves[Math.floor(Math.random() * moves.length)];

        this.executeMove(random.lastMove);
    }
}