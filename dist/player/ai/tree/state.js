export default class State {
    _game;
    _playerNumber;
    _wins;
    _visits;
    constructor(game = null, playerNumber = 1, wins = 0, visits = 0) {
        this._game = game;
        this._playerNumber = playerNumber;
        this._wins = wins;
        this._visits = visits;
    }
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
