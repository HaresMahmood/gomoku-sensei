import AbstractNode from "./node.js";

/**
 * Concrete implementation of a generic node in a game tree.
 * 
 * @extends AbstractNode
 */
export default class StaticNode extends AbstractNode {
    // #region Miscellaneous

    // Inherited docs.
    public expand() {
        const moves = this.state.getTransitions();

        for (const move of moves) {
            this.children.push(new StaticNode(move, this));
        }

        return this.children[0];
    }

    // Inherited docs.
    public simulate(): number {
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
     * Part of the Backpropagation-phase of MCTS.
     * Updates internal {@link State}-properties.
     * 
     * @param utility Result or winner of the simulation-phase.
     */
    public updateStats(utility: number): void {
        this._state.visits++;
        this._state.wins += utility;
    }

    // #endregion
}