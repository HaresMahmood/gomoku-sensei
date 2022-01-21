import Human from "../player/human.js";
import RandomAI from "../player/ai/randomAI.js";
import KillerAI from "../player/ai/killerAI.js";
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
            return new KillerAI(player);
        }
    }
}
