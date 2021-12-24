import Game from "../../model/game";
import AI from "./ai";
import Node from "./tree/node";

export default class KillerAI extends AI {
    public chooseMove(game: Game, interval: number = 3000) {
        const root: Node = new Node();
        const startTime = Date.now();
        let counter: number = 0;
        
        root.state.game = game;
        root.state.playerNumber = this.playerNumber;
        root.expand();

        while((Date.now() - startTime) < interval) {
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

        console.log(counter);
        console.log(root);
        console.log(winnerNode);

        this.executeMove(winnerNode.state.game.lastMove);
    }

    private select(node: Node) {
        while (!node.isLeaf()) { // && !node.state.game.isOver()
            node = node.select(this.playerNumber); // UCT.
        }

        return node;
    }

    private backpropogate(node: Node, result) {
        let utility = -1;

        if (result === this.playerNumber) {
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