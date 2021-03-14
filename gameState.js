class GameState {
    constructor(numberOfPlayers) {
        
        if(numberOfPlayers < 2) {
            throw "numberOfPlayers argument is < 2."
        } else if (numberOfPlayers > 4) { 
            throw "numberOfPlayers argument is > 4."
        } else if (typeof numberOfPlayers != "number"){
            throw "numberOfPlayers argument is not a Number."
        }

        /**Index of current player (initialized to 0 (PLAYER1)) */
        this.currentPlayer = 0;

        /**Player's enumeration equals their respective index in the other property arrays. */
        this.numberOfPlayers = numberOfPlayers;
        this.playerEnums = {PLAYER1:0, PLAYER2:1, PLAYER3:2, PLAYER4:3};
        this.players = [];
        for (let i = 1; i <= numberOfPlayers; i++) {
            this.players.push(this.playerEnums["PLAYER" + i]);
        } 
        

        /**
         * numberCorrect    The number of questions answered correctly in each player's current stage. 
         * numberAnswered   The number of questions answered in each player's current stage. 
         * currentStages    Each player's current stage number (1-12).
         */
        this.numberCorrect = [];
        this.numberAnswered = [];
        this.currentStages = [];
        for (let i = 0; i < numberOfPlayers; i++) {
            this.numberCorrect.push(0);
            this.numberAnswered.push(0);
            this.currentStages.push(0);
        }
    }

    /**
     * Getters for current player, player numbers, stage numbers, number of questions correct, 
     * & number of questions answered.
     */
    getCurrentPlayer() {
        return this.currentPlayer;
    }

    getPlayers() {
        return this.players;
    }

    getStages(playerNumber) {
        return this.currentStages[playerNumber];
    }

    getNumberCorrect(playerNumber) {
        return this.numberCorrect[playerNumber];
    }

    getNumberAnswered(playerNumber) {
        return this.numberAnswered[playerNumber];
    }

    /**
     * Methods to change current player, reset number correct for a player, 
     * to increase number correct for a player, to reset number answered for a player, 
     * to increase number answered for a player, & to advance stage number for a player.
     * @param {*} playerNumber 
     */
    changeCurrentPlayer() {
        if (this.currentPlayer == this.numberOfPlayers-1 ) {
            this.currentPlayer = 0;
        } else {
            this.currentPlayer += 1;
        }
    }

    resetNumberCorrect(playerNumber) {
        this.numberCorrect[playerNumber] = 0;
    }

    addNumberCorrect(playerNumber) {
        this.numberCorrect[playerNumber] += 1;
    }

    resetNumberAnswered(playerNumber) {
        this.numberAnswered[playerNumber] = 0;
    }

    addNumberAnswered(playerNumber) {
        this.numberAnswered[playerNumber] += 1;
    }

    advanceStage(playerNumber) {
        this.currentStages[playerNumber] += 1;
    }



    

}