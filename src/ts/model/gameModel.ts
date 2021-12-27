import Move from "./move.js";

const ROWS = 3;
const COLUMNS = ROWS;
const N = 3;

export default class GameModel {
    private _board: number[];
    private _history: number[];

    constructor(board = new Array(ROWS * COLUMNS).fill(0), history: number[] = []) {
        this._board = board;
        this._history = history;
    }

    /*=== Accessors ===*/

    public get rows() {
        return ROWS;
    }

    public get columns() {
        return COLUMNS;
    }

    public get lastMove() {
        return this._history[this._history.length - 1];;
    }

    /*=== Miscellaneous ===*/

    public performMove(index: number, player: number, notifyObservers: boolean = false) {
        this._board[index] = player;
        this._history.push(index);

        if (notifyObservers) {
            
        }
    }

    /* TODO: Not sure if this works. */
    public undo(notifyObservers: boolean = false) {
        let index: number = this._board.indexOf(this._history.pop());

        this._board[index] = 0;

        if (notifyObservers) {

        }
    }

    public getEmptyCells(): number[] {
        const cells: number[] = [];

        for (let i: number = 0; i < (ROWS * COLUMNS); i++) {
            if (this._board[i] === 0) {
                cells.push(i);
            }
        }

        return cells;
    }

    /* 
        TODO: Instead of a Game object in State/Node, hold a Move object instead.
    */
    public getSuccessors(player: number): GameModel[] {
        let successors: GameModel[] = [];

        for (let i: number = 0; i < (ROWS * COLUMNS); i++) {
            if (this._board[i] === 0) {
                const clone = this.clone();

                clone.performMove(i, player)
                successors.push(clone);
            }
        }

        return successors;
    }

    public performRandomMove(player: number) {
        const emptyCells = this.getEmptyCells();
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        this.performMove(randomCell, player);
    }

    public isOver(player: number): boolean {
        return this.hasWon(player) || this.isDraw();
    }

    public getWinner(player: number) {
        return this.hasWon(player) ? player : -1;
    }

    public isDraw(): boolean {
        return !this._board.includes(0);
    }

    /*=== Utility ===*/

    public clone() {
        return new GameModel(this._board.slice(), this._history.slice());
    }

    public isCellEmpty(index: number) {
        return this._board[index] === 0;
    }

    private hasWon(player: number): boolean {
        function countConsecutivePieces(pieces: number[]) {
            let counter = 0;
            let last = null;

            for (let i = 0; i < pieces.length; i++) {
                if (pieces[i] === player) {
                    if (pieces[i] !== last) {
                        counter = 0;
                    }
                    counter++;
                }

                last = pieces[i]
            }

            return counter >= N;
        }

        function checkHorizontal(board: number[][], row: number) {
            return countConsecutivePieces(board[row]);
        }

        function checkVertical(board: number[][], column: number) {
            return countConsecutivePieces(board.map(row => row[column]));
        }

        function checkPrimaryDiagonal(board: number[][], row: number, column: number) {
            let pieces = [];

            for (let i = -(N - 1); i < N; i++) {
                if (board[row - i] !== undefined && board[column - i] !== undefined) {
                    pieces.push(board[row - i][column - i]);
                }
            }

            return countConsecutivePieces(pieces)
        }

        function checkSecondaryDiagonal(board: number[][], row: number, column: number) {
            let pieces = [];

            for (let i = -(N - 1); i < N; i++) {
                if (board[row - i] !== undefined && board[column + i] !== undefined) {
                    pieces.push(board[row - i][column + i]);
                }
            }

            return countConsecutivePieces(pieces)
        }

        // If the player has not placed enough pieces to win the game, ...
        if (this._board.filter((p) => (p === player)).length < N) {
            return false; // ... Return `false` by default.
        }

        const matrix: number[][] = this.toMatrix(this._board, ROWS);
        const horizontalCounter = checkHorizontal(matrix,Math.floor(this.lastMove / ROWS));
        const verticalCounter = checkVertical(matrix, this.lastMove % ROWS);
        const diagonalCounterLeft = checkPrimaryDiagonal(matrix, Math.floor(this.lastMove / ROWS), this.lastMove % ROWS);
        const diagonalCounterRight = checkSecondaryDiagonal(matrix, Math.floor(this.lastMove / ROWS), this.lastMove % ROWS);

        return horizontalCounter ||
            verticalCounter ||
            diagonalCounterLeft ||
            diagonalCounterRight;
    }

    private toMatrix(array, length: number) {
        const matrix = []; 
      
        for (let i = 0 ; i < array.length; i += length) {
            matrix.push(array.slice(i, i + length));
        }

        return matrix;
    }
}