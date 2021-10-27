import NodeState from "./nodeState.js";

export default class Node {
    constructor(parent = null, state = null, moves = [], children = []) {
        this.parent = parent;
        this.state = state;
        this.moves = moves;
        this.children = children;
    }

    isFullyExpanded() {
        return this.children.length > 0 && this.children.length === this.moves.length;
    }

    mostVisitedChild() {
        let child = this.children.reduce((x, y) => {
            return x.state.visits > y.state.visits ? x : y;
        });

        return child;
    }

    expand() {
        if (this.isFullyExpanded()) {
            return null;
        }

        let player = this.state.getNextPlayer(); // nextPlayer;

        if (this.moves.length === 0) {
            this.actions = shuffle(this.state.getPossibleMoves());
        }

        let newMove = this.moves[this.children.length];
        let child = new Node(this, new NodeState(player, this.state.board.copyState()));

        child.performMove(newMove);
        this.children.push(child);

        return child;
    }
}

// TODO: Move to separate file in `/utility/`.
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}