import MDP from "../../model/mdp";
import AbstractAI from "./ai.js";

export default class RandomAI extends AbstractAI {
    chooseMove(game: MDP): number {
        game.makeRandomTransition(this._player);

        return game.lastMove;
    }
}