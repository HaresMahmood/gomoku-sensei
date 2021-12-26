export default class Move {
    _index;
    _player;
    _turn;
    _previousMove;
    get turn() {
        return this._turn;
    }
    get previousMove() {
        return this._previousMove;
    }
    constructor(index, player, lastMove) {
        this._index = index;
        this._player = player;
        this._turn = lastMove.turn + 1;
        this._previousMove = lastMove;
    }
    isEmpty() {
        return this._player === 0;
    }
}
