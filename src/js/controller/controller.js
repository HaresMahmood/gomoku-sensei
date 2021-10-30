import KillerAI from "../player/ai/killerAI.js";
import MinimaxAI from "../player/ai/minimaxAI.js";

export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.ai = new KillerAI(2);

        this.model.changePlayerEvent.addListener(player => this.aiTurn(player));
        this.ai.chooseMoveEvent.addListener(state => this.makeMove(state.getLastMove()[0], state.getLastMove()[1]));
        this.view.setCellClickHandler((row, column) => this.makeMove(row, column));
    }

    aiTurn(player) {
        if (this.ai.player === player) {
            this.ai.chooseMove(this.model.copyState());
        }
    }

    makeMove(row, column) {
        if (this.model.isCellEmpty(row, column)) {
            let color = this.model.getCurrentPlayer() === 1 ? "black" : "white";

            this.view.addPiece(row, column, color);
            this.model.performMove([row, column]);

            if (this.model.isOver()) {
                this.view.endGame(color);
                return;
            }

            this.model.changePlayer();
        }
    }
}