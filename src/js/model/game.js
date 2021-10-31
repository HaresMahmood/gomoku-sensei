const ROWS = 3;
const COLUMNS = 3;

export default class Game {
    constructor(state = new Array(ROWS * COLUMNS).fill(0), lastMove = -1) {
      this.state = state;
      this.lastMove = lastMove;
    }

    clone() {
        return new Game(_.clone(this.state), this.lastMove);
    }

    isCellEmpty(index) {
      return this.state[index] === 0;
    }

    performMove(index, player) {
      this.state[index] = player;
      this.lastMove = index;
    }

    getPossibleSuccessors(player) {
      let successors = [];

      for (let i = 0; i < (ROWS * COLUMNS); i++) {
          let copy = _.clone(this.state);

          if (copy[i] === 0) {
              copy[i] = player;

              successors.push(new Game(copy, i));

              console.log(copy, i);
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
      
        for (let i = -4; i < 5; i++) {
          if (board[row - i] !== undefined && board[column - i] !== undefined) {
            pieces.push(board[row - i][column - i]);
          } 
        }

        return countConsecutivePieces(player, pieces)
      }

      function checkSecondaryDiagonal(board, player, row, column) {
        let pieces = [];

        for (let i = -4; i < 5; i++) {
          if (board[row - i] !== undefined && board[column + i] !== undefined) {
            pieces.push(board[row - i][column + i]);
          } 
        }

        return countConsecutivePieces(player, pieces)
      }

      /*
        const horizontalCounter = checkHorizontal(this.state, this.player, this.lastRow);
        const verticalCounter = checkVertical(this.state, this.player, this.lastColumn);
        const diagonalCounterLeft = checkPrimaryDiagonal(this.state, this.player, this.lastRow, this.lastColumn);
        const diagonalCounterRight = checkSecondaryDiagonal(this.state, this.player, this.lastRow, this.lastColumn);

        return horizontalCounter
        || verticalCounter
        || diagonalCounterLeft
        || diagonalCounterRight
        || this.isDraw();
        */

        return this.isDraw();
    }

    getWinner() {
      let winner = this.isDraw() ? -1 : this.state[this.lastMove];

      return winner;
    }

    isDraw() {
        return !this.state.includes(0);
    }

    toMatrix() {
      const matrix = [];
      while(this.state.length) matrix.push(this.state.splice(0, ROWS));

      return matrix;
    }
}