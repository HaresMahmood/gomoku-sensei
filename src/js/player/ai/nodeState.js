export default class NodeState {
    constructor(player = 1, game = null, move = null, visits = 0, wins = 0.0) {
        this.player = player;
        this.game = game;
        this.move = move;
        this.visits = visits;
        this.wins = wins;
    }

    // TODO
    isTerminal() {
        return this.game.isOver();
    }

    getNextPlayer() {
        return this.game.getNextPlayer();
    }

    getPossibleMoves() {
        return this.game.getPossibleMoves();
    }

    getRandomMove() {
        let moves = this.getPossibleMoves();

        return moves[Math.floor(Math.random() * moves.length)];
    }

    performMove(move) {
        this.board.performMove(move);
        this.move = move;
    }

    switchPlayer() {
        this.player = this.getNextPlayer();
    }
}