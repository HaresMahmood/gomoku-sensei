/**
 * Generic representation of a player in a game.
 * The player can either be human, or an AI agent.
 */
export default class AbstractPlayer {
    // #region Initialization
    _playerNumber;
    _information;
    /**
     * Class constructor.
     *
     * @param playerNumber Number identifying this player, either `1` or `2`.
     */
    constructor(playerNumber) {
        this._playerNumber = playerNumber;
    }
    // #endregion
    // #region Properties
    // Inherited docs.
    get player() {
        return this._playerNumber;
    }
    // Inherited docs.
    get information() {
        return this._information;
    }
}
