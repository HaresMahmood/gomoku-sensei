import Gomoku from "../dist/model/game.js";
import assert from "assert";

let gomoku;

describe('Gomoku', function () {
    before(function () {
        gomoku = new Gomoku();
    });

    it('should return -1 when the value is not present', function () {
        assert.equal(gomoku.lastMove, -1);
    });

    it('should return -1 when the value is not present', function () {
        gomoku.makeTransition(1, 1);
        assert.notEqual(gomoku.lastMove, -1);
        assert.equal(gomoku.lastMove, 1);
    });
});