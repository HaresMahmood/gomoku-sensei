import AbstractNode from "./node.js";
export default class DynamicNode extends AbstractNode {
    // #region Miscellaneous
    // Inherited docs.
    expand() {
        const moves = this.state.getTransitions();
        for (const move of moves) {
            this.children.push(new DynamicNode(move, this));
        }
        return this.children[0];
    }
    // Inherited docs.
    uctScore(parent, isAIPlayer) {
        let uctValue = super.uctScore(parent, isAIPlayer);
        const prolongation = (this._state.gameLength / this._state.visits) || 0;
        const termination = this._state.isTerminal ? Infinity : 0;
        uctValue = isAIPlayer ? uctValue + termination + prolongation
            : uctValue;
        return uctValue;
    }
    // Inherited docs.
    // TODO: make more efficient (no double `isTerminal`-check).
    simulate() {
        const clone = this.state.clone();
        if (clone.mdp.isTerminal()) {
            const result = clone.mdp.getUtilityScore();
            const gameLength = clone.mdp.moveNumber;
            return [result, gameLength];
        }
        while (true) {
            clone.makeRandomTransition();
            if (clone.mdp.isTerminal()) {
                const result = clone.mdp.getUtilityScore();
                const gameLength = clone.mdp.moveNumber;
                return [result, gameLength];
            }
            clone.togglePlayer();
        }
    }
    // #endregion
    // #region Utlity
    /**
     *
     * @param utility
     * @param gameLength
     */
    updateStats(utility, gameLength) {
        this._state.visits++;
        this._state.wins += utility;
        this._state.gameLength += gameLength;
    }
    // Inherited docs.
    getBestChild() {
        let child = this._children.reduce((x, y) => {
            return ((x.state.wins / x.state.visits || 0) + (x.state.gameLength / x.state.visits || 0))
                > ((y.state.wins / y.state.visits || 0) + (y.state.gameLength / y.state.visits || 0))
                ? x : y;
        });
        return child;
    }
}
