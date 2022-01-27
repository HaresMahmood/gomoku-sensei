import Human from "../player/human.js";
import RandomAI from "../player/ai/randomAI.js";
import KillerAI from "../player/ai/killerAI.js";
import StaticNode from "../player/ai/tree/staticNode.js";
import DynamicNode from "../player/ai/tree/dynamicNode.js";
export default class AIFactory {
    // TODO: Change this method to return a `Player`-class instead.
    createItem(input, player) {
        //return input.replace(" ", "");
        if (input === "Human") {
            return new Human(player);
        }
        else if (input === "Easy AI") {
            return new RandomAI(player);
        }
        else if (input === "Killer AI") {
            return new KillerAI(player, new StaticNode());
        }
        else if (input === "Dynamic AI") {
            return new KillerAI(player, new DynamicNode());
        }
    }
}
