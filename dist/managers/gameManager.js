const ROWS = 9;
const COLUMNS = ROWS;
const N = 5;
export default class GameManager {
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
}
