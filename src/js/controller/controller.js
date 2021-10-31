import KillerAI from "../player/ai/killerAI.js";
import MinimaxAI from "../player/ai/minimaxAI.js";

export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.ai = new KillerAI(2);

        //this.model.changePlayerEvent.addListener(player => this.aiTurn(player));
        //his.ai.chooseMoveEvent.addListener(state => this.makeMove(index));
        this.view.setCellClickHandler((index) => this.makeMove(index));
    }

    aiTurn(player) {
        if (this.ai.playerNumber === player) {
            this.ai.chooseMove(this.model.copyState());
        }
    }

    makeMove(index) {
        if (this.model.isCellEmpty(0, 0)) {
            let color = this.model.player === 1 ? "black" : "white";

            this.view.addPiece(index, color);
            //this.model.performMove([row, column], this.model.player);

            //if (this.model.isOver()) {
            //    this.view.endGame(color);
            //    return;
            //}

            this.model.changePlayer();
        }
    }
}