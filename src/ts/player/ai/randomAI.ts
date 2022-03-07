import Gomoku from "../../model/game";
import AbstractAI from "./ai.js";

export default class RandomAI extends AbstractAI {
    chooseMove(game: Gomoku): number {
        const moves: Gomoku[] = game.getSuccessors(this._player);
        const random: Gomoku = moves[Math.floor(Math.random() * moves.length)];

        return random.lastMove;
    }
}