export default class State {
    constructor(game = null, playerNumber = 1, wins = 0.0, visits = 0) {
        this.game = game;
        this.playerNumber = playerNumber;
        this.wins = wins;
        this.visits = visits;
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

    getMoves() {
        let possibleMoves = [];
        let emptyPositions = this.game.getPossibleSuccessors(this.playerNumber);
        let opponentPlayerNumber = this.getOpponentPlayerNumber();

        for (const position of emptyPositions) {
            const child = new State(position, opponentPlayerNumber);

            possibleMoves.push(child);
        }

        return possibleMoves;
    }

    getRandomMove() {
        const moves = this.getMoves();
        return moves[Math.floor(Math.random() * moves.length)];
    }

    makeRandomMove() {
        const emptyCells = this.game.getEmptyCells();
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        this.game.performMove(randomCell, this.playerNumber);
    }
}