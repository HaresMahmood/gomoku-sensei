import AI from "./ai.js";
import Node from "./tree/node.js";
export default class KillerAI extends AI {
    chooseMove(game, interval = 3000) {
        const root = new Node(null, this.playerNumber, null);
        const startTime = Date.now();
        let counter = 0;
        root.expand(game);
        while ((Date.now() - startTime) < interval) {
            let current = this.select(root); // Selection.
            let result;
            if (game.isOver(this.playerNumber)) {
                result = game.getWinner(this.playerNumber);
            }
            else {
                if (current.visits > 0) {
                    current = current.expand(game); // Expansion.
                }
                result = current.rollout(game); // Simulation.
            }
            this.backpropogate(current, result); // Backpropogation.
            counter++;
        }
        const winnerNode = root.getMostVisitedChild();
        console.log(counter);
        console.log(root);
        console.log(winnerNode);
        this.executeMove(winnerNode.move.index);
    }
    select(node) {
        while (!node.isLeaf()) { // && !node.state.game.isOver()
            node = node.select(this.playerNumber); // UCT.
        }
        return node;
    }
    backpropogate(node, result) {
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
