import Gomoku from "../../../model/game.js";

export default class State {
    // #region Initialization

    private _game: Gomoku;
    private _playerNumber: number;
    private _wins: number;
    private _visits: number;

    // Specifically for Dynamic AI. 
    private _gameLength: number;
    private _isTerminal: boolean;
    
    constructor(game = null, playerNumber = 1, wins = 0, visits = 0, gameLength = 0, isTerminal = false) {
        this._game = game;
        this._playerNumber = playerNumber;
        this._wins = wins;
        this._visits = visits;

        this._gameLength = gameLength;
        this._isTerminal = isTerminal;
    }

    // #endregion

    // #region Properties

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

    public get gameLength() {
        return this._gameLength;
    }

    public get isTerminal() {
        return this._isTerminal;
    }

    public set game(value: Gomoku) {
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

    public set gameLength(value: number) {
        this._gameLength = value;
    }

    public set isTerminal(value: boolean) {
        this._isTerminal = value;
    }

    // #endregion

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
        let emptyPositions = this._game.getSuccessors(this._playerNumber);
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

        this._game.makeTransition(randomCell, this._playerNumber);
    }
}