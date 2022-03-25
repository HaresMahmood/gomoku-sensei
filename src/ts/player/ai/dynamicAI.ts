// #region Imports

import Gomoku from "../../model/gomoku.js";
import AbstractAI from "./ai.js";
import AbstractNode from "./tree/node.js";
import DynamicNode from "./tree/dynamicNode.js";

// #endregion

/**
 * 
 */
export default class DynamicAI extends AbstractAI {
    /**
     * Chooses the move determined by the MCTS algorithm.
     * 
     * @param mdp MDP-representation of the game being played. 
     * @returns Coordinates of a chosen board position.
     */
    public chooseMove(game: Gomoku): number {
        const iterations: number = 22000;
        const root = new DynamicNode();

        root.state.mdp = game;
        root.state.playerNumber = this._playerNumber;
        root.expand();

        for (let i: number = 0; i <= iterations; i++) {
            let current = this.select(root); // Selection.
            let result;

            if (current.state.mdp.isTerminal()) {
                current.state.isTerminal = true;
                result = [current.state.mdp.getUtilityScore(), current.state.mdp.moveNumber];
            }
            else {
                if (current.state.visits > 0) {
                    current = current.expand(); // Expansion.
                }

                result = current.simulate(); // Simulation.
            }

            this.backpropagate(current as DynamicNode, result); // Backpropogation.
        }

        return root.getBestChild().state.mdp.lastMove;
    }

    /**
     * 
     * @param node 
     * @returns 
     */
    private select(node: AbstractNode): AbstractNode {
        while (!node.isLeaf()) { // && !node.state.game.isOver()
            node = node.select(this._playerNumber); // UCT.
        }

        return node;
    }

    /**
     * 
     * @param node 
     * @param result 
     */
    private backpropagate(node: DynamicNode, result): void {
        let utility = -1;

        if (result[0] === this._playerNumber) {
            utility = 1;
        }
        else if (result[0] === -1) {
            utility = 0;
        }

        while (node !== null) {
            node.updateStats(utility, result[1]);
            node = node.parent as DynamicNode;
        }
    }
}