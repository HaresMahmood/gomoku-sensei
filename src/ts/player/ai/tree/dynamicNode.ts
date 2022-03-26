import AbstractNode from "./node.js";
import State from "./state.js";

export default class DynamicNode extends AbstractNode {
    // #region Miscellaneous

    // Inherited docs.
    public expand() {
        const moves = this.state.getTransitions();

        for (const move of moves) {
            this.children.push(new DynamicNode(move, this));
        }

        return this.children[0];
    }

    // Inherited docs.
    public uctScore(parent: AbstractNode, isAIPlayer: boolean): number {
        let uctValue = super.uctScore(parent, isAIPlayer);
        const prolongation = (this._state.gameLength / this._state.visits) || 0;
        const termination = this._state.isTerminal ? Infinity : 0;

        uctValue = isAIPlayer ? uctValue + termination + prolongation
                              : uctValue;

        return uctValue;
    }

    // Inherited docs.
    // TODO: make more efficient (no double `isTerminal`-check).
    public simulate(): [number, number] {
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
    public updateStats(utility: number, gameLength: number): void {
        this._state.visits++;
        this._state.wins += utility;
        this._state.gameLength += gameLength;
    }

    // Inherited docs.
    public getBestChild(): AbstractNode {
        let child = this._children.reduce((x, y) => {
            return ((x.state.wins / x.state.visits || 0) + (x.state.gameLength / x.state.visits || 0)) 
                 > ((y.state.wins / y.state.visits || 0)  + (y.state.gameLength / y.state.visits || 0))
                 ? x : y;
        });
    
        return child;
    }

    // #endregion
}