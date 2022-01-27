import AbstractAI from "./ai.js";
export default class KillerAI extends AbstractAI {
    root;
    constructor(player, root) {
        super(player);
        this.root = root;
    }
    chooseMove(game) {
        const interval = 3000;
        const startTime = Date.now();
        let counter = 0;
        this.root.state.game = game;
        this.root.state.playerNumber = this._player;
        this.root.expand();
        while ((Date.now() - startTime) < interval) {
            let current = this.select(this.root); // Selection.
            let result;
            if (current.state.game.isOver()) {
                result = current.state.game.getWinner();
            }
            else {
                if (current.state.visits > 0) {
                    current = current.expand(); // Expansion.
                }
                result = current.rollout(); // Simulation.
            }
            this.backpropogate(current, result); // Backpropogation.
            counter++;
        }
        const winnerNode = this.root.getMostVisitedChild();
        console.log(counter);
        console.log(this.root);
        console.log(this.root);
        return winnerNode.state.game.lastMove;
    }
    select(node) {
        while (!node.isLeaf()) { // && !node.state.game.isOver()
            node = node.select(this._player); // UCT.
        }
        return node;
    }
    backpropogate(node, result) {
        let utility = -1;
        if (result === this._player) {
            utility = 1;
        }
        else if (result === -1) {
            utility = 0;
        }
        while (node !== null) {
            node.updateStats(utility);
            node = node.parent;
        }
    }
}
