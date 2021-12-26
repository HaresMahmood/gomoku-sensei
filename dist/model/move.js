export default class Move {
    _index;
    _player;
    _turn;
    _previousMove;
    constructor(index, player, lastMove) {
        this._index = index;
        this._player = player;
        this._turn = lastMove.turn + 1;
        this._previousMove = lastMove;
    }
    /*=== Accessors ===*/
    get index() {
        return this._index;
    }
    get player() {
        return this._player;
    }
    get turn() {
        return this._turn;
    }
    get previousMove() {
        return this._previousMove;
    }
    /*=== Utility ===*/
    isEmpty() {
        return this._player === 0;
    }
}
