import Game from "../../../model/game.js";

export default class State {
    private _game: Game;
    private _playerNumber: number;
    private _wins: number;
    private _visits: number;
    
    constructor(game = null, playerNumber = 1, wins = 0, visits = 0) {
        this._game = game;
        this._playerNumber = playerNumber;
        this._wins = wins;
        this._visits = visits;
    }

    public get game() {
        return this._game;
    }

    public get playerNumber() {
        return this._playerNumber;
    }

    public get wins() {
        return this._wins;
    }

    public get visits() {
        return this._visits;
    }

    public set game(value: Game) {
        this._game = value;
    }

    public set playerNumber(value: number) {
        this._playerNumber = value;
    }

    public set wins(value: number) {
        this._wins = value;
    }

    public set visits(value: number) {
        this._visits = value;
    }

    clone() {
        return new State(this._game.clone(), this._playerNumber, this._wins, this._visits);
    }

    getOpponentPlayerNumber() {
        return this._playerNumber === 1 ? 2 : 1;
    }

    togglePlayer() {
        this._playerNumber = this.getOpponentPlayerNumber();
    }

    getMoves() {
        let possibleMoves = [];
        let emptyPositions = this._game.getPossibleSuccessors(this._playerNumber);
        let opponentPlayerNumber = this.getOpponentPlayerNumber();

        for (const position of emptyPositions) {
            const child = new State(position, opponentPlayerNumber);

            possibleMoves.push(child);
        }

        return possibleMoves;
    }

    makeRandomMove() {
        const emptyCells = this._game.getEmptyCells();
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        this._game.performMove(randomCell, this._playerNumber);
    }
}