export default class Node {
    _game;
    _player;
    _parent;
    _children;
    _wins;
    _visits;
    constructor(game, player, parent, children = [], wins = 0, visits = 0) {
        this._game = game;
        this._player = player;
        this._parent = parent;
        this._children = children;
        this._wins = wins;
        this._visits = visits;
    }
    /*=== Accessors ===*/
    get game() {
        return this._game;
    }
    get parent() {
        return this._parent;
    }
    get player() {
        return this._player;
    }
    get children() {
        return this._children;
    }
    get wins() {
        return this._wins;
    }
    get visits() {
        return this._visits;
    }
    /*=== Miscellaneous ===*/
    select(playerNumber) {
        let selected = this._children[0];
        const isAIPlayer = selected.player !== playerNumber;
        let bestValue = isAIPlayer ? -Infinity : Infinity;
        for (const child of this._children) {
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
    expand() {
        const successors = this._game.getSuccessors(this._player);
        const nextPlayer = this.togglePlayer();
        for (const successor of successors) {
            this._children.push(new Node(successor, nextPlayer, this));
        }
        return this._children[0]; // || this;
    }
    /*
        getMoves() {
        let possibleMoves = [];
        let emptyPositions = this.game.getPossibleSuccessors(this.playerNumber);
        let opponentPlayerNumber = this.getOpponentPlayerNumber();

        for (const position of emptyPositions) {
            const child = new State(position, opponentPlayerNumber);

            possibleMoves.push(child);
        }

        return possibleMoves;
    }
    */
    rollout() {
        if (this.isTerminal()) {
            return this.getUtility();
        }
        const clone = this._game.clone();
        const originalPlayer = this._player;
        while (true) {
            clone.performRandomMove(this._player);
            if (clone.isOver(this._player)) {
                const result = clone.getWinner(this._player);
                //console.log(clone.toString(), result);
                this._player = originalPlayer;
                return result;
            }
            this._player = this.togglePlayer();
        }
    }
    /*=== Utility ===*/
    updateStats(utility) {
        this._visits++;
        this._wins += utility;
    }
    isLeaf() {
        return this._children.length === 0;
    }
    isTerminal() {
        return this._game.isOver(this._player);
    }
    getUtility() {
        return this._game.getWinner(this._player);
    }
    getMostVisitedChild() {
        let child = this._children.reduce((x, y) => {
            return (x.wins / x.visits || 0) > (y.wins / y.visits || 0) ? x : y;
        });
        return child;
    }
    togglePlayer() {
        return this._player === 1 ? 2 : 1;
    }
}
