export default class Node {
    _move;
    _player;
    _parent;
    children;
    _wins;
    _visits;
    constructor(move, player, parent, children = [], wins = 0, visits = 0) {
        this._move = move;
        this._player = player;
        this._parent = parent;
        this.children = children;
        this._wins = wins;
        this._visits = visits;
    }
    /*=== Accessors ===*/
    get move() {
        return this._move;
    }
    get parent() {
        return this._parent;
    }
    get playerNumber() {
        return this._player;
    }
    get wins() {
        return this._wins;
    }
    get visits() {
        return this._visits;
    }
    /*=== Miscellaneous ===*/
    select(playerNumber) {
        let selected = this.children[0];
        const isAIPlayer = selected.playerNumber !== playerNumber;
        let bestValue = isAIPlayer ? -Infinity : Infinity;
        for (const child of this.children) {
            const exploitation = (child.wins / child.visits) || 0; // Change `NaN` to 0 (0 wins / 0 visits).
            let exploration = 2 * Math.sqrt(Math.log(this._visits) / child.visits);
            exploration = isNaN(exploration) ? Infinity : exploration; // Change `NaN` to `Infinity` (log(0 parent visits)).
            const uctValue = isAIPlayer ? exploitation + exploration
                : exploitation - exploration;
            //console.log(child, uctValue, bestValue);
            //console.log(exploitation, exploration);
            if ((isAIPlayer && uctValue > bestValue)
                || (!isAIPlayer && uctValue < bestValue)) {
                selected = child;
                bestValue = uctValue;
            }
        }
        //console.log(currentPlayerNumber, bestValue, this.children.indexOf(selected));
        //console.log(" ");
        return selected;
    }
    expand(game) {
        const moves = game.getSuccessors(this._player);
        const nextPlayer = game.togglePlayer(this._player);
        for (const move of moves) {
            this.children.push(new Node(move, nextPlayer, this));
        }
        return this.children[0]; // || this;
    }
    rollout(game) {
        let counter = 0;
        game.performMove(this._move);
        while (!game.isOver(this._player)) {
            game.performRandomMove(this._player);
            this._player = game.togglePlayer(this._player);
            counter++;
        }
        const utility = 1; //game.getWinner();
        for (let i = 0; i < counter; i++) {
            game.undo();
        }
        return utility;
        /*
        const clone = this._move.clone();
        
        if (clone.game.isOver()) {
            const result = clone.game.getWinner();
    
            return result;
        }

        while (true) {
            clone.makeRandomMove();

            if (clone.game.isOver()) {
                const result = clone.game.getWinner();
        
                return result;
            }

            clone.togglePlayer();
        }
        */
    }
    /*=== Utility ===*/
    updateStats(utility) {
        this._visits++;
        this._wins += utility;
    }
    isLeaf() {
        return this.children.length === 0;
    }
    getMostVisitedChild() {
        let child = this.children.reduce((x, y) => {
            return (x.wins / x.visits || 0) > (y.wins / y.visits || 0) ? x : y;
        });
        return child;
    }
}
