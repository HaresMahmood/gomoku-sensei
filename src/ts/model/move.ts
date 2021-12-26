export default class Move {
    private _index: number;
    private _player: number;
    private _turn: number;
    private _previousMove: Move;


    public get turn() {
        return this._turn;
    }

    public get previousMove() {
        return this._previousMove;
    }


    constructor(index: number, player: number, lastMove: Move) {
        this._index = index;
        this._player = player;
        this._turn = lastMove.turn + 1;
        this._previousMove = lastMove;
    }


    public isEmpty(): boolean {
        return this._player === 0;
    }
}