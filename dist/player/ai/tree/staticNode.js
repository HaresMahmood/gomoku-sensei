import AbstractNode from "./node.js";
/**
 * Concrete implementation of a generic node in a game tree.
 */
export default class StaticNode extends AbstractNode {
    // #region Miscellaneous
    // Inherited docs.
    expand() {
        const moves = this.state.getTransitions();
        for (const move of moves) {
            this.children.push(new StaticNode(move, this));
        }
        return this.children[0];
    }
    // Inherited docs.
    simulate() {
        const clone = this.state.clone();
        if (clone.mdp.isTerminal()) {
            const result = clone.mdp.getUtilityScore();
            return result;
        }
        while (true) {
            clone.makeRandomTransition();
            if (clone.mdp.isTerminal()) {
                const result = clone.mdp.getUtilityScore();
                return result;
            }
            clone.togglePlayer();
        }
    }
    // #endregion
    // #region Utility
    /**
     * Part of the backpropagation-phase of MCTS.
     * Updates internal {@link State}-values.
     *
     * @param utility Result or winner of the simulation-phase.
     */
    updateStats(utility) {
        this._state.visits++;
        this._state.wins += utility;
    }
}
