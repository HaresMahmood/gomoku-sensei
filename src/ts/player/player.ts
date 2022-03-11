import MDP from "../model/mdp.js";

// TODO: Make this an interface?

/**
 * Generic representation of a player in a game.
 * The player can either be human, or an AI agent.
 */
export default abstract class Player {
    // #region Initialization

    protected _playerNumber: number;
    protected _name: [string, string];

    /**
     * Constructor.
     * 
     * @param playerNumber Either `1` or `2`.
     */
    public constructor(playerNumber: number) {
        this._playerNumber = playerNumber;
    }

    // #endregion

    // #region Accessors

    /**
     * Player number of the player.
     */
    public get player() {
        return this._playerNumber;
    }

    /**
     * Properties of the player, such as its name and
     * corresponding icon. Used by the View.
     */
    public get name() {
        return this._name;
    }

    // #endregion

    // #region Miscellaneous
    
    /**
     * Abstraction of the move choice process. Delegates
     * logic to concrete classes.
     * 
     * @param mdp MDP-representation of the game being played. 
     * @returns Coordinates of the chosen move.
     */
    public abstract chooseMove(mdp: MDP): number;

    // #endregion
}