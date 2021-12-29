import Event from "../../../utility/event.js";
import Node from "../tree/node.js";

export default class SimulationAI {
    constructor(playerNumber) {
        this.playerNumber = playerNumber;
        this.chooseMoveEvent = new Event();
    }

    chooseMove(game, iterations = 1000) {
        const root = new Node();
        let counter = 0;
        
        root.state.game = game;
        root.state.playerNumber = this.playerNumber;
        root.expand();

        for (const child of root.children) {
            while (counter < iterations) {
                const result = child.rollout();
                let utility = -1;

                if (result === this.playerNumber) {
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

        this.chooseMoveEvent.trigger(winnerNode.state.game.lastMove);
    }
}