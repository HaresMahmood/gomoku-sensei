import Player from "./player.js";
export default class Human extends Player {
    // #region Initialization
    constructor(player) {
        super(player);
        this._name = ["Human", "person"];
    }
    // #endregion
    // #region Miscellaneous
    chooseMove(game) {
        return -1;
    }
}
