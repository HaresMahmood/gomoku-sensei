import GameModel from "../../../model/gameModel.js";
import Move from "../../../model/move.js";

export default class Node {
    private _move: Move;
    private _player: number;
    private _parent: Node;

    private children: Node[];
    private _wins: number;
    private _visits: number;

    constructor(move: Move, player: number, parent: Node, 
        children: Node[] = [], wins: number = 0, visits: number = 0) {
        this._move = move;
        this._player = player;
        this._parent = parent;

        this.children = children;
        this._wins = wins;
        this._visits = visits;
    }

    /*=== Accessors ===*/
    
    public get move() {
        return this._move;
    }

    public get parent() {
        return this._parent;
    }

    public get playerNumber() {
        return this._player;
    }

    public get wins() {
        return this._wins;
    }

    public get visits() {
        return this._visits;
    }

    /*=== Miscellaneous ===*/

    public select(playerNumber: number): Node {
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

    public expand(game: GameModel): Node {
        const moves: Move[] = game.getSuccessors(this._player);
        const nextPlayer = game.togglePlayer(this._player);

        for (const move of moves) {
            this.children.push(new Node(move, nextPlayer, this));
        }

        return this.children[0]; // || this;
    }

    public rollout(game: GameModel): number {
        let counter: number = 0;

        game.performMove(this._move);

        while (!game.isOver(this._player)) {
            game.performRandomMove(this._player);
            this._player = game.togglePlayer(this._player);

            counter++;
        }

        const utility: number = 1; //game.getWinner();

        for (let i: number = 0; i < counter; i++) {
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

    public updateStats(utility: number): void {
        this._visits++;
        this._wins += utility;
    }

    public isLeaf(): boolean {
        return this.children.length === 0;
    }
    
    public getMostVisitedChild(): Node {
        let child = this.children.reduce((x, y) => {
            return (x.wins / x.visits || 0) > (y.wins / y.visits || 0) ? x : y;
        });
    
        return child;
    }
}