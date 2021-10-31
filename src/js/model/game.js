import Event from "../utility/event.js";

const ROWS = 3;
const COLUMNS = 3;

export default class Game {
    constructor(player = 1, state = Array.from(Array(ROWS), () => new Array(COLUMNS).fill(0)), lastRow = -1, lastColumn = -1) {
      this.player = player;
      //this.state = Array.from(Array(ROWS), () => new Array(COLUMNS).fill(0));
      this.state = state;
      this.lastRow = lastRow;
      this.lastColumn = lastColumn;

      this.changePlayerEvent = new Event();

      /*
      if (state !== null) {
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLUMNS; c++) {
            this.state[r][c] = state[r][c];
          }
        }
      }
      */
    }

    changeTurn() {
        this.player = this.player === 1 ? 2 : 1;
    }

    getLastMove() {
      return [this.lastRow, this.lastColumn];
    }

    copyState() {
        return new Game(this.player, _.cloneDeep(this.state), this.lastRow, this.lastColumn);
    }

    setCoordinates(row, column) {
        this.state[row][column] = this.player;
    }

    switchPlayer() {
      this.player = this.player === 1 ? 2 : 1;
    }

    changePlayer() {
      this.player = this.player === 1 ? 2 : 1;

      this.changePlayerEvent.trigger(this.player);
    }

    performMove(move, player) {
      this.state[move[0]][move[1]] = player;
      this.lastRow = move[0];
      this.lastColumn = move[1];
    }

    isCellEmpty(row, column) {
      return this.state[row][column] === 0;
    }

    getPossibleMoves() {
      let moves = []

      for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLUMNS; c++) {
              if (this.state[r][c] === 0) {
                  moves.push([r, c]);
              }
          }
      }

      return moves;
    }

    getPossibleSuccessors(state) {
      function getSuccessor(board, player, row, column) {
        //console.log(board, row, column); // TODO: Deep copy fails sometimes.
        if (board[row][column] === 0) {
            board[row][column] = player;

            return new Game(player === 1 ? 2 : 1, board, row, column);
        }

        return;
      }

      const copy = _.cloneDeep(state);
      let successors = [];

      console.log(state);
      console.log(_.cloneDeep(state));
      
      console.log(state);

      for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
              let successor = getSuccessor(copy, this.player, r, c);

              if (successor !== undefined) {
                  successors.push(successor);
              }
          }
      }

      return successors;
  }

    isOver() {
      function countConsecutivePieces(player, pieces) {
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

        return counter >= 3;
      }

      function checkHorizontal(board, player, row) {
        return countConsecutivePieces(player, board[row]);
      }

      function checkVertical(board, player, column) {
        return countConsecutivePieces(player, board.map(row => row[column]));
      }

      function checkPrimaryDiagonal(board, player, row, column) {
        let pieces = [];
        //let state = this.cloneState();
      
        for (let i = -4; i < 5; i++) {
          if (board[row - i] !== undefined && board[column - i] !== undefined) {
            pieces.push(board[row - i][column - i]);
            //state[row - i][column - i] = this.player === this.state[row - i][column - i] ? `${this.player}` : "X";
          } 
        }

        return countConsecutivePieces(player, pieces)
      }

      function checkSecondaryDiagonal(board, player, row, column) {
        let pieces = [];
        //let state = this.cloneState();
      
        for (let i = -4; i < 5; i++) {
          if (board[row - i] !== undefined && board[column + i] !== undefined) {
            pieces.push(board[row - i][column + i]);
            //state[row - i][column + i] = this.player === this.state[row - i][column + i] ? `${this.player}` : "X";
          } 
        }

        return countConsecutivePieces(player, pieces)
      }

        const horizontalCounter = checkHorizontal(this.state, this.player, this.lastRow);
        const verticalCounter = checkVertical(this.state, this.player, this.lastColumn);
        const diagonalCounterLeft = checkPrimaryDiagonal(this.state, this.player, this.lastRow, this.lastColumn);
        const diagonalCounterRight = checkSecondaryDiagonal(this.state, this.player, this.lastRow, this.lastColumn);

        return horizontalCounter
        || verticalCounter
        || diagonalCounterLeft
        || diagonalCounterRight
        || this.isDraw();
    }

    getWinner() {
      let winner = this.isDraw() ? -1 : this.player;

      return winner;
    }

    isDraw() {
        return !this.state.some(row => row.includes(0)) || this.getPossibleMoves().length === 0;
    }
}