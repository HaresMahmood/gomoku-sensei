// #region Imports

import Player from "../player/player.js";
import Human from "../player/human.js";

import RandomAI from "../player/ai/randomAI.js";
import KillerAI from "../player/ai/killerAI.js";
import DynamicAI from "../player/ai/dynamicAI.js";

import StaticNode from "../player/ai/tree/staticNode.js";
import DynamicNode from "../player/ai/tree/dynamicNode.js";

// #endregion

/**
 * Generic interface representing the Factory 
 * Method Design Pattern, specifically with regards
 * to the creation of players. Delagates logic of 
 * the Factory method to concrete implementation.
 */
export default interface PlayerFactory {
    /**
     * Player-creation Factory method. The specific
     * player created depends on meta-data from 
     * `select`-components on the `Home`-page.
     * 
     * @param input Meta-data of the `select`-component.
     * @param player The relavant player's number.
     * @returns Specific concretion of `Player` object.
     */
    createPlayer(input: String, player: number): Player;
}

export default class DefaultPlayerFactory implements PlayerFactory {
    // Inherited docs.
    createPlayer(input: String, player: number): Player {
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