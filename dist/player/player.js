// TODO: Make this an interface?
/**
 * Generic representation of a player in a game.
 * The player can either be human, or an AI agent.
 */
export default class Player {
    // #region Initialization
    _playerNumber;
    _name;
    /**
     * Constructor.
     *
     * @param playerNumber Either `1` or `2`.
     */
    constructor(playerNumber) {
        this._playerNumber = playerNumber;
    }
    // #endregion
    // #region Accessors
    /**
     * Player number of the player.
     */
    get player() {
        return this._playerNumber;
    }
    /**
     * Properties of the player, such as its name and
     * corresponding icon. Used by the View.
     */
    get name() {
        return this._name;
    }
}
