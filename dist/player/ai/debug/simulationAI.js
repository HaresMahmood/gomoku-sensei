import AbstractAI from "../ai.js";
import StaticNode from "../tree/staticNode.js";
export default class SimulationAI extends AbstractAI {
    // Inherited docs.
    chooseMove(mdp) {
        const iterations = 1000;
        const root = new StaticNode();
        let counter = 0;
        root.state.mdp = mdp;
        root.state.player = this._player;
        root.expand();
        for (const child of root.children) {
            while (counter < iterations) {
                const result = child.simulate();
                let utility = -1;
                if (result === this._player) {
                    utility = 1;
                }
                else if (result === -1) {
                    utility = 0;
                }
                child.updateStats(utility);
                counter++;
            }
            counter = 0;
        }
        return root.getBestChild().state.mdp.lastMove;
    }
}
