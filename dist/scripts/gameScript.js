import Game from "./model/game.js";
import GameView from "./view/gameView.js";
import Controller from "./controller/controller.js";
import AIFactory from "../factories/aiFactory.js";
var data;
$(window).on("message", function (e) {
    data = JSON.parse(e.originalEvent.data);
});
$(document).on("ready", function () {
    const game = new Game();
    const view = new GameView(game.rows, game.columns);
    const factory = new AIFactory();
    const player1 = factory.createItem(data.player1, 1);
    const player2 = factory.createItem(data.player2, 2);
    console.log(player1, player2);
    const controller = new Controller(game, view, player2);
});
