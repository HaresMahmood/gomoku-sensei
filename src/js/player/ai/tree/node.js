import State from "./state.js";

export default class Node {
    constructor(state = new State(), parent = null, children = []) {
        this.state = state;
        this.parent = parent;
        this.children = children;
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