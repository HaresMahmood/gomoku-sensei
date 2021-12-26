const ROWS = 9;
const COLUMNS = ROWS;
const N = 5;
export default class GameModel {
    _board;
    _history;
    _turn;
    /*=== Accessors ===*/
    get rows() {
        return ROWS;
    }
    get columns() {
        return COLUMNS;
    }
    /*=== Miscellaneous ===*/
    performMove(board, index, player) {
        board[index] = player;
    }
    undo(notifyObservers = false) {
        let move = this._history.pop();
        let index = this._board.indexOf(move);
        this._board.splice(index, 1);
        if (notifyObservers) {
        }
    }
    getPossibleSuccessors() {
    }
    makeRandomMove(playerNumber) {
        const emptyCells = .getEmptyCells();
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        this.performMove(randomCell, playerNumber);
        ;
    }
}
