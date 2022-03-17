import DefaultPlayerFactory from "../src/ts/factory/playerFactory";
import Human from "../src/ts/player/human";
import RandomAI from "../src/ts/player/ai/randomAI";
import KillerAI from "../src/ts/player/ai/killerAI";
import DynamicAI from "../src/ts/player/ai/dynamicAI";

import { expect } from "chai";

let factory: DefaultPlayerFactory;

describe("Controller", () => {
    before( () => {
        // factory = new DefaultPlayerFactory();
    });

    it("Should create the player of the correct type", () => {
        // const human = factory.createPlayer("human", 1);
        // const easy = factory.createPlayer("easy", 1);
        // const killer = factory.createPlayer("killer", 2);
        // const dynamic = factory.createPlayer("dynanmic", 2);

        // expect(human).to.be.a("player");
    });
});