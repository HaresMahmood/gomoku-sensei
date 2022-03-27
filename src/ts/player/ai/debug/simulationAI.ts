import AbstractAI from "../ai.js";
import MDP from "../../../model/mdp.js";
import StaticNode from "../tree/staticNode.js";

export default class SimulationAI extends AbstractAI {
    // #region Initialization

    constructor(player: number, iterations: number = 1000) {
        super(player, iterations);
    }

    // #endregion

    // #region Miscellaneous

    // Inherited docs.
    public chooseMove(mdp: MDP): number {
        const root = new StaticNode();
        let counter = 0;
        
        root.state.mdp = mdp;
        root.state.player = this._player;
        root.expand();

        for (const child of root.children) {
            while (counter < this._iterations) {
                const result = child.simulate();
                let utility = -1;

                if (result === this._player) {
                    utility = 1;
                }
                else if (result === -1) {
                    utility = 0;
                }

                (child as StaticNode).updateStats(utility);

                counter++;
            }

            counter = 0;
        }

        return root.getBestChild().state.mdp.lastMove;
    }

    // #endregion
}