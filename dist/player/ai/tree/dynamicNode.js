import AbstractNode from "./node.js";
/**
 * Concrete implementation of a _dynamic_ node in a game tree.
 * Dynamic nodes implement _prolongation bias_, whereby the
 * total game length is added as a UCT score ({@link uctScore})
 * parameter. This game length value must also be returned during
 * Simulation ({@link simulate}) and updated during Backpropagation
 * ({@link updateStats}).
 *
 * @extends AbstractNode
 */
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
     * Part of the Backpropagation-phase of MCTS.
     * Updates internal {@link State}-properties.
     *
     * @param utility Result or winner of the Simulation-phase.
     * @param gameLength Game length up to the end of the simulation.
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
