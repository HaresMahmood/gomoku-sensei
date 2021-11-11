import KillerAI from "../player/ai/killerAI.js";
import SimulationAI from "../player/ai/simulationAI.js";

export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.currentPlayer = 1;

        this.ai = new SimulationAI(2);

        //this.model.changePlayerEvent.addListener(player => this.aiTurn(player));
        this.ai.chooseMoveEvent.addListener(index => this.makeMove(index));
        this.view.setCellClickHandler((index) => this.makeMove(index));

        //this.aiTurn(this.currentPlayer);
    }

    makeMove(index) {
        if (this.model.isCellEmpty(index)) {
            let color = this.currentPlayer === 1 ? "black" : "white";

            this.view.addPiece(index, color);
            this.model.performMove(index, this.currentPlayer);

            if (this.model.isOver()) {
                this.view.endGame(color, this.model.isDraw());
                return;
            }

            this.changePlayer();
        }
    }

    changePlayer() {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        this.aiTurn(this.currentPlayer);
    }

    aiTurn(player) {
        if (this.ai.playerNumber === player) {
            this.ai.chooseMove(this.model.clone());
        }
    }
}