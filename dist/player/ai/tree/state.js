export default class State {
    // #region Initialization
    _game;
    _playerNumber;
    _wins;
    _visits;
    // Specifically for Dynamic AI. 
    _gameLength;
    _isTerminal;
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
    get game() {
        return this._game;
    }
    get playerNumber() {
        return this._playerNumber;
    }
    get wins() {
        return this._wins;
    }
    get visits() {
        return this._visits;
    }
    get gameLength() {
        return this._gameLength;
    }
    get isTerminal() {
        return this._isTerminal;
    }
    set game(value) {
        this._game = value;
    }
    set playerNumber(value) {
        this._playerNumber = value;
    }
    set wins(value) {
        this._wins = value;
    }
    set visits(value) {
        this._visits = value;
    }
    set gameLength(value) {
        this._gameLength = value;
    }
    set isTerminal(value) {
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
        this._game.performMove(randomCell, this._playerNumber);
    }
}
