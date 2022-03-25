import MDP from "../model/mdp.js";
import Player from "./player.js";

/**
 * Generic representation of a player in a game.
 * The player can either be human, or an AI agent.
 */
export default abstract class AbstractPlayer implements Player {
    // #region Initialization

    protected _playerNumber: number;
    protected _information: [string, string];

    /**
     * Class constructor.
     * 
     * @param playerNumber Number identifying this player, either `1` or `2`.
     */
    public constructor(playerNumber: number) {
        this._playerNumber = playerNumber;
    }

    // #endregion

    // #region Properties

    // Inherited docs.
    public get player() {
        return this._playerNumber;
    }

    // Inherited docs.
    public get information() {
        return this._information;
    }

    // #endregion

    // #region Miscellaneous
    
    // Inherited docs.
    public abstract chooseMove(mdp: MDP): number;

    // #endregion
}