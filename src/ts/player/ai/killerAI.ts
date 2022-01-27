import Game from "../../model/game.js";
import AbstractAI from "./ai.js";
import AbstractNode from "./tree/node.js";
import StaticNode from "./tree/staticNode.js";

export default class KillerAI extends AbstractAI {
    private node: AbstractNode;

    constructor(player: number, node: AbstractNode) {
        super(player);

        this.node = node;
    }

    public chooseMove(game: Game): number {
        const interval: number = 20000;
        // const startTime = Date.now();
        const root = new StaticNode();
        let counter: number = 0;

        root.state.game = game;
        root.state.playerNumber = this._player;
        root.expand();

        while(counter != interval) {
            let current = this.select(root); // Selection.
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

        const winnerNode = root.getMostVisitedChild();

        // console.log(counter);
        console.log(root);

        return winnerNode.state.game.lastMove;
    }

    private select(node: StaticNode) {
        while (!node.isLeaf()) { // && !node.state.game.isOver()
            node = node.select(this._player); // UCT.
        }

        return node;
    }

    private backpropogate(node: StaticNode, result) {
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