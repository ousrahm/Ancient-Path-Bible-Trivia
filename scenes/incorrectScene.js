/**
 * This class should be used to change the gameState and change the current question.
 * It will then open another trivia question for whoever is next in the game. 
 */

 class IncorrectScene extends Phaser.Scene {
    constructor() {
        super("incorrect");
    }

    preload(){ 
    }

    async create() {
         // Sets retrievedQuestion in database to false
         await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child('retrievedQuestion').set(false);

        if (gameState.getWinState() > 1) {
            if (gameState.getCurrentPlayer() == gameState.getPlayersFinished()[gameState.getWinState()-1]) {
                gameState.checkForWin(false);
            }

        } else if (gameState.getCurrentPlayer() == gameState.getNumberOfPlayers()-1) {
            gameState.checkForWin(false);
        } 

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        var responses = ["Nice try! ", "Sorry! ", "Bummer! ", "Not this time! "]
        var texts = responses[this.getRandomInt(4)] + "Incorrect answer.";
        var style = {fontFamily: 'balbeer', fontSize: "70px", align: "center", color: '#ffffff'}
        this.add.text(screenCenterX, screenCenterY, texts, style).setOrigin(.5);

        // Adds timer
        //this.timedEvent = this.time.addEvent({ delay: 1000, callbackScope: this, repeat: 3 });
        this.timedEvent = this.time.addEvent({ delay: 1000, callbackScope: this, repeat: 1 });
        this.timesUp = false;

        // Adds one to number answered array of current player
        const currentPlayer = gameState.getCurrentPlayer();
        gameState.addNumberAnswered(currentPlayer);


    }

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
        if (this.timedEvent.repeatCount == 0 && !this.timesUp) {
            this.openScene("nextPlayer");
            this.timesUp = true;
        }

    }
}