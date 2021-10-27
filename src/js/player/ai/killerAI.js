export default class KillerAI {
    constructor() {
        this.rewards = new Map();
        this.visits = new Map();
        this.children = new Map();

        this.player = 0;
    }

    utility(state) {
        return state.player === player ? 1 : 0;
    }

    pickRandomSuccessor(state) {
        let moves = state.getPossibleMoves();

        if (moves.length) {
            let random = moves[Math.floor(Math.random() * moves.length)];

            return random;
        }

        return;
    }

    choose(state) {
        if (!this.children.has(state)) {
            return this.pickRandomSuccessor(state);
        }

        function score(n) {
            if (this.visits[n] === 0) return -Infinity;
            return this.rewards.get(n) / this.visits.get(n);
        }

        let max = this.children.get(state).sort(score).at(-1)
        console.log(max);

        return max;
    }

    select(state) {
        let path = [];

        while (true) {
            path.push(state);

            if (!this.children.has(state) || !this.children.get(state).length) {
                return path;
            }

            let unexplored = this.children.get(state).filter(x => !this.children.keys.includes(x));

            if (unexplored) {
                path.push(unexplored.pop());

                return path;
            }

            state = uct(state);
        }
    }

    uct(state) {
        function formula(n) {
            let multiplier = state.player !== this.player ? 1 : -1;
            let exploitation = (this.rewards.get(n) / this.visits.get(n)) * multiplier;
            let exploration = Math.sqrt(Math.log(visits.get(n) / visits.get(n)));

            return exploitation + exploration;
        }

        let max = this.children.get(state).sort(formula).at(-1)
        console.log(max);

        return max;
    }

    expand(state) {
        if (!this.children.has(state)) {
            this.children.set(state, state.getPossibleMoves());
        }
    }

    simulate(state) {
        let invert_reward = true;

        while (true) {
            if (state !== undefined) {
                if (state.isOver()) {
                    let reward = this.utility(state);

                    return invert_reward ? 1 - reward : reward;
                }

                state = this.pickRandomSuccessor(state);
                invert_reward = !invert_reward;
            }
        }
    }

    backpropogate(path, rewards) {
        for (let node in path.reversed()) {
            this.visits.get(node) += 1;
            this.rewards.get(node) += rewards;

            reward = 1 - rewards;
        }
    }

    monteCarloValue(state, cycles = 100) {
        let counter = 0;
        this.player = state.player;

        let path = this.select(state);
        let successor = path.at(-1);

        this.expand(successor);
        this.backpropogate(path, this.simulate(successor));

        /*
        while (counter < 5) {


            counter++;
        }
        */

        return this.choose(state);
    }
}