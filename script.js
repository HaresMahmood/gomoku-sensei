var turn = "black";
var grid = Array.from(Array(15), () => new Array(15));

$(".box").click(function () {
  if ($(this).find(".piece").length === 0) {
    var piece = `<div class="piece ${turn}-piece"></div>`;

    $(this).append(piece);

    let row = $(this).parent().index();
    let column = $(this).index();

    grid[row][column] = turn;

    checkWin(turn, row, column);

    turn = turn == "black" ? "white" : "black";
  }
})

function checkWin(turn, row, column) {
  const horizontalCounter = checkHorizontal(turn, row, column);
  const verticalCounter = checkVertical(turn, row, column);
  const diagonalCounterLeft = checkDiagonalLeft(turn, row, column);
  const diagonalCounterRight = checkDiagonalRight(turn, row, column);

  if (horizontalCounter >= 5
     || verticalCounter >= 5
     || diagonalCounterLeft >= 5 
     || diagonalCounterRight >= 5) {
    window.alert(`${turn} wins!`);
  }
}

function checkHorizontal(turn, row, column) {
  let counter = 0;

  for (let i = column - 4; i < column + 5; i++) {
    counter = turn === grid[row][i] ? counter + 1 : counter;
  }

  return counter;
}

function checkVertical(turn, row, column) {
  let counter = 0;

  for (let i = row - 4; i < row + 5; i++) {
    if (grid[i] !== undefined) {
      counter = turn === grid[i][column] ? counter + 1 : counter;
    }
  }

  return counter;
}

function checkDiagonalLeft(turn, row, column) {
  let counter = 0;

  for (let i = -4; i < 5; i++) {
    if (grid[row + i] !== undefined) {
      counter = turn === grid[row + i][column + i] ? counter + 1 : counter;
    }
  }
  return counter;
}

function checkDiagonalRight(turn, row, column) {
  let counter = 0;

  for (let i = -4; i < 5; i++) {
    if (grid[row - i] !== undefined) {
      counter = turn === grid[row - i][column + i] ? counter + 1 : counter;
    }
  }

  return counter;
}