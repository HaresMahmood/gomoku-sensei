import GameModel from "./model/gameModel.js";
import View from "./view/view.js";
import Controller from "./controller/controller.js";

$(document).ready(function() { 
    const game = new GameModel();
    const view = new View(game.rows, game.columns);
    const controller = new Controller(game, view);
});