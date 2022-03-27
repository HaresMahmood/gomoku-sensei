import Human from "../dist/player/human.js";
import { expect } from "chai";

let human;

describe("Human Player", () => {
    before( () => {
        human = new Human();
    });
    it("Should return the correct UI information", () => {
        expect(human.information[0]).to.equal("Human"); // Display name.
        expect(human.information[1]).to.equal("person"); // Icon.
    });

    it("Should return a dummy value when choosing a move", () => {
        expect(human.chooseMove()).to.equal(-1);
    });
});