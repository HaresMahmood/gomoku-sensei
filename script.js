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
  let horizontalWin = 0;
  let verticalWin = 0;
  let diagRightWin = 0;
  //let diagLeftWin = false;

  for (let r = (row - 4); r <= (row + 4); r++) {
    for (let c = (column - 4); c <= (column + 4); c++) {
      horizontalWin += checkRow(turn, row, c); // Horizontal.
      verticalWin += checkRow(turn, r, column); // Vertical.
      diagRightWin = checkRow(turn, r, c); // Diagonal descending right.
      //diagLeftWin = checkRow(turn, r, c, 1, -1); // Diagonal descending left.

      console.log(r, c);
    }
  }

  //console.log(diagRightWin);
}

function checkRow(turn, row, column) {
  if (row < 0 || column < 0 || row >= grid.length || column > grid[row].length || grid[row][column] !== turn) {
     return 0;
  }

  return 1;
}