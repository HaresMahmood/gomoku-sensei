import Game from "./game.js";
import RandomAI from "./ai/randomAI.js";
//import KillerAI from "./ai/killerAI.js";

let game = new Game();
let ai = new RandomAI(2);
let turn = "black";

$(".box").click(function () {
  if ($(this).find(".piece").length === 0) {
    var piece = `<div class="piece ${turn}-piece"></div>`;

    $(this).append(piece);

    let row = $(this).parent().index();
    let column = $(this).index();

    makeMove(row, column);

    let aiMove = ai.chooseMove(game);

    console.log(aiMove);

    findBox(aiMove.getLastMove()[0], aiMove.getLastMove()[1], turn);
    makeMove(aiMove.getLastMove()[0], aiMove.getLastMove()[1]);

    //var mcts = new KillerAI();
    //console.log(mcts.monteCarloValue(game));
  }
});

function makeMove(row, column) {
  game.setCoordinates(row, column);

  if (game.isOver(row, column)) {
    window.alert(`${turn} wins!`);
    location.reload();
  }
  else {
    game.changePlayer();
    turn = turn == "black" ? "white" : "black";
  }
}

function findBox(row, column, turn) {
  var piece = `<div class="piece ${turn}-piece"></div>`;

  $(".row").eq(row).children(".box").eq(column).append(piece);
} 