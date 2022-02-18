import Game from "../../model/game.js";
import AbstractAI from "./ai.js";
import AbstractNode from "./tree/node.js";
import DynamicNode from "./tree/dynamicNode.js";

export default class DynamicAI extends AbstractAI {
    // private node: AbstractNode;

    // constructor(player: number, node: AbstractNode) {
    //     super(player);

    //     this.node = node;
    // }

    public chooseMove(game: Game): number {
        const iterations: number = 22000;
        const root = new DynamicNode();

        root.state.game = game;
        root.state.playerNumber = this._player;
        root.expand();

        for (let i: number = 0; i <= iterations; i++) {
            // Teytaud and Teytaud policy (Decisive and Anti-Decisive moves) here.
            let current = this.select(root); // Selection.
            let result;

            if (current.state.game.isOver()) {
                result = current.state.game.getWinner();
            }
            else {
                if (current.state.visits > 0) {
                    current = current.expand(); // Expansion.
                }

                result = current.rollout(); // Simulation.
            }

            this.backpropogate(current, result); // Backpropogation.
        }

        console.log(root);
        console.log(root.getMostVisitedChild());

        return root.getMostVisitedChild().state.game.lastMove;
    }

    private select(node: DynamicNode) {
        while (!node.isLeaf()) { // && !node.state.game.isOver()
            node = node.select(this._player); // UCT.
        }

        return node;
    }

    private backpropogate(node: DynamicNode, result) {
        let utility = -1;

        if (result[0] === this._player) {
            utility = 1;
        }
        else if (result[0] === -1) {
            utility = 0;
        }

        while (node !== null) {
            node.updateStats(utility, result[1]);
            node = node.parent;
        }
    }

    // #region Utility

    private mistakeProbability(game: Game) {
        const max: number = 520 * (game.n - 3);
        const min: number = -5020 * (game.n - 3);
        const value: number = game.getHeuristicEvaluation(this._player);
        let normalizedValue = this.normalize(value, min, max, 0, 1);

        // if (value > 0) { // If the AI is ahead of its opponent, ...
        //     normalizedValue = 0.175 + value / max;
        // }
        // else {
        //     normalizedValue = 0.175 + Math.sqrt(-1 * value / min);
        // }

        console.log(value);

        return normalizedValue;
    }

    /**
     * Normalizes a value from one range (current) to another (new).
     *
     * @param val    //the current value (part of the current range).
     * @param minVal //the min value of the current value range.
     * @param maxVal //the max value of the current value range.
     * @param newMin //the min value of the new value range.
     * @param newMax //the max value of the new value range.
     *
     * @returns the normalized value.
     * 
     * @see https://stackoverflow.com/questions/39776819/function-to-normalize-any-number-from-0-1
     */
    private normalize(val, minVal, maxVal, newMin, newMax) {
        return newMin + (val - minVal) * (newMax - newMin) / (maxVal - minVal);
    }

    // #endregion
}