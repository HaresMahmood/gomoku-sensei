import AbstractAI from "./ai.js";
/**
 * Concrete representation of a stochastic AI agent.
 * The AI considers no strategies or tactics and
 * utilises no tree-searching algorithms; it plays
 * purely randomly.
 */
export default class RandomAI extends AbstractAI {
    /**
     * Chooses a random position on the board.
     *
     * @param mdp MDP-representation of the game being played.
     * @returns Coordinates of a random board position.
     */
    chooseMove(mdp) {
        mdp.makeRandomTransition(this._player);
        return mdp.lastMove;
    }
}
