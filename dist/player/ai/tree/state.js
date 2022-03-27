/**
 * Aggregation of {@link AbstractNode}-related properties,
 * particularly those relating to their state. Contains logic
 * for changing these properties and provides wrapper-esque
 * access to the internal {@link MDP}-property methods.#
 */
export default class State {
    // #region Initialization
    _mdp;
    _player;
    _wins;
    _visits;
    // Specifically for Dynamic AI. 
    _gameLength;
    _isTerminal;
    /**
     * Class constructor.
     *
     * @param mdp MDP-representation of the game being played.
     * @param player Identifying number of the player the state represents.
     * @param wins Amount of wins for the mode.
     * @param visits Amount of visits to the node.
     * @param gameLength Total length of all games simulated from the node.
     * @param isTerminal Whether or not the node is terminal, or an end-game position.
     */
    constructor(mdp = null, player = 1, wins = 0, visits = 0, gameLength = 0, isTerminal = false) {
        this._mdp = mdp;
        this._player = player;
        this._wins = wins;
        this._visits = visits;
        this._gameLength = gameLength;
        this._isTerminal = isTerminal;
    }
    // #endregion
    // #region Properties
    /**
     * MDP-representation of the game being played.
     */
    get mdp() {
        return this._mdp;
    }
    /**
     * Identifying number of the player.
     */
    get player() {
        return this._player;
    }
    /**
     * Amount of wins for the mode.
     */
    get wins() {
        return this._wins;
    }
    /**
     * Amount of visits to the node.
     */
    get visits() {
        return this._visits;
    }
    /**
     * Total length of all games simulated from the node.
     */
    get gameLength() {
        return this._gameLength;
    }
    /**
     * Whether or not the node is terminal, or an end-game position.
     */
    get isTerminal() {
        return this._isTerminal;
    }
    /**
     * MDP-representation of the game being played.
     */
    set mdp(value) {
        this._mdp = value;
    }
    /**
     * Identifying number of the player.
     */
    set player(value) {
        this._player = value;
    }
    /**
     * Amount of wins for the mode.
     */
    set wins(value) {
        this._wins = value;
    }
    /**
     * Amount of visits to the node.
     */
    set visits(value) {
        this._visits = value;
    }
    /**
     * Total length of all games simulated from the node.
     */
    set gameLength(value) {
        this._gameLength = value;
    }
    /**
     * Whether or not the node is terminal, or an end-game position.
     */
    set isTerminal(value) {
        this._isTerminal = value;
    }
    // #endregion
    // #region Miscellaneous
    /**
     * Aggregates all possible transitions that can be made
     * from the current board position in a list.
     *
     * @returns
     */
    getTransitions() {
        let possibleMoves = [];
        let emptyPositions = this._mdp.getSuccessors(this._player);
        let opponentPlayerNumber = this.getOpponentPlayerNumber();
        for (const position of emptyPositions) {
            const child = new State(position, opponentPlayerNumber);
            possibleMoves.push(child);
        }
        return possibleMoves;
    }
    /**
     * Transitions from the current game state to a random one.
     */
    makeRandomTransition() {
        this._mdp.makeRandomTransition(this._player);
    }
    // #endregion
    // #region Utility 
    /**
     * Copies the current state values of the node.
     *
     * @returns A copy of the state values.
     */
    clone() {
        return new State(this._mdp.clone(), this._player, this._wins, this._visits);
    }
    /**
     * Identifies the player next in line to move.
     *
     * @returns
     */
    getOpponentPlayerNumber() {
        return this._player === 1 ? 2 : 1;
    }
    /**
     * Changes the player to the one next in line to move.
     */
    togglePlayer() {
        this._player = this.getOpponentPlayerNumber();
    }
}
