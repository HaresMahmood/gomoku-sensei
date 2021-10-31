import State from "./state.js";

export default class Node {
    constructor(state = new State(), parent = null, children = []) {
        this.state = state;
        this.parent = parent;
        this.children = children;
    }

    clone() {
        const state = new State(this.state.game.copyState(), this.state.playerNumber, this.state.wins, this.state.visits);
        return new Node(state, this.parent, this.children.slice());
    }

    getRandomChild() {
        const random = Math.floor(Math.random() * this.children.length);
        //console.log(random, this.children[random]);
        return this.children[random]; // || null 
    }
    
    getMostVisitedChild() {
        let child = this.children.reduce((x, y) => {
            return x.state.visits > y.state.visits ? x : y;
        });
    
        return child;
    }
}