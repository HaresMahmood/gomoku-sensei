import AbstractNode from "./node.js";

export default class StaticNode extends AbstractNode {
    // #region Miscellaneous

    // Inherited docs.
    public expand() {
        const moves = this.state.getMoves();

        for (const move of moves) {
            this.children.push(new StaticNode(move, this));
        }

        return this.children[0];
    }

    // Inherited docs.
    public rollout() {
        const clone = this.state.clone();

        if (clone.mdp.isTerminal()) {
            const result = clone.mdp.getUtilityScore();
    
            return result;
        }

        while (true) {
            clone.makeRandomMove();

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