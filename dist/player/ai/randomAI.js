import AbstractAI from "./ai.js";
export default class RandomAI extends AbstractAI {
    chooseMove(game) {
        const moves = game.getSuccessors(this._player);
        const random = moves[Math.floor(Math.random() * moves.length)];
        this.executeMove(random.lastMove);
    }
}
