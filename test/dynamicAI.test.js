import DynamicAI from "../dist/player/ai/dynamicAI.js";
import Gomoku from "../dist/model/gomoku.js";
import { expect } from "chai";

let ai;
let mdp;

describe("Dynamic AI", () => {
    before( () => {
        ai = new DynamicAI(1, 5000);
        mdp = new Gomoku();
    });

    it("Should return the correct UI information", () => {
        expect(ai.information[0]).to.equal("AI"); // Display name.
        expect(ai.information[1]).to.equal("smart_toy"); // Icon.
    });

    it("Should choose a valid move and run private methods without failure", () => {
        const validMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]
        const move = ai.chooseMove(mdp);
        
        expect(validMoves).to.contain(move);
    });
});