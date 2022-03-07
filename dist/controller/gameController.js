import AI from "../player/ai/ai.js";
export default class GameController {
    // #region Initialization
    model;
    view;
    // Gomoku is a 2-player game.
    player = 1 | 2;
    playerOne;
    playerTwo;
    constructor(model, view, player1, player2) {
        this.model = model;
        this.view = view;
        this.player = 1;
        this.playerOne = player1;
        this.playerTwo = player2;
        this.view.setCellClickHandler((index) => this.performMove(index));
        this.view.restartEvent.addListener(() => this.restart());
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
     * @param index Cell of the performed move.
     * @returns Player's who's turn it is next.
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
     * @param player Player who's turn it currently is.
     */
    nextPlayer(player) {
        const currentPlayer = this.playerOne.player === player ? this.playerOne : this.playerTwo;
        this.performMove(currentPlayer.chooseMove(this.model.clone()));
    }
    /**
 * Adds a piece to the board at the provided index.
 *
 * @param index Cell of the performed move.
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
