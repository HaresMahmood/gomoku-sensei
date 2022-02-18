import AbstractAI from "./ai.js";
import DynamicNode from "./tree/dynamicNode.js";
export default class DynamicAI extends AbstractAI {
  // private node: AbstractNode;
  // constructor(player: number, node: AbstractNode) {
  //     super(player);
  //     this.node = node;
  // }
  chooseMove(game) {
    const iterations = 22000;
    const root = new DynamicNode();
    root.state.game = game;
    root.state.playerNumber = this._player;
    root.expand();
    for (let i = 0; i <= iterations; i++) {
      // Teytaud and Teytaud policy (Decisive and Anti-Decisive moves) here.
      let current = this.select(root); // Selection.
      let result;
      if (current.state.game.isOver()) {
        result = current.state.game.getWinner();
      } else {
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
  select(node) {
    while (!node.isLeaf()) {
      // && !node.state.game.isOver()
      node = node.select(this._player); // UCT.
    }
    return node;
  }
  backpropogate(node, result) {
    let utility = -1;
    if (result[0] === this._player) {
      utility = 1;
    } else if (result[0] === -1) {
      utility = 0;
    }
    while (node !== null) {
      node.updateStats(utility, result[1]);
      node = node.parent;
    }
  }
  // #region Utility
  mistakeProbability(game) {
    const max = 520 * (game.n - 3);
    const min = -5020 * (game.n - 3);
    const value = game.getHeuristicEvaluation(this._player);
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
   * @see
   *     https://stackoverflow.com/questions/39776819/function-to-normalize-any-number-from-0-1
   */
  normalize(val, minVal, maxVal, newMin, newMax) {
    return newMin + ((val - minVal) * (newMax - newMin)) / (maxVal - minVal);
  }
}
