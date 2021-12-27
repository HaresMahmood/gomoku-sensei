import AI from "./ai.js";
import Node from "./tree/node.js";
export default class KillerAI extends AI {
    chooseMove(game, interval = 1000) {
        const root = new Node(game, this.player, null);
        let counter = 0;
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
        console.log(root);
        console.log(winnerNode);
        this.executeMove(winnerNode.game.lastMove);
    }
    select(node) {
        while (!node.isLeaf()) { // && !node.state.game.isOver()
            node = node.select(this.player); // UCT.
        }
        return node;
    }
    backpropogate(node, result) {
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
