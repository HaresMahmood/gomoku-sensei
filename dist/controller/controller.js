var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import KillerAI from "../player/ai/killerAI";
export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.currentPlayer = 1;
        this.ai = new KillerAI(2);
        //this.model.changePlayerEvent.addListener(player => this.aiTurn(player));
        this.ai.chooseMoveEvent.addListener(index => this.performMove(index));
        this.view.setDocumentReadyHandler();
        this.view.setWindowResizeHandler();
        this.view.setNavigationOpenHandler();
        this.view.setNavigationCloseHandler();
        this.view.setCellClickHandler(index => this.performMove(index));
        //this.aiTurn(this.currentPlayer);
    }
    performMove(index) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.model.isCellEmpty(index)) {
                const nextPlayer = this.addPiece(index);
                const that = this;
                window.setTimeout(function () {
                    that.aiTurn(nextPlayer);
                }, 150);
            }
        });
    }
    addPiece(index) {
        let color = this.currentPlayer === 1 ? "black" : "white";
        this.view.addPiece(index, color);
        this.model.performMove(index, this.currentPlayer);
        if (this.model.isOver()) {
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
        if (this.ai.playerNumber === player) {
            this.ai.chooseMove(this.model.clone());
        }
    }
}
