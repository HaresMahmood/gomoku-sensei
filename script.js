var turn = "black";
var grid = Array.from(Array(15), () => new Array(15));

$(".box").click(function () {
  if ($(this).find(".piece").length === 0){ 
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
  let horizontalCounter = checkHorizontal(turn, row, column);
  let verticalCounter = checkVertical(turn, row, column);
  let diagonalCounter = checkDiagonal(turn, row, column);
  
  if (horizontalCounter === 5 || verticalCounter === 5 || diagonalCounter === 5) {
    window.alert(`${turn} wins!`);
  }
}

function checkHorizontal(turn, row, column) {
    // Horizontal check
  let counter = 0;
  
  for (let i = column - 4; i <= column + 5; i++) {
    counter = turn === grid[row][i - 1] ? counter + 1 : counter;
  }
  
  return counter;
}

function checkVertical(turn, row, column) {
    // Horizontal check
  let counter = 0;
  
  for (let i = row - 4; i <= row + 5; i++) {
    if (grid[i - 1] !== undefined) {
      counter = turn === grid[i - 1][column] ? counter + 1 : counter;
    }
  }
  
  return counter;
}

function checkDiagonal(turn, row, column) {
  let counter = 0;
  
  console.log(`${row}, ${column}`);
  
  for (let i = -5; i < 5; i++) {
    if (grid[row + i] !== undefined && [row + i, column - i] != [row, column]) {
      counter = turn === grid[row + i][column - i] ? counter + 1 : counter;
    }
  }
  
  if (counter !== 4) {
    counter = 0;
    
    for (let i = 5; i > -5; i--) {
      if (grid[row + i] !== undefined && [row + i, column - i] != [row, column]) {
        counter = turn === grid[row + i][column - i] ? counter + 1 : counter;
      }
    }
  }
  
  //console.log(`${row + i}, ${column - i}`);
  console.log(counter);
  
  return counter;
}