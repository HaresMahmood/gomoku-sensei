import Gomoku from "../dist/model/gomoku.js";
import { expect } from "chai";

let game;

describe("Model - Gomoku", () => {
    before( () => {
        game = new Gomoku();
    });

    it("Should initialise the game with the correct internal values", () => {
        const cells = game.getEmptyCells();
        const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]
        
        expect(game.lastMove).to.equal(-1);
        expect(game.moveNumber).to.equal(1);
        expect(game.isTerminal()).to.equal(false);
        expect(cells).to.eql(expected);
    });
    
    it("Should update all relevant internal values when a move is made", () => {
        game.makeTransition(0, 1); // Make a transition to cell `1`, with player 1.

        expect(game.lastMove).to.equal(0);
        expect(game.moveNumber).to.equal(2);
        expect(game.isTerminal()).to.equal(false);
    });

    it("Should indicate that the cell is empty", () => {
        expect(game.isCellEmpty(1)).to.equal(true);
    });

    it("Should return all possible moves from the current board position", () => {
        const cells = game.getEmptyCells();
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]

        expect(cells).to.eql(expected);

    });

    it("Should perform a random move", () => {
        game.makeRandomTransition(2);

        expect(game.lastMove).to.not.equal(-1);
        expect(game.moveNumber).to.equal(3);
        expect(game.isTerminal()).to.equal(false);
    });

    it("Should return a deep-copy of itself", () => {
        const copy = game.clone()
        
        expect(copy).to.eql(game);
    });

    it("Should declare the first player as the winner", () => {
        game.makeTransition(1, 1);
        game.makeTransition(2, 1);
        game.makeTransition(3, 1);
        game.makeTransition(4, 1);

        expect(game.isTerminal()).to.equal(true);
        expect(game.getUtilityScore()).to.equal(1);
        expect(game.hasWon(1)).to.equal(true);
    });

    it("Should empty the board to start a new game", () => {
        game.restart();

        const cells = game.getEmptyCells();
        const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]

        expect(game.lastMove).to.equal(-1);
        expect(game.moveNumber).to.equal(1);
        expect(game.isTerminal()).to.equal(false);
        expect(cells).to.eql(expected);
    });

    it("Should transform a tic-tac-toe board to the correct delimited string", () => {
        const board = game.toDelimitedString([1, 0, 0, 0, 1, 0, 0, 0, 1], '#', 3);

        expect(board).to.equal("100#010#001");
    });
});