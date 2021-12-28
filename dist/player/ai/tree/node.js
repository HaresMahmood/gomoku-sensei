import State from "./state.js";
export default class Node {
    _state;
    _parent;
    children;
    constructor(state = new State(), parent = null, children = []) {
        this._state = state;
        this._parent = parent;
        this.children = children;
    }
    get state() {
        return this._state;
    }
    get parent() {
        return this._parent;
    }
    /*
    selectAction() {
        const visited = [];
        let current = this;
        while (!current.isLeaf() && !current.state.game.isOver()) {
            current = current.select();
            visited.push(current);
        }
        let utility;
        if (current.state.game.isOver()) {
            utility = current.state.game.getUtility(current.state.playerNumber);
        }
        else {
            current.expand();
            const newNode = current.select();
            utility = newNode.rollout();
        }
        for (const node of visited) {
            node.updateStats(utility);
        }
        console.log(utility);
        this.updateStats(utility);
    }
    */
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
        //console.log("");
        //console.log(clone.game.toMatrix());
        if (clone.game.isOver(this._state.playerNumber)) {
            const result = clone.game.getWinner(this._state.playerNumber);
            //console.log(true);
            //console.log(clone.game.toMatrix(), result);
            return result;
        }
        while (true) {
            clone.makeRandomMove();
            //console.log(clone.game.toMatrix());
            if (clone.game.isOver(this._state.playerNumber)) {
                const result = clone.game.getWinner(this._state.playerNumber);
                //console.log(clone.game.toMatrix(), result);
                return result;
            }
            clone.togglePlayer();
        }
    }
    /*
        const original = this.state.game.clone();
        const originalPlayer = this.state.playerNumber;
        while (!this.state.game.isOver(this.state.playerNumber)) {
            console.log(this.state.game.toMatrix());
            this.state.makeRandomMove();
            this.state.togglePlayer();
        }
        const result = this.state.game.getWinner();
        //console.log(this.state.game.toMatrix(), result);
        this.state.game = original;
        this.state.playerNumber = originalPlayer;
        return result;
    */
    /* Helper methods */
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
