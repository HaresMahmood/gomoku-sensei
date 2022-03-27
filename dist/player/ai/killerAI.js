// #region Imports
import AbstractAI from "./ai.js";
import StaticNode from "./tree/staticNode.js";
// #endregion
/**
 * Concrete representation of a Monte Carlo Tree Search (MCTS)
 * based AI agent. Delegates the specific implementation of
 * MCTS methods to concrete implementations of {@link AbstractNode}.
 * This class utilizes the {@link StaticNode} concretion.
 *
 * The basic MCTS algorithm consists of 4 phases:
 * * Selection.
 * * Expansion.
 * * Simulation.
 * * Backpropogation.
 *
 * This process is repeated until a maximum number of iterations is
 * reached.
 *
 * @see {@link https://en.wikipedia.org/wiki/Monte_Carlo_tree_search} for more information on the algorithm used.
 */
export default class KillerAI extends AbstractAI {
    // #region Initialization
    constructor(player, iterations = 22500) {
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
        const root = new StaticNode(); // Root node (_R_).
        let counter = 0;
        // Set `state` information of root node.
        root.state.mdp = mdp;
        root.state.player = this._player;
        root.expand(); // Add children to root, so as to not waste a training cycle.
        while (counter != this._iterations) {
            let current = this.select(root); // Selection.
            let result;
            if (current.state.mdp.isTerminal()) {
                // Since the node is terminal, it cannot 
                // be expanded. he expansion- and 
                // simulation-phases are therefore skipped.
                result = current.state.mdp.getUtilityScore();
            }
            else {
                if (current.state.visits > 0) {
                    // Only expand if the node has not been visisted before.
                    current = current.expand(); // Expansion.
                }
                // Otherwise, simulate.
                result = current.simulate(); // Simulation.
            }
            this.backpropagate(current, result); // Backpropogation.
            counter++;
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
     * @see {@link AbstractNode.select} for the selection policy.
     */
    select(node) {
        while (!node.isLeaf()) {
            node = node.select(this._player); // UCT.
        }
        return node;
    }
    /**
     * Recursively backpropagates the utility score
     * until the root node is reached.
     *
     * @param node from which the simulation was completed.
     * @param result result of the rollout, the utility value.
     */
    backpropagate(node, result) {
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
