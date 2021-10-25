import Game from "./game.js";

let game = new Game();
let turn = "black";

$(".box").click(function () {
  if ($(this).find(".piece").length === 0) {
    var piece = `<div class="piece ${turn}-piece"></div>`;

    $(this).append(piece);

    let row = $(this).parent().index();
    let column = $(this).index();

    game.setCoordinates(row, column);

    if (game.isOver(row, column)) {
      window.alert(`Player ${game.getWinner()} won!`);
    }

    turn = turn == "black" ? "white" : "black";
  }
});