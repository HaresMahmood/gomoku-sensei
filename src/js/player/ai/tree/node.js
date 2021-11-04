import State from "./state.js";

export default class Node {
    constructor(state = new State(), parent = null, children = []) {
        this.state = state;
        this.parent = parent;
        this.children = children;
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
        const values = [];

        for (const child of this.children) {
            //const multiplier = this.state.playerNumber === playerNumber ? 1 : -1;
            const exploitation = (child.state.wins / child.state.visits) || 0; // Change `NaN` to 0 (0 wins / 0 visits).
            const exploration = (2 * Math.sqrt(Math.log(this.state.visits) / child.state.visits)); // Change `undefined` to `Infinity` (log(0 parent visits))
            const uctValue = exploitation + exploration || Infinity;

            //console.log(child.state.wins, child.state.visits);
            //console.log(this.state.visits, 2 * Math.sqrt(Math.log(this.state.visits) / child.state.visits));
            //console.log(uctValue);
            //console.log(" ");
            values.push(uctValue);
        }

        const bestValue = this.children[0].state.playerNumber === playerNumber ? Math.max(...values) : Math.min(...values);
        const selected = this.children[values.indexOf(bestValue)]; // Returns first child by default.

        console.log(this.children[0].state.playerNumber, values.indexOf(bestValue));

        return selected;
    }

    expand() {
        const moves = this.state.getMoves();

        for (const move of moves) {
            this.children.push(new Node(move, this));
        }

        return this.children[0]; // || this;
    }

    rollout() {
        const original = this.state.game.clone();

        while (!this.state.game.isOver(this.state.playerNumber)) {
            this.state.togglePlayer();
            this.state.makeRandomMove();
        }

        const result = this.state.game.getWinner();
        this.state.game = original;

        return result;
    }

    /* Helper methods */

    updateStats(utility) {
        this.state.visits++;
        this.state.wins += utility;
    }

    isLeaf() {
        return this.children.length === 0;
    }
    
    getMostVisitedChild() {
        let child = [...this.children].reduce((x, y) => {
            return (x.state.wins / x.state.visits) > (y.state.wins / y.state.visits) ? x : y;
        });
    
        return child;
    }
}