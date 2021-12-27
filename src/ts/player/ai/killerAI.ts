import GameModel from "../../model/gameModel.js";
import AI from "./ai.js";
import Node from "./tree/node.js";

export default class KillerAI extends AI {
    public chooseMove(game: GameModel, interval: number = 1) {
        const root: Node = new Node(game, this.player, null);
        let counter: number = 0;
        
        root.expand();

        while (counter < interval) {
            let current = this.select(root); // Selection.
            let result;

            //console.log(game);

            if (current.isTerminal()) {
                result = current.getUtility();
            }
            else {
                if (current.visits > 0) {
                    current = current.expand(); // Expansion.
                }

                result = current.rollout(); // Simulation.
            }

            this.backpropogate(current, result); // Backpropogation.

            counter++;
        }

        const winnerNode = root.getMostVisitedChild();

        //console.log(root);
        //console.log(winnerNode);

        this.executeMove(winnerNode.game.lastMove);
    }

    private select(node: Node) {
        while (!node.isLeaf()) { // && !node.state.game.isOver()
            node = node.select(this.player); // UCT.
        }

        return node;
    }

    private backpropogate(node: Node, result: number) {
        let utility = -1;

        if (result === this.player) {
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