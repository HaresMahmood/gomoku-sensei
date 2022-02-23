import Human from "../player/human.js";
import RandomAI from "../player/ai/randomAI.js";
import KillerAI from "../player/ai/killerAI.js";
import DynamicAI from "../player/ai/dynamicAI.js";
export default class AIFactory {
    createItem(input, player) {
        //return input.replace(" ", "");
        if (input === "Human") {
            return new Human(player);
        }
        else if (input === "First AI Player") {
            return new RandomAI(player);
        }
        else if (input === "Second AI Player") {
            return new KillerAI(player);
        }
        else if (input === "Third AI Player") {
            return new DynamicAI(player);
        }
    }
}
