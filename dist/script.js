import Game from "./model/game.js";
import View from "./view/view.js";
import Controller from "./controller/controller.js";
import KillerAI from "./player/ai/killerAI.js";
$(document).ready(function () {
    const game = new Game();
    const view = new View(game.rows, game.columns);
    const controller = new Controller(game, view, new KillerAI(2));
});
