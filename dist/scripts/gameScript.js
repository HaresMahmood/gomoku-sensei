import Game from "../model/game.js";
import GameView from "../view/gameView.js";
import GameController from "../controller/gameController.js";
import KillerAI from "../player/ai/killerAI.js";
$(document).ready(function () {
    const game = new Game();
    const view = new GameView(game.rows, game.columns);
    const controller = new GameController(game, view, new KillerAI(2));
});
