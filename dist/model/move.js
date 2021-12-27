export default class Move {
    _index;
    _player;
    constructor(index, player) {
        this._index = index;
        this._player = player;
    }
    /*=== Accessors ===*/
    get index() {
        return this._index;
    }
    get player() {
        return this._player;
    }
    /*=== Miscellaneous ===*/
    /*=== Utility ===*/
    isEmpty() {
        return this._player === 0;
    }
}
