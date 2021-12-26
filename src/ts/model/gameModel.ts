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

    /*
    public performMove(index: number, player: number): void {
        let move: Move = new Move(index, player, this._lastMove);

        this._board[index] = move;
        this._lastMove = move;
    }
    */

    public performMove(move: Move) {
        this._board[move.index] = move;
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

    public performRandomMove(player: number) {
        const successors = this.getEmptyCells();
        const randomCell = successors[Math.floor(Math.random() * successors.length)];
        const move = new Move(randomCell, player, this._lastMove);

        this.performMove(move);
    }

    public isOver(player: number): boolean {
        return this.hasWon(player) || this.isDraw();
    }

    public getWinner(player: number) {
        return this.hasWon(player) ? player : -1;
    }

    public isDraw(): boolean {
        return !this._board.some(m => m.isEmpty())
    }

    /*=== Utility ===*/

    public togglePlayer(player: number): number {
        return player === 1 ? 2 : 1;
    }

    private hasWon(player: number): boolean {
        function countConsecutivePieces(pieces: Move[]) {
            let counter = 0;
            let last = null;

            for (let i = 0; i < pieces.length; i++) {
                if (pieces[i].index === player) {
                    if (pieces[i] !== last) {
                        counter = 0;
                    }
                    counter++;
                }

                last = pieces[i]
            }

            return counter >= N;
        }

        function checkHorizontal(board: Move[][], row: number) {
            return countConsecutivePieces(board[row]);
        }

        function checkVertical(board: Move[][], column: number) {
            return countConsecutivePieces(board.map(row => row[column]));
        }

        function checkPrimaryDiagonal(board: Move[][], row: number, column: number) {
            let pieces = [];

            for (let i = -(N - 1); i < N; i++) {
                if (board[row - i] !== undefined && board[column - i] !== undefined) {
                    pieces.push(board[row - i][column - i]);
                }
            }

            return countConsecutivePieces(pieces)
        }

        function checkSecondaryDiagonal(board: Move[][], row: number, column: number) {
            let pieces = [];

            for (let i = -(N - 1); i < N; i++) {
                if (board[row - i] !== undefined && board[column + i] !== undefined) {
                    pieces.push(board[row - i][column + i]);
                }
            }

            return countConsecutivePieces(pieces)
        }

        const matrix = this.toMatrix(this._board, ROWS);
        const horizontalCounter = checkHorizontal(matrix,Math.floor(this._lastMove.index / ROWS));
        const verticalCounter = checkVertical(matrix, this._lastMove.index % ROWS);
        const diagonalCounterLeft = checkPrimaryDiagonal(matrix, Math.floor(this._lastMove.index / ROWS), this._lastMove.index % ROWS);
        const diagonalCounterRight = checkSecondaryDiagonal(matrix, Math.floor(this._lastMove.index / ROWS), this._lastMove.index % ROWS);

        return horizontalCounter ||
            verticalCounter ||
            diagonalCounterLeft ||
            diagonalCounterRight;
    }

    private toMatrix(array, length: number) {
        const matrix = []; 
      
        for (let i = 0 ;i < array.length; i += length) {
            matrix.push(array.slice(i, i + length));
        }

        return matrix;
    }
}