import State from "./state.js";
export default class AbstractNode {
    // #region Initialization 
    _state;
    _children;
    _parent;
    constructor(state = new State(), parent = null, children = []) {
        this._state = state;
        this._parent = parent;
        this._children = children;
    }
    // #endregion
    // #region Accessors
    /**
     * State-related properties.
     *
     * @see {@link State} for specific properties.
     */
    get state() {
        return this._state;
    }
    /**
     * Parent of the node, one up the tree.
     */
    get parent() {
        return this._parent;
    }
    /**
     * List of children of the node, one level down
     * the tree.
     */
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
     * Determines the best child to select by assigning each
     * child a UCT-score.
     *
     * @param player AI's player number.
     * @returns Child with the best UCT-score.
     * @see [Informaion on the UCT-formula](https://en.wikipedia.org/wiki/Monte_Carlo_tree_search#Exploration_and_exploitation)
     */
    select(player) {
        let selected = this._children[0];
        const isAIPlayer = selected._state.playerNumber !== player;
        let bestValue = isAIPlayer ? -Infinity : Infinity;
        for (const child of this._children) {
            const uctValue = child.uctScore(this, isAIPlayer);
            if ((isAIPlayer && uctValue > bestValue)
                || (!isAIPlayer && uctValue < bestValue)) {
                selected = child;
                bestValue = uctValue;
            }
        }
        return selected;
    }
    // #endregion
    // #region Utlity
    uctScore(parent, isAIPlayer) {
        const exploitation = (this._state.wins / this._state.visits) || 0; // Change `NaN` to 0 (0 wins / 0 visits).
        const exploration = Math.sqrt(2) * Math.sqrt(Math.log(parent.state.visits) / this._state.visits) || Infinity; // Change `NaN` to `Infinity` (log(0 parent visits)).
        const uctValue = isAIPlayer ? exploitation + exploration
            : exploitation - exploration;
        return uctValue;
    }
    /**
     * Checks whether the node is a leaf node in
     * the tree, meaning it has no children.
     *
     * @returns Whether or not the node is a leaf node.
     */
    isLeaf() {
        return this._children.length === 0;
    }
    /**
     * Determines which child is the best.
     * This usually means the _most visisted_ child.
     *
     * @returns
     */
    getBestChild() {
        let child = this._children.reduce((x, y) => {
            return (x._state.wins / x._state.visits || 0) > (y._state.wins / y._state.visits || 0) ? x : y;
        });
        return child;
    }
}
