export default class State {
    constructor(game = null, player = 1, wins = 0.0, visits = 0) {
        this.game = game;
        this.playerNumber = player;
        this.wins = wins;
        this.visits = visits;
    }

    getOpponentPlayerNumber() {
        return this.playerNumber === 1 ? 2 : 1;
    }

    togglePlayer() {
        this.playerNumber = this.getOpponentPlayerNumber();
    }

    getMoves() {
        let possibleMoves = [];
        let emptyPositions = this.game.getPossibleMoves();

        for (const position of emptyPositions) {
            const child = new State(this.game.copyState(), this.getOpponentPlayerNumber());
            
            child.game.performMove(position, child.playerNumber);
            possibleMoves.push(child);
        }

        return possibleMoves;
    }

    makeRandomMove() {
        const emptyPositions = this.game.getPossibleMoves();
        const randomPosition = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];

        this.game.performMove(randomPosition, this.playerNumber);
    }
}