import DefaultPlayerFactory from "../dist/factory/playerFactory.js";
import Human from "../dist/player/human.js";
import RandomAI from "../dist/player/ai/randomAI.js";
import KillerAI from "../dist/player/ai/killerAI.js";
import DynamicAI from "../dist/player/ai/dynamicAI.js";

import { expect } from "chai";

let factory;

describe("Player Factory", () => {
    before( () => {
        factory = new DefaultPlayerFactory();
    });

    it("Should create a player of type Human with player ID 1", () => {
        const human = factory.createPlayer("human", 1);

        expect(human).to.be.instanceOf(Human);       
        expect(human._player).to.equal(1);
    });

    it("Should create a player of type RandomAI with player ID 1", () => {
        const easy = factory.createPlayer("easy", 1);

        expect(easy).to.be.instanceOf(RandomAI);
        expect(easy._player).to.equal(1);
    });

    it("Should create a player of type KillerAI with player ID 2", () => {
        const killer = factory.createPlayer("killer", 2);
        
        expect(killer).to.be.instanceOf(KillerAI);
        expect(killer._player).to.equal(2);
    });
    
    it("Should create a player of type DynamicAI with player ID 2", () => {
        const dynamic = factory.createPlayer("dynamic", 2);

        expect(dynamic).to.be.instanceOf(DynamicAI);
        expect(dynamic._player).to.equal(2);
    });
}); 