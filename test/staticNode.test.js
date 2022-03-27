import StaticNode from "../dist/player/ai//tree/staticNode.js";
import State from "../dist/player/ai/tree/state.js";
import Gomoku from "../dist/model/gomoku.js";
import { expect } from "chai";

let mdp;
let state;
let node;

describe("Static Tree Node", () => {
    before( () => {
        mdp = new Gomoku();
        state = new State(mdp)
        node = new StaticNode(state);
    });

    it("Should identify the node as a leaf", () => {
        expect(node.isLeaf()).to.equal(true);
    });

    it("Should identify the node as a leaf", () => {
        expect(node.isLeaf()).to.equal(true);
    });

    it("Should expand one level down the tree and include these nodes as children", () => {
        const utility = node.simulate();

        expect(utility).to.be.oneOf([-1, 1, 2]);
        expect(node.state.mdp.isTerminal()).to.equal(false);
    });

    it("Should complete a simulation without altering the working game copy", () => {
        const utility = node.simulate();

        expect(utility).to.be.oneOf([-1, 1, 2]);
        expect(node.state.mdp.isTerminal()).to.equal(false);
    });

    it("Should update internal State statistics correctly", () => {
        node.updateStats(1);

        expect(node.state.visits).to.equal(1)
        expect(node.state.wins).to.equal(1)

        node.updateStats(0);

        expect(node.state.visits).to.equal(2)
        expect(node.state.wins).to.equal(1)

        node.updateStats(-1);

        expect(node.state.visits).to.equal(3)
        expect(node.state.wins).to.equal(0)
    });
});