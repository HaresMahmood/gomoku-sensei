import Gomoku from "../../model/game.js";
import AbstractAI from "./ai.js";
import AbstractNode from "./tree/node.js";
import StaticNode from "./tree/staticNode.js";

export default class KillerAI extends AbstractAI {
    // private node: AbstractNode;

    // constructor(player: number, node: AbstractNode) {
    //     super(player);

    //     this.node = node;
    // }

    public chooseMove(game: Gomoku): number {
        const interval: number = 22500;
        // const startTime = Date.now();
        const root = new StaticNode();
        let counter: number = 0;

        root.state.mdp = game;
        root.state.playerNumber = this._player;
        root.expand();

        while(counter != interval) {
            let current = this.select(root); // Selection.
            let result;

            if (current.state.mdp.isTerminal()) {
                result = current.state.mdp.getUtilityScore();
            }
            else {
                if (current.state.visits > 0) {
                    current = current.expand(); // Expansion.
                }

                result = current.rollout(); // Simulation.
            }

            this.backpropogate(current as StaticNode, result); // Backpropogation.

            counter++;
        }

        const winnerNode = root.getBestChild();

        // console.log(counter);
        console.log(root);

        return winnerNode.state.mdp.lastMove;
    }

    private select(node: AbstractNode) {
        while (!node.isLeaf()) { // && !node.state.game.isOver()
            node = node.select(this._player); // UCT.
        }

        return node;
    }

    private backpropogate(node: StaticNode, result) {
        let utility = -1;

        if (result === this._player) {
            utility = 1;
        }
        else if (result === -1) {
            utility = 0;
        }

        while (node !== null) {
            node.updateStats(utility);
            node = node.parent as StaticNode;
        }
    }
}