export default class Move {
    private _index: number;
    private _player: number;

    constructor(index: number, player: number) {
        this._index = index;
        this._player = player;
    }

    /*=== Accessors ===*/

    public get index() {
        return this._index;
    }

    public get player() {
        return this._player;
    }

    /*=== Miscellaneous ===*/



    /*=== Utility ===*/

    public isEmpty(): boolean {
        return this._player === 0;
    }
}