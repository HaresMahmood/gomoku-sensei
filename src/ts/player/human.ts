import Player from "./player.js";

export default class Human extends Player {
    // #region Initialization

    public constructor(player: number) {
        super(player);
        
        this._name = ["Human", "person"];
    }

    // #endregion

    // #region Miscellaneous

    public chooseMove(game: any): number {
        return -1;
    }

    // #endregion
} 