export default class Node {
    constructor(game = null, parent = null, children = [], visits = 0, wins = 0.0) {
        this.game = game;
        this.parent = parent;
        this.children = children;
        
        this.visits = visits;
        this.wins = wins;
    }

    expand() {
        let moves = this.game.getPossibleSuccessors();
        
        for (let i = 0; i < moves.length; i++) {
            let child = new Node(moves[i], this);
            
            this.children.push(child);
        }
    }

    isFullyExpanded() {
        return this.getUnvisistedChildren().length > 0  && this.children.length;
    }

    getUnvisistedChildren() {
        return this.children.filter(child => {
            return child.visits === 0;
        });
    }

    getMostVisitedChild() {
        let child = this.children.reduce((x, y) => {
            return x.visits > y.visits ? x : y;
        });

        return child;
    }

    getRandomChild() {
        return this.children[Math.floor(Math.random() * this.children.length)];
    }

    performRandomMove() {
        this.game.performRandomMove();
    }
}