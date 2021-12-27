import GameModel from "../../../model/gameModel.js";

export default class Node {
    private _game: GameModel;
    private _player: number;
    private _parent: Node;

    private _children: Node[];
    private _wins: number;
    private _visits: number;

    constructor(game: GameModel, player: number, parent: Node, 
        children: Node[] = [], wins: number = 0, visits: number = 0) {
        this._game = game;
        this._player = player;
        this._parent = parent;

        this._children = children;
        this._wins = wins;
        this._visits = visits;
    }

    /*=== Accessors ===*/
    
    public get game() {
        return this._game;
    }

    public get parent() {
        return this._parent;
    }

    public get player() {
        return this._player;
    }

    public get children() {
        return this._children;
    }

    public get wins() {
        return this._wins;
    }

    public get visits() {
        return this._visits;
    }

    /*=== Miscellaneous ===*/

    public select(playerNumber: number): Node {
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

    public expand(): Node {
        const successors: GameModel[] = this._game.getSuccessors(this._player);
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

    public rollout(): number {
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

    public updateStats(utility: number): void {
        this._visits++;
        this._wins += utility;
    }

    public isLeaf(): boolean {
        return this._children.length === 0;
    }

    public isTerminal(): boolean {
        return this._game.isOver(this._player);
    }

    public getUtility(): number {
        return this._game.getWinner(this._player);
    }
    
    public getMostVisitedChild(): Node {
        let child = this._children.reduce((x, y) => {
            return (x.wins / x.visits || 0) > (y.wins / y.visits || 0) ? x : y;
        });
    
        return child;
    }

    private togglePlayer(): number {
        return this._player === 1 ? 2 : 1;
    }
}