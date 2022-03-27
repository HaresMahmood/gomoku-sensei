import State from "../dist/player/ai/tree/state.js";
import Gomoku from "../dist/model/gomoku.js";
import { expect } from "chai";

let mdp;
let state;

describe("Node State", () => {
    before( () => {
        mdp = new Gomoku();
        state = new State(mdp);
    });

    it("Should identify all transitions possible from the current board position", () => {
        expect(state.getTransitions()).to.be.of.length(mdp.rows**2);
    });

    it("Should create a deep-copy of itself", () => {
        expect(state.clone()).to.eql(state);
    });

    it("Should identify the second player as the opponent", () => {
        expect(state.getOpponentPlayerNumber()).to.equal(2);
    });

    it("Should toggle its player number to two", () => {
        state.togglePlayer();

        expect(state.player).to.equal(2);
    });
});