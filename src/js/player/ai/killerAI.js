import Event from "../../utility/event.js";
import Tree from "./tree/tree.js";
import Node from "./tree/node.js";

export default class KillerAI {
    constructor(playerNumber) {
        this.playerNumber = playerNumber;
        this.chooseMoveEvent = new Event();
    }

    chooseMove(game, iterations = 100) {
        const tree = new Tree();
        let counter = 0;

        let opponentPlayerNumber = this.playerNumber === 1 ? 2 : 1;
        
        tree.root.state.game = game;
        tree.root.state.playerNumber = opponentPlayerNumber;

        while (counter < iterations) {
            // Phase 1 - Selection
            const promisingNode = this.selectPromisingNode(tree.root);

            // Phase 2 - Expansion
            if (!promisingNode.state.game.isOver()) {
                this.expandNode(promisingNode);
            }

            // Phase 3 - Simulation
            let nodeToExplore = promisingNode;
            
            if (promisingNode.children.length > 0) {
                nodeToExplore = promisingNode.getRandomChild();
            }

            const playoutResult = this.simulateRandomPlayout(nodeToExplore);

            console.log(playoutResult);

            // Phase 4 - Backpropogation
            this.backpropogate(nodeToExplore, playoutResult);

            counter++;
        }

        const winnerNode = tree.root.getMostVisitedChild();

        console.log(winnerNode);
        tree.root = winnerNode;

        this.chooseMoveEvent.trigger(winnerNode.state.game);
    }

    selectPromisingNode(node) {
        while (node.children.length !== 0) {
            const tempNode = this.findBestNodeWithUCT(node);

            node = tempNode;
        }

        return node;
    }

    expandNode(node) {
        const moves = node.state.getMoves();

        for (const move of moves) {
            node.children.push(new Node(move, node));
        }
    }

    backpropogate(nodeToExplore, playerNumber) {
        let tempNode = nodeToExplore || null;

        while (tempNode !== null) {
            tempNode.state.visits++;

            if (tempNode.state.playerNumber === playerNumber) {
                tempNode.state.wins++;
            }
            else {
                tempNode.state.wins--;
            }

            tempNode = tempNode.parent || null;
        }
    }

    simulateRandomPlayout(node) {
        const tempNode = node.clone();

        while (!tempNode.state.game.isOver()) {
            tempNode.state.togglePlayer();
            tempNode.state.makeRandomMove();
        }

        return tempNode.state.game.getWinner();
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
        
        // Find the UCT of each child of the Array
        node.children.forEach(function (child) {
            childUCT.push(uctValue(parentVisit, child.state.wins, child.state.visits));
        });
        // Find the highest UCT value and index of value
        var max = Math.max.apply(Math, childUCT);
        var idx = childUCT.indexOf(max);
        return idx < 0 ? null : node.children[idx];
    }
}