import Game from "../model/game.js";
import GameView from "../view/gameView.js";
import AI from "../player/ai/ai.js";
import Player from "../player/player.js";

export default class GameController {
    private model: Game;
    private view: GameView;
    
    private player: number = 1 | 2;
    private ai: AI;

    private moveNumber: number = 1;

    constructor(model: Game, view: GameView, player: Player) {
        this.model = model;
        this.view = view;

        this.player = 1;

        this.ai = player as AI;

        //this.model.changePlayerEvent.addListener(player => this.aiTurn(player));
        this.ai.chooseMouseEvent.addListener((index: number) => this.performMove(index));
        this.view.setCellClickHandler((index: number) => this.performMove(index));

        this.view.setPlayer(this.ai, 2);

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

        this.view.addPiece(index, color, this.moveNumber);
        this.model.performMove(index, this.player);

        if (this.model.isOver()) {
            this.view.endGame(color, this.model.isDraw());
            //return;
        }

        this.view.toggleProgressBar();

        const nextPlayer = this.player === 1 ? 2 : 1;

        this.view.changePlayer(nextPlayer);
        this.player = nextPlayer;

        this.moveNumber++;

        return nextPlayer;
    }

    aiTurn(player) {
        if (this.ai.player === player) {
            this.ai.chooseMove(this.model.clone());
        }
    }
}