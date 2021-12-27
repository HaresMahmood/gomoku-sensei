import GameModel from "../model/gameModel.js";
import KillerAI from "../player/ai/killerAI.js";
import SimulationAI from "../player/ai/simulationAI.js";

export default class Controller {
    private model: GameModel;
    private view;
    
    private currentPlayer;

    private ai;

    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.currentPlayer = 1;

        this.ai = new SimulationAI(2);

        //this.model.changePlayerEvent.addListener(player => this.aiTurn(player));
        this.ai.chooseMoveEvent.addListener(index => this.performMove(index));

        this.view.setDocumentReadyHandler();
        this.view.setWindowResizeHandler();
        this.view.setNavigationOpenHandler();
        this.view.setNavigationCloseHandler();

        this.view.setCellClickHandler(index => this.performMove(index));

        //this.aiTurn(this.currentPlayer);
    }

    async performMove(index) {
        if (this.model.isCellEmpty(index)) {
            const nextPlayer = this.addPiece(index);
            const that = this;

            window.setTimeout(function() {
                that.aiTurn(nextPlayer);
            }, 150);
        }
    }

    addPiece(index) {
        let color = this.currentPlayer === 1 ? "black" : "white";

        this.view.addPiece(index, color);
        this.model.performMove(index, this.currentPlayer);

        if (this.model.isOver(this.currentPlayer)) {
            this.view.endGame(color, this.model.isDraw());
            //return;
        }

        this.view.toggleProgressBar();

        const nextPlayer = this.currentPlayer === 1 ? 2 : 1;

        this.view.changePlayer(this.currentPlayer, nextPlayer);
        this.currentPlayer = nextPlayer;

        return nextPlayer;
    }

    aiTurn(player) {
        if (this.ai.player === player) {
            this.ai.chooseMove(this.model.clone());
        }
    }
}