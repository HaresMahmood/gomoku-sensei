export default class State {
    // #region Initialization
    _mdp;
    _playerNumber;
    _wins;
    _visits;
    // Specifically for Dynamic AI. 
    _gameLength;
    _isTerminal;
    /**
     * Class constructor.
     *
     * @param mdp
     * @param playerNumber
     * @param wins
     * @param visits
     * @param gameLength
     * @param isTerminal
     */
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
    get mdp() {
        return this._mdp;
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
    set mdp(value) {
        this._mdp = value;
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
    // #region Miscellaneous
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
    // #endregion
    // #region Utility 
    clone() {
        return new State(this._mdp.clone(), this._playerNumber, this._wins, this._visits);
    }
    getOpponentPlayerNumber() {
        return this._playerNumber === 1 ? 2 : 1;
    }
    togglePlayer() {
        this._playerNumber = this.getOpponentPlayerNumber();
    }
}
