import Move from "./move";
const ROWS = 9;
const COLUMNS = ROWS;
const N = 5;
export default class GameModel {
    _board;
    _lastMove;
    /*=== Accessors ===*/
    get rows() {
        return ROWS;
    }
    get columns() {
        return COLUMNS;
    }
    constructor() {
    }
    /*=== Miscellaneous ===*/
    performMove(index, player) {
        let move = new Move(index, player, this._lastMove);
        this._board[index] = move;
        this._lastMove = move;
    }
    /* TODO: Not sure if this works. */
    undo(notifyObservers = false) {
        let index = this._board.indexOf(this._lastMove);
        this._lastMove = this._lastMove.previousMove;
        this._board[index] = new Move(index, 0, this._lastMove);
        if (notifyObservers) {
        }
    }
    getEmptyCells() {
        const cells = [];
        for (let i = 0; i < (ROWS * COLUMNS); i++) {
            if (this._board[i].isEmpty()) {
                cells.push(i);
            }
        }
        return cells;
    }
    /*
        TODO: Instead of a Game object in State/Node, hold a Move object instead.
    */
    getSuccessors(player) {
        let successors = [];
        for (let i = 0; i < (ROWS * COLUMNS); i++) {
            if (this._board[i].isEmpty()) {
                successors.push(new Move(i, player, this._lastMove));
            }
        }
        return successors;
    }
    makeRandomMove(player) {
        const successors = this.getEmptyCells();
        const randomCell = successors[Math.floor(Math.random() * successors.length)];
        this.performMove(randomCell, player);
    }
}
