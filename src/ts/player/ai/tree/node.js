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
        let selected = this.children[0];
        const isAIPlayer = selected.state.playerNumber !== playerNumber;
        let bestValue = isAIPlayer ? -Infinity : Infinity;

        for (const child of this.children) {
            const exploitation = (child.state.wins / child.state.visits) || 0; // Change `NaN` to 0 (0 wins / 0 visits).
            let exploration = 2 * Math.sqrt(Math.log(this.state.visits) / child.state.visits); 
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
        const moves = this.state.getMoves();

        for (const move of moves) {
            this.children.push(new Node(move, this));
        }

        return this.children[0]; // || this;
    }

    rollout() {
        const clone = this.state.clone();
        
        //console.log("");
        //console.log(clone.game.toMatrix());

        if (clone.game.isOver()) {
            const result = clone.game.getWinner();

            //console.log(true);
            //console.log(clone.game.toMatrix(), result);
    
            return result;
        }

        while (true) {
            clone.makeRandomMove();

            //console.log(clone.game.toMatrix());

            if (clone.game.isOver()) {
                const result = clone.game.getWinner();

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
        this.state.visits++;
        this.state.wins += utility;
    }

    isLeaf() {
        return this.children.length === 0;
    }
    
    getMostVisitedChild() {
        let child = this.children.reduce((x, y) => {
            return (x.state.wins / x.state.visits || 0) > (y.state.wins / y.state.visits || 0) ? x : y;
        });
    
        return child;
    }
}