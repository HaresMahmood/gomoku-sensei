// #region Imports
import AbstractAI from "./ai.js";
import DynamicNode from "./tree/dynamicNode.js";
// #endregion
/**
 * Adapted Monte Carlo Tree Search (MCTS) implementation with
 * _prolongation bias_. Represents a dynamic AI agent.
 * This class utilizes the {@link DynamicNode} concretion for
 * specific adapted MCTS-methods.
 *
 * @see {@link KillerAI} for a vanilla MCTS implementation.
 */
export default class DynamicAI extends AbstractAI {
    // #region Initialization
    constructor(player, iterations = 22000) {
        super(player, iterations);
    }
    // #endregion
    // #region Miscellaneous
    /**
     * Chooses the move determined by the MCTS algorithm.
     *
     * @param mdp MDP-representation of the game being played.
     * @returns Coordinates of a chosen board position.
     */
    chooseMove(mdp) {
        const root = new DynamicNode();
        root.state.mdp = mdp;
        root.state.player = this._player;
        root.expand();
        for (let i = 0; i <= this._iterations; i++) {
            let current = this.select(root); // Selection.
            let result;
            if (current.state.mdp.isTerminal()) {
                // Since the node is terminal, it cannot 
                // be expanded. he expansion- and 
                // simulation-phases are therefore skipped.
                // Additionally, flip the node's terminality-property.
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
     * Recursively selects nodes until a leaf node
     * is reached. Selection is based on the chosen
     * policy, in this case UCT.
     *
     * @param node Node from which to start selection-process.
     * @returns Node with selected by the policy.
     * @see {@link DynamicNode.select} for the _prolongation bias_ selection policy.
     */
    select(node) {
        while (!node.isLeaf()) { // && !node.state.game.isOver()
            node = node.select(this._player); // UCT.
        }
        return node;
    }
    /**
     * Recursively backpropagates the utility and game
     * length score until the root node is reached.
     *
     * @param node from which the simulation was completed.
     * @param result tuple of the result (utility value) and game length of the rollout.
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
