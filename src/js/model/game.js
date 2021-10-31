//https://stackoverflow.com/questions/25100714/for-a-deep-copy-of-a-javascript-multidimensional-array-going-one-level-deep-see
function deepClone(arr) {
    var len = arr.length;
    var newArr = new Array(len);
    for (var i=0; i<len; i++) {
      if (Array.isArray(arr[i])) {
        newArr[i] = deepClone(arr[i]);
      }
      else {
        newArr[i] = arr[i];
      }
    }
    return newArr;
  }

import Event from "../utility/event.js";

export default class Game {
    constructor(player = 1, state = Array.from(Array(15), () => new Array(15).fill(0)), lastRow = -1, lastColumn = -1) {
      this.player = player;
      this.state = state; 
      this.lastRow = lastRow;
      this.lastColumn = lastColumn;

      this.changePlayerEvent = new Event();
    }

    getTurn() {
        return this.player;
    }

    changeTurn() {
        this.player = this.player === 1 ? 2 : 1;
    }

    isCellEmpty(row, column) {
      return this.state[row][column] === 0;
    }

    getLastMove() {
      return [this.lastRow, this.lastColumn];
    }


    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
    }

    cloneState() {
      return deepClone(this.state);
    }

    copyState() {
        return new Game(this.player, deepClone(this.state), this.lastRow, this.lastColumn);
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

    performRandomMove() {
      //var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      let moves = this.getPossibleMoves();
      
      this.performMove(moves[Math.floor(Math.random() * moves.length)]);
      this.switchPlayer();
    }

    getCurrentPlayer() {
      return this.player;
    }

    getNextPlayer() {
      return this.player === 1 ? 2 : 1;
    }

    getPossibleMoves() {
      let moves = []

      for (let r = 0; r < 15; r++) {
          for (let c = 0; c < 15; c++) {
              if (this.state[r][c] === 0) {
                  moves.push([r, c]);
              }
          }
      }

      return moves;
    }

    getPossibleSuccessors() {
        let successors = []

        for (let r = 0; r < 15; r++) {
            for (let c = 0; c < 15; c++) {
                let successor = this.getSuccessor(r, c);

                if (successor !== undefined) {
                    successors.push(successor);
                }
            }
        }

        return successors;
    }

    isOver() {
      // TODO: Improve algorithm
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

        return counter >= 5;
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

        if (horizontalCounter
            || verticalCounter
            || diagonalCounterLeft
            || diagonalCounterRight
            || this.isDraw()) {
            return true;
        }

        return false;
    }

    getWinner() {
      let winner = this.isDraw() ? -1 : this.player;

      return winner;
    }

    /* Helper function */

    getSuccessor(row, column) {
        if (this.state[row][column] === 0) {
            let copy = deepClone(this.state);

            copy[row][column] = this.player;

            return new Game(this.player === 1 ? 2 : 1, copy, row, column);
        }

        return;
    }
      


    isDraw() {
        for (let r = 0; r < 15; r++) {
            for (let c = 0; c < 15; c++){
                if (this.state[r][c] === 0) {
                    return false;
                }
            }
        }

        return true;
    }
}