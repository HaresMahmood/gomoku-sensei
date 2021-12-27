import Event from "../../utility/event.js";
import Node from "./tree/node.js";
export default class SimulationAI {
    constructor(playerNumber) {
        this.player = playerNumber;
        this.chooseMoveEvent = new Event();
    }
    chooseMove(game, iterations = 3000) {
        const root = new Node(game, this.player, null);
        let counter = 0;
        root.expand();
        for (const child of root.children) {
            while (counter < iterations) {
                const result = child.rollout();
                let utility = -1;
                if (result === this.player) {
                    utility = 1;
                }
                else if (result === -1) {
                    utility = 0;
                }
                child.updateStats(utility);
                counter++;
            }
            counter = 0;
        }
        const winnerNode = root.getMostVisitedChild();
        console.log(root);
        this.chooseMoveEvent.trigger(winnerNode.game.lastMove);
    }
}
