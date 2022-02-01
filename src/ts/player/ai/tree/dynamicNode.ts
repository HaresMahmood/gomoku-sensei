import AbstractNode from "./node.js";
import State from "./state.js";

export default class DynamicNode {
    // #region Initialization 

    private _state: State;
    private _parent: DynamicNode;
    private _children: DynamicNode[];

    public depth: number;

    constructor(state = new State(), parent = null, children = []) {
        this._state = state;
        this._parent = parent;
        this._children = children;
        this.depth = 0;
    }

    // #endregion

    // #region Accessors

    public get state() {
        return this._state;
    }

    public get parent() {
        return this._parent;
    }

    protected get children() {
        return this._children;
    }

    // #endregion

    // #region Miscellaneous

    public expand() {
        const moves = this.state.getMoves();

        for (const move of moves) {
            this.children.push(new DynamicNode(move, this));
        }

        return this.children[0];
    }

    public rollout() {
        const clone = this.state.clone();

        this.depth = 0;

        if (clone.game.isOver()) {
            const result = clone.game.getWinner();
    
            return result;
        }

        while (true) {
            clone.makeRandomMove();

            this.depth++;

            // console.log(this.depth);

            if (clone.game.isOver()) {
                const result = clone.game.getWinner();
        
                return result;
            }

            clone.togglePlayer();
        }
    }

    // #endregion

    // #region Miscellaneous

    public select(playerNumber: number): DynamicNode {
        let selected = this._children[0];
        const isAIPlayer = selected._state.playerNumber !== playerNumber;
        let bestValue = isAIPlayer ? -Infinity : Infinity;

        for (const child of this._children) {
            const exploitation = (child._state.wins / child._state.visits) || 0; // Change `NaN` to 0 (0 wins / 0 visits).
            let exploration = 1.41 * Math.sqrt(Math.log(this._state.visits) / child._state.visits); 
            exploration = isNaN(exploration) ? Infinity : exploration; // Change `NaN` to `Infinity` (log(0 parent visits)).
            
            const uctValue = isAIPlayer ? exploitation + exploration 
                                        : exploitation - exploration;

            //console.log(child, uctValue, bestValue);
            //console.log(exploitation, exploration);

            if ((isAIPlayer && uctValue > bestValue)
             || (!isAIPlayer && uctValue < bestValue)) {
                selected = child;
                bestValue = uctValue;
            }
        }
        
        //console.log(currentPlayerNumber, bestValue, this.children.indexOf(selected));
        //console.log(" ");

        return selected;
    }

    // #endregion

    // #region Utlity

    public updateStats(utility: number): void {
        this._state.visits++;
        this._state.wins += utility;
    }

    public isLeaf(): boolean {
        return this._children.length === 0;
    }

    public getWinRate(): number {
        let wins = 0;
        let losses = 0;

        for (const child of this._children) {
            wins += child._state.wins > 0 ? 1 : 0; 
        }

        return wins / this._children.length * 100;
    }
    
    public getMostVisitedChild(): DynamicNode {
        let child = this._children.reduce((x, y) => {
            return (x._state.wins / x._state.visits || 0) > (y._state.wins / y._state.visits || 0) ? x : y;
        });
    
        return child;
    }

    // #endregion
}