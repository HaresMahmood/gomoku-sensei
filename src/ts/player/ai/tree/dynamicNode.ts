import AbstractNode from "./node.js";

export default class DynamicNode extends AbstractNode {
    // private _depth: number;

    // // #region Accessors

    // public get depth() {
    //     return this._depth;
    // }

    // #endregion

    // #region Miscellaneous
    
    public override expand() {
        const moves = this.state.getMoves();

        for (const move of moves) {
            this.children.push(new DynamicNode(move, this));
        }

        return this.children[0];
    }

    public override rollout() {
        const clone = this.state.clone()
        // this._depth = 0;
    
        // TODO: Comment out.
        if (clone.game.isOver()) {
            const result = clone.game.getWinner();

            return result;
        }

        // console.log(this._depth);
    
        while (true) {
            clone.makeRandomMove();

            // this._depth++;
    
            if (clone.game.isOver()) {
                const result = clone.game.getWinner();
                
                return result;
            }
    
            clone.togglePlayer();
        }
    }

    // #endregion
}