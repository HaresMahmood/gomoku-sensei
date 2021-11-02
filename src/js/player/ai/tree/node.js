import State from "./state.js";

export default class Node {
    constructor(state = new State(), parent = null, children = null) {
        this.state = state;
        this.parent = parent;
        this.children = children;
    }

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

            utility = this.simulate(newNode.state);
        }

        for (const node of visited) {
            node.updateStats(utility);
        }

        console.log(utility);

        this.updateStats(utility);
    }

    select() {
        let selected = this.children[0];
        let bestValue = Number.MIN_SAFE_INTEGER;

        for (const child of this.children) {
            const exploitation = child.state.wins / child.state.visits;
            const exploration = Math.sqrt(2) * Math.sqrt(Math.log(this.state.visits) / child.state.visits);
            const uctValue = exploitation + exploration;

            if (uctValue > bestValue) {
                selected = child;
                bestValue = uctValue;
            }
        }
        
        return selected;
    }

    expand() {
        const moves = this.state.getMoves();
        this.children = [];

        for (const move of moves) {        
            this.children.push(new Node(move, this));
        }
    }

    simulate(state) {
        const original = state.game.clone();

        while (!state.game.isOver(state.playerNumber)) {
            state.togglePlayer();
            state.makeRandomMove();
        }

        const utility = state.game.getUtility(this.state.playerNumber);
        state.game = original;

        return utility;
    }

    /* Helper methods */

    updateStats(utility) {
        this.state.visits++;
        this.state.wins += utility;
    }

    isLeaf() {
        return this.children === null;
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
            return x.state.visits > y.state.visits ? x : y;
        });
    
        return child;
    }
}