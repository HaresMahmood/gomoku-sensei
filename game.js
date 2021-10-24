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

export default class Game {
    constructor() {
        this.player = 1;
        this.state = Array.from(Array(15), () => new Array(15)); // 15 by 15 board.
    }


    getTurn() {
        return this.player;
    }

    changeTurn() {
        this.player = this.player === 1 ? 2 : 1;
    }


    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
    }

    copyState() {
        return deepClone(this.state);
    }

    setCoordinates(row, column) {
        this.state[row][column] = this.player;
    }


    getSuccessors() {
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

    isGameOver(player, row, column) {
        const horizontalCounter = this.checkHorizontal(this.state, player, row, column);
        const verticalCounter = this.checkVertical(this.state, player, row, column);
        const diagonalCounterLeft = this.checkDiagonalLeft(this.state, player, row, column);
        const diagonalCounterRight = this.checkDiagonalRight(this.state, player, row, column);
        
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
        let winner = this.isDraw() ? -1 : this.player;

        return winner;
    }

    /* Helper function */

    getSuccessor(row, column) {
        // TODO: Risky to use `undefined` for empty element. Initialize grod with somethng else (maybe `0`).
        if (this.state[row][column] === undefined) {
            let copy = this.copyState();

            copy[row][column] = this.player;

            return copy;
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