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

    getUCTValue(player) {
        let selected = null;
        let bestValue = Number.MIN_SAFE_INTEGER;

        for (const child of this.children) {
            const multiplier = this.state.playerNumber !== player ? 1 : -1;
            const exploitation = (child.state.rewards / child.state.visits) * multiplier;
            const exploration = Math.sqrt(Math.log(this.state.visits / child.state.visits));

            const uctValue = exploitation + exploration;

            console.log(exploitation, exploration);

            if (uctValue > bestValue) {
                selected = child;
                bestValue = uctValue;
            }
        }
        
        return selected;
    }
}