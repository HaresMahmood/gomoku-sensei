import Game from "./model/game.js";
import View from "./view/view.js";
import Controller from "./controller/controller.js";

$(document).ready(function() { 
    const game = new Game();
    const view = new View(game.getRows(), game.getColumns());
    const controller = new Controller(game, view);
});