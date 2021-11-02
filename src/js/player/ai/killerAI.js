import Event from "../../utility/event.js";
import Node from "./tree/node.js";

export default class KillerAI {
    constructor(playerNumber) {
        this.playerNumber = playerNumber;
        this.chooseMoveEvent = new Event();
    }

    chooseMove(game, iterations = 2) {
        const root = new Node();
        let counter = 0;
        
        root.state.game = game;
        root.state.playerNumber = this.playerNumber;
        root.state.untriedMoves = root.state.game.getEmptyCells();

        while (counter < iterations) {
            let node = this.select(root); // Selection.

            if (node.state.untriedMoves != [] 
                && !node.state.game.isOver()) {
                node = node.expand(); // Expansion.
            }

            let winner = node.rollout(); // Simulation.

            this.backpropogate(node, winner); // Backpropogation.

            counter++;
        }

        const winnerNode = root.getMostVisitedChild();

        console.log(winnerNode);

        this.chooseMoveEvent.trigger(winnerNode.state.game.lastMove);
    }

    select(node) {
        while (node.state.untriedMoves === []
               && node.chilren != []
               && !node.state.game.isOver()) {
            console.log(node);
            node = node.select(); // UCT.
        }

        return node;
    }

    backpropogate(node, winner) {
        let result = -1;
        while (node !== null) {
            if (winner === node.state.playerNumber) {
                result = 1;
            }
            else if (winner === -1) {
                result = 0;
            }

            node.updateStats(result);
            node = node.parent;
        }
    }

    /*
    chooseMove(game, iterations = 100) {
        const root = new Node();
        let counter = 0;
        
        root.state.game = game;
        root.state.playerNumber = this.playerNumber;

        while (counter < iterations) {
            // Phase 1 - Selection
            const promisingNode = this.selectPromisingNode(root);

            // Phase 2 - Expansion
            this.expandNode(promisingNode);

            // Phase 3 - Simulation
            if (promisingNode.children.length > 0) {
                promisingNode = promisingNode.getRandomChild();
            }

            const playoutResult = this.simulateRandomPlayout(promisingNode);

            // Phase 4 - Backpropogation
            this.backpropogate(promisingNode, playoutResult);

            counter++;
        }

        const winnerNode = root.getMostVisitedChild();

        console.log(winnerNode);

        this.chooseMoveEvent.trigger(winnerNode.state.game.lastMove);
    }

    selectPromisingNode(node) {
        while (node.children.length !== 0) {
            const tempNode = this.findBestNodeWithUCT(node);

            node = tempNode;
        }

        return node;
        
        /*
            while (true) {
            if (!node.children.length) {
                return node;
            }

            let unexplored = node.getUnvisitedChildren();

            if (unexplored) {
                return unexplored.at(-1);
            }

            node = this.findBestNodeWithUCT(node);
        }
    }

    expandNode(node) {
        if (node.children.length === 0) {
            const moves = node.state.getMoves();

            for (const move of moves) {
                node.children.push(new Node(move, node));
            }     
        }
    }

    backpropogate(nodeToExplore, playerNumber) {
        while (nodeToExplore !== null) {
            nodeToExplore.state.visits++;
             
            if (playerNumber === nodeToExplore.state.playerNumber) {
                nodeToExplore.state.wins++;
            }
            else if (playerNumber === nodeToExplore.state.getOpponentPlayerNumber()) {
                nodeToExplore.state.wins--;
            }

            nodeToExplore = nodeToExplore.parent;
        }
    }

    simulateRandomPlayout(node) {
        const original = node.state.game.clone();

        while (!node.state.game.isOver(node.state.playerNumber)) {
            node.state.togglePlayer();
            node.state.makeRandomMove();
        }

        const winner = node.state.game.getWinner();

        node.state.game = original;

        return winner;
    }
    
    findBestNodeWithUCT(node) {
        function uctValue(totalVisit, nodeWinScore, nodeVisit) {
            if (nodeVisit == 0) {
                return Number.MAX_VALUE;
            }
            return (nodeWinScore / nodeVisit) + 1.41 * Math.sqrt(Math.log(totalVisit) / nodeVisit);
        }

        var parentVisit = node.state.visits;
        var childUCT = [];
        
        node.children.forEach(function (child) {
            childUCT.push(uctValue(parentVisit, child.state.wins, child.state.visits));
        });

        var max = Math.max.apply(Math, childUCT);
        var idx = childUCT.indexOf(max);
        return idx < 0 ? null : node.children[idx];
    }
    */
}