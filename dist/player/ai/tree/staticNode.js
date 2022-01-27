import AbstractNode from "./node.js";
export default class StaticNode extends AbstractNode {
    // #region Miscellaneous
    expand() {
        const moves = this.state.getMoves();
        for (const move of moves) {
            this.children.push(new StaticNode(move, this));
        }
        return this.children[0];
    }
    rollout() {
        const clone = this.state.clone();
        if (clone.game.isOver()) {
            const result = clone.game.getWinner();
            return result;
        }
        while (true) {
            clone.makeRandomMove();
            if (clone.game.isOver()) {
                const result = clone.game.getWinner();
                return result;
            }
            clone.togglePlayer();
        }
    }
}
