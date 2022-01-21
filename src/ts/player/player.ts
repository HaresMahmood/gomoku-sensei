// TODO: Make this an interface?
export default abstract class Player {
    // #region Initialization
    protected _player: number;
    protected _name: [string, string]; // TODO: Maybe don't include icon-name?

    public constructor(playerNumber: number) {
        this._player = playerNumber;
    }

    // #endregion

    // #region Accessors

    public get player() {
        return this._player;
    }

    public get name() {
        return this._name;
    }

    // #endregion

    // #region Miscellaneous
    
    public abstract chooseMove(game): number;

    // #endregion
}