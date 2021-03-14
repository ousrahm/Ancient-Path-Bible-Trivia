class GameState {
    constructor(numberOfPlayers) {
        
        // super('gameState')
        if(numberOfPlayers < 2) {
            throw "numberOfPlayers argument is < 2."
        } else if (numberOfPlayers > 4) { 
            throw "numberOfPlayers argument is > 4."
        } else if (typeof numberOfPlayers != "number"){
            throw "numberOfPlayers argument is not a Number."
        }
        this.numberOfPlayers = numberOfPlayers;
        this.players = [];
        this.playerEnums = {PLAYER1:"Player1", PLAYER2:"Player2", PLAYER3:"Player3", PLAYER4:"Player4"};
        // Adds player enums to players array depending on number
        for (let i = 1; i <= numberOfPlayers; i++) {
            this.players.push(this.playerEnums["PLAYER" + i]);
        } 
        this.numberCorrect = new Array(numberOfPlayers);
        this.numberAnswered = new Array(numberOfPlayers);
        this.currentStage = new Array(numberOfPlayers);
        for (let i = 0; i < numberOfPlayers; i++) {
            this.numberCorrect.push(0);
            this.numberAnswered.push(0);
            this.currentStage.push(0);
        }
    }

    getPlayers

    

}