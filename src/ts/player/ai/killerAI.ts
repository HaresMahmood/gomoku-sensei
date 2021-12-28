import Game from "../../model/game.js";
import AI from "./ai.js";
import Node from "./tree/node.js";

export default class KillerAI extends AI {
    public chooseMove(game: Game, interval: number = 3000) {
        const root: Node = new Node();
        const startTime = Date.now();
        let counter: number = 0;
        
        root.state.game = game;
        root.state.playerNumber = this.player;
        root.expand();

        while((Date.now() - startTime) < interval) {
            let current = this.select(root); // Selection.
            let result;

            if (current.state.game.isOver(current.state.playerNumber)) {
                result = current.state.game.getWinner(current.state.playerNumber);
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

        console.log(counter);
        console.log(root);
        console.log(winnerNode);

        this.executeMove(winnerNode.state.game.lastMove);
    }

    private select(node: Node) {
        while (!node.isLeaf()) { // && !node.state.game.isOver()
            node = node.select(this.player); // UCT.
        }

        return node;
    }

    private backpropogate(node: Node, result) {
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