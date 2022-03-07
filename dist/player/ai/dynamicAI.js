import AbstractAI from "./ai.js";
import DynamicNode from "./tree/dynamicNode.js";
export default class DynamicAI extends AbstractAI {
    // private node: AbstractNode;
    // constructor(player: number, node: AbstractNode) {
    //     super(player);
    //     this.node = node;
    // }
    chooseMove(game) {
        const iterations = 22000;
        const root = new DynamicNode();
        root.state.mdp = game;
        root.state.playerNumber = this._player;
        root.expand();
        for (let i = 0; i <= iterations; i++) {
            let current = this.select(root); // Selection.
            let result;
            if (current.state.mdp.isTerminal()) {
                current.state.isTerminal = true;
                result = [current.state.mdp.getUtilityScore(), current.state.mdp.moveNumber];
            }
            else {
                if (current.state.visits > 0) {
                    current = current.expand(); // Expansion.
                }
                result = current.rollout(); // Simulation.
            }
            this.backpropogate(current, result); // Backpropogation.
        }
        console.log(root);
        console.log(root.getBestChild());
        return root.getBestChild().state.mdp.lastMove;
    }
    select(node) {
        while (!node.isLeaf()) { // && !node.state.game.isOver()
            node = node.select(this._player); // UCT.
        }
        return node;
    }
    backpropogate(node, result) {
        let utility = -1;
        if (result[0] === this._player) {
            utility = 1;
        }
        else if (result[0] === -1) {
            utility = 0;
        }
        while (node !== null) {
            node.updateStats(utility, result[1]);
            node = node.parent;
        }
    }
}
