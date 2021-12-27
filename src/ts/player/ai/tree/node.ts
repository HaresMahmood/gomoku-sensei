import GameModel from "../../../model/gameModel.js";

export default class Node {
    private _game: GameModel;
    private _player: number;
    private _parent: Node;

    private children: Node[];
    private _wins: number;
    private _visits: number;

    constructor(game: GameModel, player: number, parent: Node, 
        children: Node[] = [], wins: number = 0, visits: number = 0) {
        this._game = game;
        this._player = player;
        this._parent = parent;

        this.children = children;
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

    public get wins() {
        return this._wins;
    }

    public get visits() {
        return this._visits;
    }

    /*=== Miscellaneous ===*/

    public select(playerNumber: number): Node {
        let selected = this.children[0];
        const isAIPlayer = selected.player !== playerNumber;
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

    public expand(): Node {
        const successors: GameModel[] = this._game.getSuccessors(this._player);
        const nextPlayer = this.togglePlayer();

        for (const successor of successors) {
            this.children.push(new Node(successor, nextPlayer, this));
        }

        return this.children[0]; // || this;
    }

    public rollout(): number {
        /*
        let counter: number = 0;
        const originalPlayer: number = this._player;

        console.log(game);

        /* 
            TODO: Current problem: node performs move on the game-state fed into 
            the ai at the start, even if the node is a few levels deep.
        

        while (!game.isOver(this._player)) {
            game.performRandomMove(this._player);
            this._player = game.togglePlayer(this._player);

            counter++;
        }

        const utility: number = 1; //game.getWinner();

        for (let i: number = 0; i < counter; i++) {
            game.undo();
        }

        this._player = originalPlayer;

        return utility;
        */

        const clone = this._game.clone();
        const originalPlayer = this._player;
        
        if (this._game.isOver(this._player)) {
            const result = clone.getWinner(this._player);
    
            return result;
        }

        while (true) {
            clone.performRandomMove(this._player);

            if (clone.isOver(this._player)) {
                const result = clone.getWinner(this._player);

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
        return this.children.length === 0;
    }

    public isTerminal(): boolean {
        return this._game.isOver(this._player);
    }

    public getUtility(): number {
        return this._game.getWinner(this._player);
    }
    
    public getMostVisitedChild(): Node {
        let child = this.children.reduce((x, y) => {
            return (x.wins / x.visits || 0) > (y.wins / y.visits || 0) ? x : y;
        });
    
        return child;
    }

    private togglePlayer(): number {
        return this._player === 1 ? 2 : 1;
    }
}