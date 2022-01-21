// TODO: Make this an interface?
export default class Player {
    // #region Initialization
    _player;
    _name; // TODO: Maybe don't include icon-name?
    constructor(playerNumber) {
        this._player = playerNumber;
    }
    // #endregion
    // #region Accessors
    get player() {
        return this._player;
    }
    get name() {
        return this._name;
    }
}
