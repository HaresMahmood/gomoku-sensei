export default class State {
    constructor(game = null, playerNumber = 1, wins = 0.0, visits = 0, untriedMoves = null) {
        this.game = game;
        this.playerNumber = playerNumber;
        this.wins = wins;
        this.visits = visits;
        this.untriedMoves = untriedMoves;
    }

    clone() {
        return new State(this.game.clone(), this.playerNumber, this.wins, this.visits);
    }

    getOpponentPlayerNumber() {
        return this.playerNumber === 1 ? 2 : 1;
    }

    togglePlayer() {
        this.playerNumber = this.getOpponentPlayerNumber();
    }

    getRandomMove() {
        const untriedMove = this.untriedMoves[Math.floor(Math.random() * this.untriedMoves.length)];
        const untriedState = this.game.getSuccessorFromMove(untriedMove, this.playerNumber);
        const move = new State(untriedState, this.getOpponentPlayerNumber);

        this.untriedMoves.splice(this.untriedMoves[untriedMove], 1);

        return move;
    }

    makeRandomMove() {
        const emptyCells = this.game.getEmptyCells();
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        this.game.performMove(randomCell, this.playerNumber);
    }
}