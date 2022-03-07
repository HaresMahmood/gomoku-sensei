import Game from "../model/game.js";
import GameView from "../view/gameView.js";
import Controller from "../controller/gameController.js";
import AIFactory from "../factory/aiFactory.js";


$(document).ready(function() {
    const game = new Game();
    const view = new GameView(game.rows, game.columns);

    const factory = new AIFactory();
    const player1 = factory.createItem(localStorage.getItem("player1"), 1);
    const player2 = factory.createItem(localStorage.getItem("player2"), 2);

    const controller = new Controller(game, view, player1, player2);
});