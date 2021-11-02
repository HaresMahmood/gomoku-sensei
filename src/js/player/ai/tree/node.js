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

    select() {
        let selected = this.children[0];
        let bestValue = Number.MIN_SAFE_INTEGER;

        for (const child of this.children) {
            const exploitation = child.state.wins / child.state.visits;
            const exploration = Math.sqrt(2) * Math.sqrt(Math.log(this.state.visits) / child.state.visits);
            const uctValue = exploitation + exploration;

            //console.log(exploitation, exploration);

            if (uctValue > bestValue) {
                selected = child;
                bestValue = uctValue;
            }
        }
        
        return selected;
    }

    expand() {
        const child = new Node(this.state.getRandomMove(), this);
        this.children.push(child);

        return child;
    }

    rollout() {
        const original = this.state.game.clone();

        while (!this.state.game.isOver(this.state.playerNumber)) {
            this.state.togglePlayer();
            this.state.makeRandomMove();
        }

        const winner = this.state.game.getWinner();
        this.state.game = original;

        return winner;
    }

    /* Helper methods */

    updateStats(utility) {
        this.state.visits++;
        this.state.wins += utility;
    }
   
    getRandomChild() {
        const random = Math.floor(Math.random() * this.children.length);
        return this.children[random]; // || null 
    }

    getUnvisitedChildren() {
        return this.children.filter(child => {
            return child.state.visits === 0;
        });
    }
    
    getMostVisitedChild() {
        let child = this.children.reduce((x, y) => {
            return (x.state.wins / x.state.visits) > (y.state.wins / y.state.visits) ? x : y;
        });
    
        return child;
    }
}