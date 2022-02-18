import State from "./state.js";
export default class DynamicNode {
    // #region Initialization 
    _state;
    _parent;
    _children;
    constructor(state = new State(), parent = null, children = []) {
        this._state = state;
        this._parent = parent;
        this._children = children;
    }
    // #endregion
    // #region Accessors
    get state() {
        return this._state;
    }
    get parent() {
        return this._parent;
    }
    get children() {
        return this._children;
    }
    // #endregion
    // #region Miscellaneous
    /**
     * Selection-phase of the Monte Carlo Tree Search algorithm.
     * Utilises the UCT (Upper Confidence Bound 1 applied to
     * trees) formula.
     *
     * @param playerNumber the AI's player number - Either 1 or 2.
     * @returns The child with the best UCT-score.
     * @see [Informaion on the UCT-formula](https://en.wikipedia.org/wiki/Monte_Carlo_tree_search#Exploration_and_exploitation)
     */
    select(playerNumber) {
        let selected = this._children[0];
        const isAIPlayer = selected._state.playerNumber !== playerNumber;
        let bestValue = isAIPlayer ? -Infinity : Infinity;
        for (const child of this._children) {
            const exploitation = (child._state.wins / child._state.visits) || 0; // Change `NaN` to 0 (0 wins / 0 visits).
            let exploration = Math.sqrt(2) * Math.sqrt(Math.log(this._state.visits) / child._state.visits);
            exploration = isNaN(exploration) ? Infinity : exploration; // Change `NaN` to `Infinity` (log(0 parent visits)).
            const fairness = (child._state.gameLength / child._state.visits) || 0;
            const uctValue = (isAIPlayer ? exploitation + exploration
                : exploitation - exploration)
                + fairness;
            // console.log(isAIPlayer, exploitation, exploration, fairness, uctValue);
            // console.log("");
            if ((isAIPlayer && uctValue > bestValue)
                || (!isAIPlayer && uctValue < bestValue)) {
                selected = child;
                bestValue = uctValue;
            }
        }
        return selected;
    }
    expand() {
        const moves = this.state.getMoves();
        for (const move of moves) {
            this.children.push(new DynamicNode(move, this));
        }
        return this.children[0];
    }
    rollout() {
        const clone = this.state.clone();
        while (true) {
            if (clone.game.isOver()) {
                const result = clone.game.getWinner();
                const gameLength = clone.game.moveNumber;
                return [result, gameLength];
            }
            clone.togglePlayer();
            clone.makeRandomMove();
        }
    }
    // #endregion
    // #region Utlity
    updateStats(utility, gameLength) {
        this._state.visits++;
        this._state.wins += utility;
        this._state.gameLength += gameLength;
    }
    isLeaf() {
        return this._children.length === 0;
    }
    sortChildren() {
        const copy = this._children.slice();
        const mostVisisted = copy.sort((x, y) => (y._state.wins / y._state.visits || 0) - (x._state.wins / x._state.visits || 0));
        return mostVisisted;
    }
    getWinRate() {
        let wins = 0;
        for (const child of this._children) {
            wins += child._state.wins > 0 ? 1 : 0;
        }
        return wins / this._children.length * 100;
    }
    getMostVisitedChild() {
        let child = this._children.reduce((x, y) => {
            return (x._state.visits || 0)
                > (y._state.visits || 0)
                ? x : y;
        });
        return child;
    }
}
