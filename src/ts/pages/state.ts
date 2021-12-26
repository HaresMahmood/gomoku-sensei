export default class State {
    private _board: number[];

    public get board() {
        return this._board;
    }


    constructor(board: number[] = new Array(ROWS * COLUMNS).fill(0)) {
        this._board = board;
    }


    public clone(): State {
        

        return new State()
    }
}