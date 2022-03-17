import DefaultPlayerFactory from "../dist/factory/playerFactory.js";
import Human from "../dist/player/human.js";
import RandomAI from "../dist/player/ai/randomAI.js";
import KillerAI from "../dist/player/ai/killerAI.js";
import DynamicAI from "../dist/player/ai/dynamicAI.js";

import { expect } from "chai";

let factory;

describe("Controller", () => {
    before( () => {
        factory = new DefaultPlayerFactory();
    });

    it("Should create the player of the correct type", () => {
        const human = factory.createPlayer("human", 1);
        const easy = factory.createPlayer("easy", 1);
        const killer = factory.createPlayer("killer", 1);
        const dynamic = factory.createPlayer("dynamic", 1);

        expect(human).to.be.instanceOf(Human);
        expect(easy).to.be.instanceOf(RandomAI);
        expect(killer).to.be.instanceOf(KillerAI);
        expect(dynamic).to.be.instanceOf(DynamicAI);
    });
}); 