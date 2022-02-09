import Game from "../../model/game.js";
import AbstractAI from "./ai.js";
import AbstractNode from "./tree/node.js";
import DynamicNode from "./tree/dynamicNode.js";

export default class DynamicAI extends AbstractAI {
    // private node: AbstractNode;

    // constructor(player: number, node: AbstractNode) {
    //     super(player);

    //     this.node = node;
    // }

    public chooseMove(game: Game): number {
        const iterations: number = 2;
        // const startTime = Date.now();
        const root = new DynamicNode();
        let counter: number = 0;

        root.state.game = game;
        root.state.playerNumber = this._player;
        root.expand();

        while (counter != iterations) {
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

        console.log(root.sortByDepth());
        console.log(root, root.getWinRate());

        const winnerNode = root.getMostVisitedChild();

        return winnerNode.state.game.lastMove;
    }

    private select(node: DynamicNode) {
        while (!node.isLeaf()) { // && !node.state.game.isOver()
            node = node.select(this._player); // UCT.
        }

        return node;
    }

    private backpropogate(node: DynamicNode, result) {
        let utility = -1;

        if (result === this._player) {
            utility = 1;
        }
        else if (result === -1) {
            utility = 0;
        }

        // console.log(node.depth);

        while (node !== null) {
            node.updateStats(utility);
            node = node.parent;
        }
    }
}