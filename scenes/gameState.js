/**
 * This class holds all properties and functions of the game. 
 * One instance of this class is created for every game that is started. 
 */

class GameState {
    constructor() {
        /** 
         * myPlayer         Number of player who is running this client-side (0 - host, 1/2/3 - players)
         * numberOfPlayers  Number of players
         * playerEnums      Object of player names to match with number
         * players          Players of game
         * playerNames      Names of players
         * currentPlayer    Index of current player (initialized to 0 (PLAYER1))
         * stageNames       Names of videos of stage backgrounds
         */ 
        this.myPlayer;
        this.numberOfPlayers;
        this.playerEnums;
        this.players;
        this.playerNames = ["Player 1", "Player 2", "Player 3", "Player 4"];
        this.currentPlayer = 0;
        this.stageNames = ['ocean', 'hills', 'mountains', 'forest', 'reddesert'];
        
        /**
         * numberCorrect        Number of questions answered correctly in each player's current stage. 
         * numberAnswered       Number of questions answered in each player's current stage. 
         * currentStages        Each player's current stage number (1-12).
         * gameCode             Code of game.
         * finalStage           Final stage of the game.
         * playersFinished      Numbers of players that have finished the game.
         * currentWinnerIndex   Keeps track of which players to let play during tiebreaker phase
         * tiebreakerRounds     Keeps track of how many rounds have passed during tiebreaker phase
         * hasTied              Keeps track of whether the initial Tie scene has run
         */
        this.numberCorrect = [];
        this.numberAnswered = [];
        this.currentStages = [];
        this.gameCode;
        this.finalStage = 4;
        this.playersFinished = [];
        this.currentWinnerIndex = 99;
        this.tiebreakerRounds = 0;
        this.hasTied = false;

        /**
         * Win State:
         * 0 - no player has won
         * 1 - one player has won
         * 2+ - two or more players have finished
         */
        this.winState = 0;
    }

    resetGameState() {
        this.numberOfPlayers = undefined;
        this.numberOfPlayers = undefined;
        this.playerEnums = undefined;
        this.players = undefined;
        this.currentPlayer = 0;
        this.numberCorrect = [];
        this.numberAnswered = [];
        this.currentStages = [];
        this.gameCode = undefined;
        this.playersFinished = [];
        this.currentWinnerIndex = 99;
        this.tiebreakerRounds = 0;
        this.hasTied = false;
        this.winState = 0;
    }

    setMyPlayer(number) {
        this.myPlayer = number; 
    }

    // Retrieves the game code from the database and sets the gameCode property
    async setUpGameCode() {
        var code = await database.ref('promised-land-journey-game').child('gameCode').get();
        this.gameCode = code.val();
    }

    /**
     * Grabs the code entered by a player from the joined screen and sets the gameCode property
     * @param {String} code 
     */
    setUpGameCodeFromJoin(code){
        this.gameCode = code;
    }

    /**
     * Function:
     * Sets the numberOfPlayers property
     * Sets the numberCorrect, numberAnswered, & currentStages array properties
     * @param {*} numberOfPlayers 
     */
    setUpGameState(numberOfPlayers) {
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

    // Gets myPlayer property
    getMyPlayer() {
        return this.myPlayer;
    }

    // Gets game code property
    getGameCode() {
        return this.gameCode;
    }

    /**
     * Gets a player's name using the player's number
     * @param {Number} player 
     */
    getPlayerNames(player) {
        return this.playerNames[player];
    }

    // Gets the entire playerNames array property
    getPlayerNamesArray() {
        return this.playerNames;
    }

    // Gets the current player's number
    getCurrentPlayer() {
        return this.currentPlayer;
    }

    // Gets the players names
    getPlayers() {
        return this.players;
    }

    /**
     * Gets a player's stage using their number
     * @param {Number} playerNumber 
     */
    getStages(playerNumber) {
        return this.currentStages[playerNumber];
    }

    /**
     * Gets the number of questions a player has answered correctly based on their number
     * @param {Number} playerNumber 
     */
    getNumberCorrect(playerNumber) {
        return this.numberCorrect[playerNumber];
    }

    /**
     * Gets the number of questions a player has answered based on their number
     * @param {Number} playerNumber 
     */
    getNumberAnswered(playerNumber) {
        return this.numberAnswered[playerNumber];
    }

    /**
     * Gets the correct background name based on a player's stage
     * @param {Number} playerNumber 
     */
    getCurrentStageName(playerNumber) {
        var stageNumber = this.getStages(playerNumber);
        return this.stageNames[stageNumber];
    }

    // Gets the number of players
    getNumberOfPlayers() {
        return this.numberOfPlayers;
    }

    // Gets the winState property (number of players that have finished the stages)
    getWinState() {
        return this.winState;
    }

    // Gets the array that tells which players have finished the stages
    getPlayersFinished() {
        return this.playersFinished;
    }

    // Gets the number of the final stage
    getFinalStage(){
        return this.finalStage;
    }

    // Gets which players to let play during the tiebreaker rounds
    getCurrentWinnerIndex(){
        return this.currentWinnerIndex;
    }

    // Gets whether the initial tie scene has run
    getHasTied(){
        return this.hasTied;
    }

    // Gets the number of rounds that have passed during the tiebreaker rounds
    getTieBreakerRounds(){
        return this.tiebreakerRounds;
    }

    // Adds one to the number of rounds that have passed during the tiebreaker rounds
    addTieBreakerRound(){
        this.tiebreakerRounds++;
    }




    // Changes the current player based on whether the current player has finished the stages or not
    changeCurrentPlayer() {
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
        // Changes the turn in the database to the correct player
        var turnRef = database.ref('promised-land-journey-game').child(this.getGameCode()).child("turn");
        turnRef.set(this.currentPlayer);
        // Returns the number of the current player
        return this.currentPlayer;
    }

    // Changes the name of a player after they have entered it in the naming scene.
    async changePlayerName(player) {
        var promise = database.ref("promised-land-journey-game").child(this.getGameCode()).get("P"+(player+1));
        var name;
        await promise.then(
            function(snapshot) {
                var data = snapshot.val();
                name = data["P"+(player+1)];
            }, function(error){}
        )
        this.playerNames[player] = name;
    }

    // Sets whether the initial tie scene has run
    setHasTied(b) {
        this.hasTied = b;
    }

    // Resets the number of questions a player has answered correctly
    resetNumberCorrect(playerNumber) {
        this.numberCorrect[playerNumber] = 0;
    }

    // Adds one to the number of questions a player has answered correctly
    addNumberCorrect(playerNumber) {
        this.numberCorrect[playerNumber] += 1;
    }
    
    // Resets the number of questions a player has answered correctly
    resetNumberAnswered(playerNumber) {
        this.numberAnswered[playerNumber] = 0;
    }

    // Adds one to the number of questions a player has answered
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

    /**
     * Checks to see if the current stage has been reached yet.
     * Output: false if nobody has reached the current stage and true if somebody has
     */
    reachedCurrentStage() {
        for (let i = 0; i < this.numberOfPlayers; i++) {
            if (i == this.currentPlayer) {
                continue;
            } else if (i != this.currentPlayer && this.getStages(i) >= this.getStages(this.currentPlayer)) {
                    return true;
            }
        }
        return false;
    }


    
    /**
     * Checks to see if any player finished final stage
     * @param {boolean} correct 
     */
    checkForWin(correct) {
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
    }



    

}