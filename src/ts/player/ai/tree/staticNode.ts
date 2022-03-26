import AbstractNode from "./node.js";

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
    // TODO: make more efficient (no double `isTerminal`-check).
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
     * 
     * @param utility 
     */
    public updateStats(utility: number): void {
        this._state.visits++;
        this._state.wins += utility;
    }

    // #endregion
}