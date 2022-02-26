import Player from "../player/player.js";
import Human from "../player/human.js";

import RandomAI from "../player/ai/randomAI.js";
import KillerAI from "../player/ai/killerAI.js";
import DynamicAI from "../player/ai/dynamicAI.js";

import StaticNode from "../player/ai/tree/staticNode.js";
import DynamicNode from "../player/ai/tree/dynamicNode.js";

export default interface Factory {
    createItem(input: String, player: number): any;
}

export default class AIFactory implements Factory {
    createItem(input: String, player: number): Player {
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