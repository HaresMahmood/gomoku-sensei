import Event from "../../utility/event.js";
import Node from "./tree/node.js";

export default class KillerAI {
    constructor(playerNumber) {
        this.playerNumber = playerNumber;
        this.chooseMoveEvent = new Event();
    }

    chooseMove(game, interval = 3000) {
        const root = new Node();
        const startTime = Date.now();
        let counter = 0;
        
        root.state.game = game;
        root.state.playerNumber = this.playerNumber;
        root.expand();

        /*
        // Timer.
        setTimeout(function() { 
            flag = false 
        }, 3000);
        */

        while((Date.now() - startTime) < interval) {
            let current = this.select(root); // Selection.
            let result;

            if (current.state.game.isOver()) {
                result = current.state.game.getWinner();
            }
            else {
                if (current.state.visits > 0) {
                    current = current.expand(); // Expansion.
                }

                result = current.rollout(); // Simulation.
            }

            this.backpropogate(current, result); // Backpropogation.

            counter++;
        }

        const winnerNode = root.getMostVisitedChild();

        console.log(counter);
        console.log(root);
        console.log(winnerNode);

        this.chooseMoveEvent.trigger(winnerNode.state.game.lastMove);
    }

    select(node) {
        while (!node.isLeaf()) { // && !node.state.game.isOver()
            node = node.select(this.playerNumber); // UCT.
        }

        return node;
    }

    backpropogate(node, result) {
        let utility = -1;

        if (result === this.playerNumber) {
            utility = 1;
        }
        else if (result === -1) {
            utility = 0;
        }

        while (node !== null) {
            node.updateStats(utility);
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