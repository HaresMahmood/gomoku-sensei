export default class GameController {
    model;
    view;
    player = 1 | 2;
    player1;
    player2;
    moveNumber = 1;
    constructor(model, view, player1, player2) {
        this.model = model;
        this.view = view;
        this.player = 1;
        this.player1 = player1;
        this.player2 = player2;
        this.view.setCellClickHandler((index) => this.performMove(index));
        this.view.setRestartClickHandler(() => this.restart());
        this.view.setPlayer(this.player1);
        this.view.setPlayer(this.player2);
        const that = this;
        window.setTimeout(function () {
            that.nextPlayer(that.player);
        }, 10); // Set timeout to update UI.
    }
    performMove(index) {
        if (this.model.isCellEmpty(index)) {
            const nextPlayer = this.addPiece(index);
            const that = this;
            window.setTimeout(function () {
                that.nextPlayer(nextPlayer);
            }, 150); // Set timeout to update UI.
        }
    }
    addPiece(index) {
        let color = this.player === 1 ? "black" : "white";
        const nextPlayer = this.player === 1 ? 2 : 1;
        this.view.addPiece(index, color, this.moveNumber);
        this.model.performMove(index, this.player);
        console.log(this.model.getHeuristicEvaluation(this.player));
        if (this.model.isOver()) {
            this.view.endGame(color, this.model.isDraw());
            this.restart();
            return;
        }
        this.view.toggleProgressBar();
        // const nextPlayer = this.player === 1 ? 2 : 1;
        this.view.changePlayer(nextPlayer);
        this.player = nextPlayer;
        this.moveNumber++;
        return nextPlayer;
    }
    restart() {
        this.player = 1;
        this.moveNumber = 1;
        this.view.changePlayer(this.player);
        this.model.restart();
        this.view.restart();
        const that = this;
        window.setTimeout(function () {
            that.nextPlayer(that.player);
        }, 10); // Set timeout to update UI.
    }
    // TODO: Come up with better name.
    nextPlayer(player) {
        if (this.player1.player === player) {
            this.performMove(this.player1.chooseMove(this.model.clone()));
        }
        else if (this.player2.player === player) {
            this.performMove(this.player2.chooseMove(this.model.clone()));
        }
    }
}
