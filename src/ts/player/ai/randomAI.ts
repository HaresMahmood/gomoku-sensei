import Game from "../../model/game";
import AbstractAI from "./ai.js";

export default class RandomAI extends AbstractAI {
    chooseMove(game: Game): number {
        const moves: Game[] = game.getSuccessors(this._player);
        const random: Game = moves[Math.floor(Math.random() * moves.length)];

        return random.lastMove;
    }
}