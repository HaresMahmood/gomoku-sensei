import AI from "../player/ai/ai.js";
export default class GameController {
    // #region Initialization
    model;
    view;
    // Gomoku is a 2-player game.
    player = 1 | 2;
    playerOne;
    playerTwo;
    /**
     * Class constructor.
     *
     * @param model The game's Model.
     * @param view The game's View.
     * @param playerOne Concretion of the first player.
     * @param playerTwo Concretion of the second player.
     */
    constructor(model, view, playerOne, playerTwo) {
        this.model = model;
        this.view = view;
        this.player = 1;
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.view.setCellClickHandler((index) => this.performMove(index));
        // this.view.restartEvent.addListener(() => this.restart());
        this.view.setRestartClickHandler(() => this.restart());
        this.view.setPlayer(this.playerOne);
        this.view.setPlayer(this.playerTwo);
        this.view.restart(this.playerOne instanceof AI);
        const that = this;
        window.setTimeout(function () {
            that.nextPlayer(that.player);
        }, 10); // Set timeout to update UI.
    }
    // #endregion
    // #region Miscellaneous
    /**
     * Adds a piece to the board.
     *
     * @param index Coordinates of the performed move.
     * @returns Player next in line to move.
     */
    addPiece(index) {
        let color = this.player === 1 ? "black" : "white";
        const nextPlayer = this.player === 1 ? 2 : 1;
        this.view.addPiece(index, color, this.model.moveNumber);
        this.model.makeTransition(index, this.player);
        if (this.model.isTerminal()) {
            this.view.endGame(this.player === 1 ? this.playerOne : this.playerTwo, this.model.isDraw());
            return;
        }
        this.view.changePlayer(nextPlayer);
        this.view.disableUserInterface((nextPlayer === 1 ? this.playerOne : this.playerTwo) instanceof AI);
        this.player = nextPlayer;
        return nextPlayer;
    }
    /**
     * Clears all pieces from the board.
     */
    restart() {
        this.player = 1;
        this.view.changePlayer(this.player);
        this.model.restart();
        this.view.restart(this.playerOne instanceof AI);
        const that = this;
        window.setTimeout(function () {
            that.nextPlayer(that.player);
        }, 150);
    }
    /**
     * Prompts the next player to make a move.
     *
     * @param player Player next in line to move.
     */
    nextPlayer(player) {
        if (this.playerOne.player === player) {
            this.performMove(this.playerOne.chooseMove(this.model.clone()));
        }
        else if (this.playerTwo.player === player) {
            this.performMove(this.playerTwo.chooseMove(this.model.clone()));
        }
    }
    /**
     * Adds a piece to the board at the provided index.
     *
     * @param index Coordinates of the performed move.
     */
    performMove(index) {
        if (this.model.isCellEmpty(index)) {
            const nextPlayer = this.addPiece(index);
            const that = this;
            window.setTimeout(function () {
                that.nextPlayer(nextPlayer);
            }, 150);
        }
    }
}
