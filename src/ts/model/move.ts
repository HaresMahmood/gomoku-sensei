export default class Move {
    private _index: number;
    private _player: number;
    private _turn: number;
    private _previousMove: Move;

    constructor(index: number, player: number, lastMove: Move) {
        this._index = index;
        this._player = player;
        this._turn = lastMove.turn + 1;
        this._previousMove = lastMove;
    }

    /*=== Accessors ===*/

    public get index() {
        return this._index;
    }

    public get player() {
        return this._player;
    }

    public get turn() {
        return this._turn;
    }

    public get previousMove() {
        return this._previousMove;
    }

    /*=== Utility ===*/

    public isEmpty(): boolean {
        return this._player === 0;
    }
}