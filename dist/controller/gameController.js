export default class GameController {
    model;
    view;
    player = 1 | 2;
    ai;
    constructor(model, view, player) {
        this.model = model;
        this.view = view;
        this.player = 1;
        this.ai = player;
        //this.model.changePlayerEvent.addListener(player => this.aiTurn(player));
        this.ai.chooseMouseEvent.addListener((index) => this.performMove(index));
        // this.view.setDocumentReadyHandler();
        // this.view.setWindowResizeHandler();
        // this.view.setNavigationOpenHandler();
        // this.view.setNavigationCloseHandler();
        this.view.setCellClickHandler((index) => this.performMove(index));
        //this.aiTurn(this.currentPlayer);
    }
    async performMove(index) {
        if (this.model.isCellEmpty(index)) {
            const nextPlayer = this.addPiece(index);
            const that = this;
            window.setTimeout(function () {
                that.aiTurn(nextPlayer);
            }, 150);
        }
    }
    addPiece(index) {
        let color = this.player === 1 ? "black" : "white";
        this.view.addPiece(index, color);
        this.model.performMove(index, this.player);
        if (this.model.isOver()) {
            this.view.endGame(color, this.model.isDraw());
            //return;
        }
        this.view.toggleProgressBar();
        const nextPlayer = this.player === 1 ? 2 : 1;
        this.view.changePlayer(this.player, nextPlayer);
        this.player = nextPlayer;
        return nextPlayer;
    }
    aiTurn(player) {
        if (this.ai.player === player) {
            this.ai.chooseMove(this.model.clone());
        }
    }
}
