import State from "./state.js";

/**
 * Abstract class representing a node in a game tree.
 */
export default abstract class AbstractNode {
    // #region Initialization 

    protected _state: State;
    protected _children: AbstractNode[];
    private _parent: AbstractNode;

    /**
     * Class constructor.
     * 
     * @param state 
     * @param parent 
     * @param children 
     */
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
    public get state() {
        return this._state;
    }

    /**
     * List of children of the node, one level down 
     * the tree.
     */
    public get children() {
        return this._children;
    }

    /**
     * Parent of the node, one up the tree.
     */
    public get parent() {
        return this._parent;
    }

    // #endregion

    // #region Abstract

    /**
     * Simulation-phase of MCTS.
     * A game is simulated in memory where the
     * AI plays against itself and each move is random.
     */
    public abstract simulate(): any;

    /**
     * Expansion-phase of MCTS.
     * Adds all nodes reachable from the current node
     * to the list of child-nodes.
     * 
     * @returns A random child-node - most likely the 
     * first.
     */
    public abstract expand(): AbstractNode;

    // #endregion
    
    // #region Miscellaneous

    /**
     * Selection-phase of MCTS.
     * Determines the best child to select by assigning each
     * child a UCT-score.
     * 
     * @param player AI's player number.
     * @returns Child with the best UCT-score.
     */
    public select(player: number): AbstractNode {
        let selected = this._children[0];
        const isAIPlayer = selected._state.player !== player;
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

    /**
     * Determines the score of the node based on the Upper
     * Condidence Bound 1 applied to trees (UCT)-formula.
     * 
     * @param parent Parent of the node.
     * @param isAIPlayer Whether or not the current node 
     * has the same player number as the AI.
     * @returns The UCT-score of the node.
     * @see [Informaion on the UCT-formula](https://en.wikipedia.org/wiki/Monte_Carlo_tree_search#Exploration_and_exploitation)
     */
    protected uctScore(parent: AbstractNode, isAIPlayer: boolean): number {
        const exploitation = (this._state.wins / this._state.visits) || 0; // Change `NaN` to 0 (0 wins / 0 visits).
        const exploration = Math.sqrt(2) * Math.sqrt(Math.log(parent.state.visits) / this._state.visits) || Infinity;  // Change `NaN` to `Infinity` (log(0 parent visits)).
        
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
    public isLeaf(): boolean {
        return this._children.length === 0;
    }
    
    /**
     * Determines which child is the best.
     * This usually means the _most visisted_ child.
     * 
     * @returns The _"best"_ child.
     */
    public getBestChild(): AbstractNode {
        let child = this._children.reduce((x, y) => {
            return (x._state.wins / x._state.visits || 0) > (y._state.wins / y._state.visits || 0) ? x : y;
        });
    
        return child;
    }

    // #endregion
}