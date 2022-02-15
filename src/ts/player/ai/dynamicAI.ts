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
        const iterations: number = 20000;
        // const startTime = Date.now();
        const root = new DynamicNode();
        let counter: number = 0;

        root.state.game = game;
        root.state.playerNumber = this._player;
        root.expand();

        while (counter != iterations) {
            // Teytaud and Teytaud policy (Decisive and Anti-Decisive moves)
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

            counter++;
        }

        console.log(root);
        console.log(root.getMostVisitedChild());

        const sortedChildren = root.sortChildren();
        let winnerNode = sortedChildren[0];
        const random = Math.random(); const mistake = this.mistakeProbability(game);

        if (random < mistake) {
            winnerNode = sortedChildren[1]; // Play sub-optimal move if probability of mistake is high enough.
        }

        console.log(random, mistake);

        return winnerNode.state.game.lastMove;
    }

    private mistakeProbability(game: Game) {
        const max = 10000 * (game.n - 3);
        const value = game.getHeuristicEvaluation(this._player);

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
        const normalize = (val, minVal, maxVal, newMin, newMax) => {
            return newMin + (val - minVal) * (newMax - newMin) / (maxVal - minVal);
        };

        return normalize(value,-max, max, 0, 1)  - 0.225; // Pretty much a random value.
    }

    private select(node: DynamicNode) {
        while (!node.isLeaf()) { // && !node.state.game.isOver()
            node = node.select(this._player); // UCT.
        }

        return node;
    }

    private backpropogate(node: DynamicNode, result) {
        let utility = -1;

        if (result === this._player) {
            utility = 1;
        }
        else if (result === -1) {
            utility = 0;
        }

        // console.log(node.depth);

        while (node !== null) {
            node.updateStats(utility);
            node = node.parent;
        }
    }
}