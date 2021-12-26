export default class State {
    _board;
    get board() {
        return this._board;
    }
    constructor(board = new Array(ROWS * COLUMNS).fill(0)) {
        this._board = board;
    }
    clone() {
        return new State();
    }
}
