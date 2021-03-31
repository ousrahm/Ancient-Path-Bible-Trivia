class GameState {
    constructor() {

        this.numberOfPlayers;
        this.playerEnums;
        this.players;

        /**Index of current player (initialized to 0 (PLAYER1)) */
        this.currentPlayer = 0;

        this.stageNames = ["desertLoop", "autumnLoop", "rainbowLoop", "summerLoop", "finaleLoop"];
        
        /**
         * numberCorrect    The number of questions answered correctly in each player's current stage. 
         * numberAnswered   The number of questions answered in each player's current stage. 
         * currentStages    Each player's current stage number (1-12).
         */
        this.numberCorrect = [];
        this.numberAnswered = [];
        this.currentStages = [];

        /**
         * Final Stage
         */
        this.finalStage = 4;

        /**
         * Players that have finished the final stage
         */
         this.playersFinished = [];

        /**
         * Win State:
         * 0 - no player has won
         * 1 - one player has won
         * 2+ - two or more players have finished
         */
        this.winState = 0;

        /**
         * Keeps track of which players to let play during tiebreaker phase
         */
         this.currentWinnerIndex = 99;

         /**
          * Keeps track of how many rounds have passed during tiebreaker phase
          */
         this.tiebreakerRounds = 0;
 
         /**
          * Keeps track of whether the initial Tie scene has run
          */
         this.hasTied = false;
    }

    setUpGameState(numberOfPlayers) {
        /** Commented this out for testing purposes for one player */
        // if(numberOfPlayers < 2) {
        //     throw "numberOfPlayers argument is < 2."
        // } else 
        // if (numberOfPlayers > 4) { 
        //     throw "numberOfPlayers argument is > 4."
        // } else if (typeof numberOfPlayers != "number"){
        //     throw "numberOfPlayers argument is not a Number."
        // }  
        /**Player's enumeration equals their respective index in the other property arrays. */
        this.numberOfPlayers = numberOfPlayers;
        this.playerEnums = {PLAYER1:0, PLAYER2:1, PLAYER3:2, PLAYER4:3};
        this.players = [];
        for (let i = 1; i <= numberOfPlayers; i++) {
            this.players.push(this.playerEnums["PLAYER" + i]);
        } 

        /** Add correct number of slots to arrays. */
        for (let i = 0; i < numberOfPlayers; i++) {
            this.numberCorrect.push(0);
            this.numberAnswered.push(0);
            this.currentStages.push(0);
        }

    }

    /**
     * Getters for current player, player numbers, stage numbers, number of questions correct,
     * number of players, players finished, win state, & number of questions answered.
     */
    getCurrentPlayer() {
        return this.currentPlayer;
    }

    // setCurrentPlayer(p) {
    //     this.currentPlayer = p;
    // }

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

    getCurrentStageName(playerNumber) {
        var stageNumber = this.getStages(playerNumber);
        return this.stageNames[stageNumber];
    }

    getNumberOfPlayers() {
        return this.numberOfPlayers;
    }

    getWinState() {
        return this.winState;
    }

    getPlayersFinished() {
        return this.playersFinished;
    }

    getFinalStage(){
        return this.finalStage;
    }

    getCurrentWinnerIndex(){
        return this.currentWinnerIndex;
    }

    getTieBreakerRounds(){
        return this.tiebreakerRounds;
    }

    addTieBreakerRound(){
        this.tiebreakerRounds++;
    }

    getHasTied(){
        return this.hasTied;
    }

    setHasTied(b) {
        this.hasTied = b;
    }


    /**
     * Methods to change current player, reset number correct for a player, 
     * to increase number correct for a player, to reset number answered for a player, 
     * to increase number answered for a player, & to advance stage number for a player.
     * @param {Number} playerNumber 
     */
    changeCurrentPlayer() {
        console.log("Changing current player!")
        console.log(this.currentPlayer);
        console.log("~>");
        if (this.getWinState() > 1) {
            if (this.currentWinnerIndex >= this.getWinState()-1 ) {
                this.currentWinnerIndex = 0;
            } else {
                this.currentWinnerIndex += 1;
            }
            this.currentPlayer = this.getPlayersFinished()[this.currentWinnerIndex];
        } else {
            if (this.currentPlayer == this.numberOfPlayers-1 ) {
                this.currentPlayer = 0;
            } else {
                this.currentPlayer += 1;
            }
        }
        console.log(this.currentPlayer);
        return this.currentPlayer;
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

    /**
     * Advances player's stage by one.
     * When this is called, reset number answered and number correct as well.
     * @param {Number} playerNumber 
     */
    advanceStage(playerNumber) {
        this.currentStages[playerNumber] += 1;
        this.resetNumberCorrect(playerNumber);
        this.resetNumberAnswered(playerNumber);
    }

    // placeInTiebreakerStage(){
    //     for (let i = 0; i < this.getWinState; i++) {
    //         this.currentStages[this.playersFinished[i]] = this.getFinalStage();
    //     }
    // }

    /**
     * Checks to see if the current stage has been reached yet.
     * Output: false if nobody has reached the current stage and true if somebody has
     */
    reachedCurrentStage() {
        for (let i = 0; i < this.numberOfPlayers; i++) {
            if (i == this.currentPlayer) {
                continue;
            } else if (i != this.currentPlayer && this.getStages(i) >= this.getStages(this.currentPlayer)) {
                    //console.log("returning true")
                    return true;
            }
        }
        //console.log("returning false")
        return false;
    }


    
    /**
     * Checks to see if any player finished final stage
     * @param {boolean} correct 
     */
    checkForWin(correct) {
        console.log("Checking for win");
        if (this.getHasTied()) {
            var num = this.getNumberCorrect(this.getPlayersFinished()[0]);
            for (let i = 1; i < this.getPlayersFinished().length; i++) {
                if (num > this.getNumberCorrect(this.getPlayersFinished()[i])) {
                    this.playersFinished.splice(i, 1);
                    i--;
                } else if (num < this.getNumberCorrect(this.getPlayersFinished()[i])) {
                    num = this.getNumberCorrect(this.getPlayersFinished()[i]);
                    this.playersFinished.splice(0, 1);
                    i--;
                } else {
                    this.addTieBreakerRound();
                }
            }
        } else {

            for (let i = 0; i < this.getNumberOfPlayers(); i++) {
                if (i == this.getNumberOfPlayers()-1) {
                    if (correct) {
                        if (this.getStages(i) == this.finalStage-1 && this.getNumberCorrect(i) == 3) {
                            this.playersFinished.push(i);
                            this.advanceStage(i);
                        }
                    }
                } else if (this.getStages(i) == this.finalStage) {
                    this.playersFinished.push(i);
                }
            }
        }
        this.winState = this.playersFinished.length;
        console.log("Win State: " + this.winState);

    }



    

}