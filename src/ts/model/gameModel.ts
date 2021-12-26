import Move from "./move";

const ROWS = 9;
const COLUMNS = ROWS;
const N = 5;

export default class GameModel {
    private _board: Move[];
    private _lastMove: Move;
    
    /*=== Accessors ===*/

    public get rows() {
        return ROWS;
    }

    public get columns() {
        return COLUMNS;
    }


    constructor() {

    }

    /*=== Miscellaneous ===*/

    public performMove(index: number, player: number): void {
        let move: Move = new Move(index, player, this._lastMove);

        this._board[index] = move;
        this._lastMove = move;
    }

    /* TODO: Not sure if this works. */
    public undo(notifyObservers: boolean = false) {
        let index: number = this._board.indexOf(this._lastMove);
        this._lastMove = this._lastMove.previousMove;

        this._board[index] = new Move(index, 0, this._lastMove);

        if (notifyObservers) {

        }
    }

    public getEmptyCells(): number[] {
        const cells: number[] = [];

        for (let i: number = 0; i < (ROWS * COLUMNS); i++) {
            if (this._board[i].isEmpty()) {
                cells.push(i);
            }
        }

        return cells;
    }

    /* 
        TODO: Instead of a Game object in State/Node, hold a Move object instead.
    */
    public getSuccessors(player: number): Move[] {
        let successors: Move[] = [];

        for (let i: number = 0; i < (ROWS * COLUMNS); i++) {
            if (this._board[i].isEmpty()) {
                successors.push(new Move(i, player, this._lastMove));
            }
        }

        return successors;
    }

    public makeRandomMove(player: number) {
        const successors = this.getEmptyCells();
        const randomCell = successors[Math.floor(Math.random() * successors.length)];

        this.performMove(randomCell, player);
    }
}