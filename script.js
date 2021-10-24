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
});

function checkWin(turn, row, column) {
  let horizontalWin = false;
  let verticalWin = false;
  let diagRightWin = false;
  let diagLeftWin = false;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      horizontalWin = checkRow(turn, r, c, 0, 1); // Horizontal.
      verticalWin = checkRow(turn, r, c, 1, 0); // Vertical.
      diagRightWin = checkRow(turn, r, c, 1, 1); // Diagonal descending right.
      diagLeftWin = checkRow(turn, r, c, 1, -1); // Diagonal descending left.
    }
  }

  console.log(horizontalWin || verticalWin || diagRightWin || diagLeftWin);
}

function checkRow(turn, row, column, verticalStep, horizontalStep) {
  for (let i = 0 ; i <= 5 ; i++) {
      let r = row + i * verticalStep;
      let c = column + i * horizontalStep;

      if (r < 0 || c < 0 || r >= grid.length || c > grid[r].length || grid[r][c] !== turn) {
          return false;
      }
  }

  return true;
}