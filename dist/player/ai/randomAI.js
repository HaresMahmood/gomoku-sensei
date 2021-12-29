import AI from "./ai";
export default class RandomAI extends AI {
    chooseMove(game, interval) {
        const moves = game.getSuccessors(this.player);
        const random = moves[Math.floor(Math.random() * moves.length)];
        this.executeMove(random.lastMove);
    }
}
