/**
 * Generic representation of a player in a game.
 * The player can either be human, or an AI agent.
 */
export default class AbstractPlayer {
    // #region Initialization
    _player;
    _information;
    /**
     * Class constructor.
     *
     * @param player Number identifying this player, either `1` or `2`.
     */
    constructor(player) {
        this._player = player;
    }
    // #endregion
    // #region Properties
    // Inherited docs.
    get player() {
        return this._player;
    }
    // Inherited docs.
    get information() {
        return this._information;
    }
}
