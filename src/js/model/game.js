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
    constructor(player, state, lastRow, lastColumn) {
      if (player !== undefined) {
        this.player = player;
      }
      else {
        this.player = 1;
      }

      if (state !== undefined) {
        this.state = state; 
      }
      else {
        this.state = Array.from(Array(15), () => new Array(15).fill(0)); // 15 by 15 board.
      }

      if (lastRow !== undefined) {
        this.lastRow = lastRow;
      }
      else {
        this.lastRow = -1;
      }

      if (lastColumn !== undefined) {
        this.lastColumn = lastColumn;
      }
      else {
        this.lastColumn = -1;
      }

      this.changePlayerEvent = new Event();
    }


    getTurn() {
        return this.player;
    }

    changeTurn() {
        this.player = this.player === 1 ? 2 : 1;
    }

    isCellEmpty(row, column) {
      console.log(this.state[row][column] === 0);
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
        return new Game(this.player === 1 ? 2 : 1, deepClone(this.state), this.lastRow, this.lastColumn);
    }

    setCoordinates(row, column) {
        this.state[row][column] = this.player;
    }

    changePlayer() {
      this.player = this.player === 1 ? 2 : 1;

      this.changePlayerEvent.trigger(this.player);
    }

    performMove(move) {
      this.state[move[0]][move[1]] = this.player;
      this.lastRow = move[0];
      this.lastColumn = move[1];
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
              if (this.state[r][c] !== 0) {
                  moves.push([r, c]);
              }
          }
      }

      return successors;
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
        const horizontalCounter = this.checkHorizontal(this.state, this.player, this.lastRow, this.lastColumn);
        const verticalCounter = this.checkVertical(this.state, this.player, this.lastRow, this.lastColumn);
        const diagonalCounterLeft = this.checkDiagonalLeft(this.state, this.player, this.lastRow, this.lastColumn);
        const diagonalCounterRight = this.checkDiagonalRight(this.state, this.player, this.lastRow, this.lastColumn);
        
        if (horizontalCounter >= 5
            || verticalCounter >= 5
            || diagonalCounterLeft >= 5 
            || diagonalCounterRight >= 5
            || this.isDraw()) {
            return true;
        }

        return false;
    }

    getWinner() {
        if (this.isOver(this.lastRow, this.lastColumn)) {
          let winner = this.isDraw() ? -1 : this.player;

          return winner;
        }

        return;
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



    checkHorizontal(board, player, row, column) {
        let counter = 0;
      
        for (let i = column - 4; i < column + 5; i++) {
          counter = player === board[row][i] ? counter + 1 : counter;
        }
      
        return counter;
      }
      
    checkVertical(board, player, row, column) {
        let counter = 0;
      
        for (let i = row - 4; i < row + 5; i++) {
          if (board[i] !== undefined) {
            counter = player === board[i][column] ? counter + 1 : counter;
          }
        }
      
        return counter;
      }
      
    checkDiagonalLeft(board, player, row, column) {
        let counter = 0;
      
        for (let i = - 4; i < 5; i++) {
          if (board[row + i] !== undefined) {
            counter = player === board[row + i][column + i] ? counter + 1 : counter;
          }
        }
        return counter;
      }
      
    checkDiagonalRight(board, player, row, column) {
        let counter = 0;
      
        for (let i = - 4; i < 5; i++) {
          if (board[row - i] !== undefined) {
            counter = player === board[row - i][column + i] ? counter + 1 : counter;
          }
        }
      
        return counter;
      }


    isDraw() {
        for (let r = 0; r < 15; r++) {
            for (let c = 0; c < 15; c++){
                if (this.state[r][c] === undefined) {
                    return true;
                }
            }
        }

        return false;
    }
}