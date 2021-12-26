import State from "./state.js";

export default class Node {
    private _parent: Node;
    private children: Node[];
    private _state: State;
    private _playerNumber: number;
    private _wins: number;
    private _visits: number;

    
    public get state() {
        return this._state;
    }

    public get parent() {
        return this._parent;
    }

    public get playerNumber() {
        return this._playerNumber;
    }

    public get wins() {
        return this._wins;
    }

    public get visits() {
        return this._visits;
    }




    constructor(state: State = new State(), parent: Node = null, children: Node[] = []) {
        this._state = state;
        this._parent = parent;
        this.children = children;
    }



    public select(playerNumber) {
        let selected = this.children[0];
        const isAIPlayer = selected._state.playerNumber !== playerNumber;
        let bestValue = isAIPlayer ? -Infinity : Infinity;

        for (const child of this.children) {
            const exploitation = (child._state.wins / child._state.visits) || 0; // Change `NaN` to 0 (0 wins / 0 visits).
            let exploration = 2 * Math.sqrt(Math.log(this._state.visits) / child._state.visits); 
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

    public expand() {
        const moves = this._state.getMoves();

        for (const move of moves) {
            this.children.push(new Node(move, this));
        }

        return this.children[0]; // || this;
    }

    public rollout() {
        const clone = this._state.clone();
        
        if (clone.game.isOver()) {
            const result = clone.game.getWinner();
    
            return result;
        }

        while (true) {
            clone.makeRandomMove();

            if (clone.game.isOver()) {
                const result = clone.game.getWinner();
        
                return result;
            }

            clone.togglePlayer();
        }
    }

    /*=== Helper methods ===*/

    updateStats(utility) {
        this._state.visits++;
        this._state.wins += utility;
    }

    isLeaf() {
        return this.children.length === 0;
    }
    
    getMostVisitedChild() {
        let child = this.children.reduce((x, y) => {
            return (x._state.wins / x._state.visits || 0) > (y._state.wins / y._state.visits || 0) ? x : y;
        });
    
        return child;
    }
}