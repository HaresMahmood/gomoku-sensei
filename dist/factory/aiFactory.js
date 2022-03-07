// #region Imports
import Human from "../player/human.js";
import RandomAI from "../player/ai/randomAI.js";
import KillerAI from "../player/ai/killerAI.js";
import DynamicAI from "../player/ai/dynamicAI.js";
export default class AIFactory {
    createItem(input, player) {
        //return input.replace(" ", "");
        if (input === "human") {
            return new Human(player);
        }
        else if (input === "easy") {
            return new RandomAI(player);
        }
        else if (input === "killer") {
            return new KillerAI(player);
        }
        else if (input === "dynamic") {
            return new DynamicAI(player);
        }
    }
}
