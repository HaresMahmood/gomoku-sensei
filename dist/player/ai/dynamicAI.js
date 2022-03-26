// #region Imports
import AbstractAI from "./ai.js";
import DynamicNode from "./tree/dynamicNode.js";
// #endregion
/**
 *
 */
export default class DynamicAI extends AbstractAI {
    /**
     * Chooses the move determined by the MCTS algorithm.
     *
     * @param mdp MDP-representation of the game being played.
     * @returns Coordinates of a chosen board position.
     */
    chooseMove(game) {
        const iterations = 22000;
        const root = new DynamicNode();
        root.state.mdp = game;
        root.state.player = this._player;
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
                result = current.simulate(); // Simulation.
            }
            this.backpropagate(current, result); // Backpropogation.
        }
        return root.getBestChild().state.mdp.lastMove;
    }
    /**
     *
     * @param node
     * @returns
     */
    select(node) {
        while (!node.isLeaf()) { // && !node.state.game.isOver()
            node = node.select(this._player); // UCT.
        }
        return node;
    }
    /**
     *
     * @param node
     * @param result
     */
    backpropagate(node, result) {
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
