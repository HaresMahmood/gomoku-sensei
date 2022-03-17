import Gomoku from "../model/game.js";
import GameView from "../view/gameView.js";
import Controller from "../controller/gameController.js";
import DefaultPlayerFactory from "../factory/playerFactory.js";
$(document).ready(function () {
    const game = new Gomoku();
    const view = new GameView(game.rows, game.columns);
    const factory = new DefaultPlayerFactory();
    const player1 = factory.createPlayer(localStorage.getItem("player1"), 1);
    const player2 = factory.createPlayer(localStorage.getItem("player2"), 2);
    const controller = new Controller(game, view, player1, player2);
});
