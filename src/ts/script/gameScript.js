// #region Imports 

import Gomoku from "../model/gomoku.js";
import GameView from "../view/gameView.js";
import Controller from "../controller/gameController.js";
import DefaultPlayerFactory from "../factory/playerFactory.js";

// #endregion


$(document).ready(function() {
    const game = new Gomoku();
    const view = new GameView(game.rows, game.columns);

    const factory = new DefaultPlayerFactory();
    const playerOne = factory.createPlayer(localStorage.getItem("player1"), 1);
    const playerTwo = factory.createPlayer(localStorage.getItem("player2"), 2);

    const controller = new Controller(game, view, playerOne, playerTwo);
});