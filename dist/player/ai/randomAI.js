import AbstractAI from "./ai.js";
export default class RandomAI extends AbstractAI {
    chooseMove(game) {
        game.makeRandomTransition(this._player);
        return game.lastMove;
    }
}
