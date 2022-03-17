import Gomoku from "../src/ts/model/game";
import { expect } from "chai";

describe("Game of Gomoku or Five in a Row, acts as the Model or API for the application", () => {
    it("Should initialise with a dummy value for the coordinates of the last move", () => {
        let game = new Gomoku();

        expect(game.lastMove).to.equal(-1);
    });
});