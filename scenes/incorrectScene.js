/**
 * This class is used to change the gameState and change the current question.
 * It will then open another trivia question for whoever is next in the game. 
 */

 class IncorrectScene extends Phaser.Scene {
    constructor() {
        super("incorrect");
    }

    preload(){ 
    }

    async create() {
        // If the current player has finished the stages, check for a win
        if (gameState.getWinState() > 1) {
            if (gameState.getCurrentPlayer() == gameState.getPlayersFinished()[gameState.getWinState()-1]) {
                gameState.checkForWin(false);
            }
        // If the current player is the last player, check for a win
        } else if (gameState.getCurrentPlayer() == gameState.getNumberOfPlayers()-1) {
            gameState.checkForWin(false);
        } 

        // Creates constants for the middle of the x and y axes of the scene
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // Prints a message to the scene
        var responses = ["Nice try! ", "Sorry! ", "Bummer! ", "Not this time! "]
        var texts = responses[this.getRandomInt(4)] + "Incorrect answer.";
        var style = {fontFamily: 'balbeer', fontSize: "70px", align: "center", color: '#ffffff'}
        this.add.text(screenCenterX, screenCenterY, texts, style).setOrigin(.5);

        // Creates timer
        this.timedEvent = this.time.addEvent({ delay: 1000, callbackScope: this, repeat: 1 });
        this.timesUp = false;

        // Adds one to numberAnswered array of current player
        const currentPlayer = gameState.getCurrentPlayer();
        gameState.addNumberAnswered(currentPlayer);

        // Sets retrievedQuestion in database to false
        if (gameState.getMyPlayer() === 0) {
           await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child('retrievedQuestion').set(false);
        }
    }

    /**
     * Starts the scene of the specified name.
     * @param {String} nameOfScene 
     */
    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }

    /**
     * getRandomInt(max):
     * @param {Number} max 
     * @returns a random number from 0 to (max - 1);
     */
     getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    update() {
        // Once the timer is up, open nextPlayerScene
        if (this.timedEvent.repeatCount == 0 && !this.timesUp) {
            this.openScene("nextPlayer");
            this.timesUp = true;
        }

    }
}