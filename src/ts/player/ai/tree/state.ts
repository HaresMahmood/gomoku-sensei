import MDP from "../../../model/mdp";

export default class State {
    // #region Initialization

    private _mdp: MDP;
    private _playerNumber: number;
    private _wins: number;
    private _visits: number;

    // Specifically for Dynamic AI. 
    private _gameLength: number;
    private _isTerminal: boolean;
    
    constructor(mdp = null, playerNumber = 1, wins = 0, visits = 0, gameLength = 0, isTerminal = false) {
        this._mdp = mdp;
        this._playerNumber = playerNumber;
        this._wins = wins;
        this._visits = visits;

        this._gameLength = gameLength;
        this._isTerminal = isTerminal;
    }

    // #endregion

    // #region Properties

    public get mdp() {
        return this._mdp;
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

    public set mdp(value: MDP) {
        this._mdp = value;
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
        return new State(this._mdp.clone(), this._playerNumber, this._wins, this._visits);
    }

    getOpponentPlayerNumber() {
        return this._playerNumber === 1 ? 2 : 1;
    }

    togglePlayer() {
        this._playerNumber = this.getOpponentPlayerNumber();
    }

    getMoves() {
        let possibleMoves = [];
        let emptyPositions = this._mdp.getSuccessors(this._playerNumber);
        let opponentPlayerNumber = this.getOpponentPlayerNumber();

        for (const position of emptyPositions) {
            const child = new State(position, opponentPlayerNumber);

            possibleMoves.push(child);
        }

        return possibleMoves;
    }

    makeRandomMove() {
        this._mdp.makeRandomTransition(this._playerNumber);
    }
}