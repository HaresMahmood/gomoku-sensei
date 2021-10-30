import Event from "../../utility/event.js";
import Node from "./node.js";

export default class KillerAI {
    constructor(player) {
        this.player = player;
        this.chooseMoveEvent = new Event();
    }  

    chooseMove(game, iterations = 5000) {
        let root = new Node(game);

        for (let i = 0; i < iterations; i++) {
            //let path = this.select(root);
            let node = this.select(root);

            node.expand();

            let result = this.simulate(node);
            
            this.backpropogate(node, result);
        }

        let bestNode = root.getMostVisitedChild();

        console.log(bestNode);

        this.chooseMoveEvent.trigger(bestNode.game);			
        return bestNode;
    }

    /*
    select(node) {
        let path = [];

        while (true) {
            path.push(node);

            if (!node.isFullyExpanded()) {
                return path;
            }

            let unexplored = node.getUnvisistedChildren();

            if (unexplored) {
                path.push(unexplored.pop());

                return path;
            }

            node = uct(node, Math.sqrt(2));
        }
    }
    */

    select(node) {
        while (node.isFullyExpanded()) {
            node = this.uct(node, Math.sqrt(2)); // ~1.41
        }

        return node.getUnvisistedChildren()[0] || node;
    }

    /*
    backpropogate(path, reward) {
        path = path.reverse();
        for (let i = 0; i < path.length; i++) {
            let node = path[i];

            node.visits++;
            node.wins += reward;

            reward = 1 - reward;
        }
    }
    */
    
    backpropogate(node, result) {
        let tempNode = node;

        while (tempNode !== null) {
            tempNode.visits++;

            if (result !== -1) {
                if (tempNode.game.player === result) {
                    tempNode.wins++;
                }
                else {
                    tempNode.wins--;
                }
            }

            tempNode = tempNode.parent;
        }
    }

    /*
    simulate(node) {
        let invert_reward = true;

        while (true) {
            if (node.game.isOver()) {
                let reward = this.utility(node);

                return invert_reward ? 1 - reward : reward;
            }

            node.game.performRandomMove();
            invert_reward = !invert_reward;
        }
    }
    */

    simulate(node) {
        while (!node.game.isOver()) {
            node.game.performRandomMove();
        }

        return node.game.getWinner();
    }
    // UCB value
    uct(node, c) {
        function calculateValue(totalVisits, nodeWinScore, nodeVisits) {
            return (nodeWinScore / nodeVisits) + c * Math.sqrt(Math.log(totalVisits / nodeVisits));
        }

        let maxUCB = Number.MIN_VALUE;
        let bestNode = null;
        
        for (let i = 0; i < node.children.length; i++) {
            let ucb = calculateValue(node.visits, node.children[i].wins, node.children[i].visits);

            if (ucb > maxUCB) {
                maxUCB = ucb;
                bestNode = node.children[i];
            }
        }

        return bestNode;
    }

    utility(node) {
        return node.game.player === this.player ? 1 : 0;
    }
}