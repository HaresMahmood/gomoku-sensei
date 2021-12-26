import State from "./state.js";
export default class Node {
    _parent;
    children;
    _state;
    _playerNumber;
    _wins;
    _visits;
    get state() {
        return this._state;
    }
    get parent() {
        return this._parent;
    }
    get playerNumber() {
        return this._playerNumber;
    }
    get wins() {
        return this._wins;
    }
    get visits() {
        return this._visits;
    }
    constructor(state = new State(), parent = null, children = []) {
        this._state = state;
        this._parent = parent;
        this.children = children;
    }
    select(playerNumber) {
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
    expand() {
        const moves = this._state.getMoves();
        for (const move of moves) {
            this.children.push(new Node(move, this));
        }
        return this.children[0]; // || this;
    }
    rollout() {
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