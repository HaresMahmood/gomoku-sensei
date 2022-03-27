import DynamicNode from "../dist/player/ai//tree/dynamicNode.js";
import State from "../dist/player/ai/tree/state.js";
import Gomoku from "../dist/model/gomoku.js";
import { expect } from "chai";

let mdp;
let state;
let node;

describe("Dynamic Tree Node", () => {
    before( () => {
        mdp = new Gomoku();
        state = new State(mdp)
        node = new DynamicNode(state);
    });

    describe("Selection and Expansion", () => {
        it("Should identify the node as a leaf", () => {
            expect(node.isLeaf()).to.equal(true);
        });
    
        it("Should expand one level down the tree and include these nodes as children", () => {
            node.expand();
    
            expect(node.isLeaf()).to.equal(false);
            expect(node.children).to.be.of.length(mdp.rows**2);
        });
        
        it("Should assign a score of Infinity to yet unvisited child nodes", () => {
            node.expand();
    
            for (const child of node.children) {
                expect(child.uctScore(node, true)).to.equal(Infinity);
            }
        });

        it("Should identify the second child as most favourable", () => {
            node.expand();

            // With all other stats being equal, prolongation bias should
            // pick the node with the higher total game length (the second child here).
            node._children = [node.children[0], node.children[1]]
            node.state.visits = 6;
            node.children[0].updateStats(3, 3);
            node.children[1].updateStats(3, 4);
            
            expect(node.select(1)).to.eq(node.children[1]);
        });
    });
   
    describe("Simulation and Backpropagation", () => {
        it("Should complete a simulation without altering the working game copy", () => {
            const utility = node.simulate();
    
            expect(utility[0]).to.be.oneOf([-1, 1, 2]);
            expect(utility[1]).to.be.greaterThan(1);
            expect(node.state.mdp.isTerminal()).to.equal(false);
        });
    
        it("Should update internal State statistics correctly", () => {
            node.state.visits = 0; // Reset visits.

            node.updateStats(1, 1);
    
            expect(node.state.visits).to.equal(1);
            expect(node.state.wins).to.equal(1);
            expect(node.state.gameLength).to.equal(1);
    
            node.updateStats(0, 1);
    
            expect(node.state.visits).to.equal(2);
            expect(node.state.wins).to.equal(1);
            expect(node.state.gameLength).to.equal(2);
    
            node.updateStats(-1, 1);
    
            expect(node.state.visits).to.equal(3);
            expect(node.state.wins).to.equal(0);
            expect(node.state.gameLength).to.equal(3);
        });
    });
});