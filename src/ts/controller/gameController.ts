import Game from "../model/game.js";
import GameView from "../view/gameView.js";
import AI from "../player/ai/ai.js";
import RandomAI from "../player/ai/randomAI.js";
import KillerAI from "../player/ai/killerAI.js";

export default class GameController {
    private model: Game;
    private view: GameView;
    
    private player: number = 1 | 2;
    private ai: AI;

    constructor(model: Game, view: GameView, ai: AI) {
        this.model = model;
        this.view = view;

        this.player = 1;

        this.ai = ai;

        //this.model.changePlayerEvent.addListener(player => this.aiTurn(player));
        this.ai.chooseMouseEvent.addListener((index: number) => this.performMove(index));

        // this.view.setDocumentReadyHandler();
        // this.view.setWindowResizeHandler();
        // this.view.setNavigationOpenHandler();
        // this.view.setNavigationCloseHandler();

        this.view.setCellClickHandler((index: number) => this.performMove(index));

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

    addPiece(index: number) {
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