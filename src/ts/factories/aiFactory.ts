import Factory from "./factory.js";
import Player from "../player/player.js";
import Human from "../player/human.js";
import RandomAI from "../player/ai/randomAI.js";
import KillerAI from "../player/ai/killerAI.js";

export default class AIFactory implements Factory {
    // TODO: Change this method to return a `Player`-class instead.
    createItem(input: String, player: number): Player {
        console.log(input);
        //return input.replace(" ", "");

        if (input === "Human") {
            return new Human();
        }
        else if (input === "Easy AI") {
            return new RandomAI(player);
        }
        else if (input === "Killer AI") {
            return new KillerAI(player);
        }
    }
}