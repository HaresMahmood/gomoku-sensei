import Game from "../../../model/game.js";

export default class State {
    constructor(game = null, player = 1, wins = 0.0, visits = 0) {
        this.game = game;
        this.playerNumber = player;
        this.wins = wins;
        this.visits = visits;
    }

    clone() {
        return new this.constructor(this.game.copyState(), this.playerNumber, this.wins, this.visits);
    }

    getOpponentPlayerNumber() {
        return this.playerNumber === 1 ? 2 : 1;
    }

    togglePlayer() {
        this.game.switchPlayer();
        this.playerNumber = this.getOpponentPlayerNumber();
    }

    getMoves() {
        let possibleMoves = [];
        let emptyPositions = this.game.getPossibleSuccessors(this.game.state);
        let opponentPlayerNumber = this.getOpponentPlayerNumber();
    
        console.log(emptyPositions);

        for (const position of emptyPositions) {

            const child = new State(position, opponentPlayerNumber);

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