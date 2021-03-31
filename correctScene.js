/**
 * This class should be used to change the gameState and change the current question.
 * It will then open another trivia question for whoever is next in the game. 
 */

 class CorrectScene extends Phaser.Scene {
    constructor() {
        super("correct");
    }

    preload(){ 
    }

    create() {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        var responses = ["Awesome! ", "Great job! ", "Kudos! ", "Wonderful! "]
        var texts = responses[this.getRandomInt(4)] + "Correct answer!";
        var style = {fontFamily: 'balbeer', fontSize: "80px", align: "center", color: '#ffffff'}
        this.add.text(screenCenterX, screenCenterY, texts, style).setOrigin(.5);

        // Adds timer
        //this.timedEvent = this.time.addEvent({ delay: 1000, callbackScope: this, repeat: 3 });
        this.timedEvent = this.time.addEvent({ delay: 1000, callbackScope: this, repeat: 1 });
        this.timesUp = false;

        const currentPlayer = gameState.getCurrentPlayer();
        gameState.addNumberCorrect(currentPlayer);
        gameState.addNumberAnswered(currentPlayer);

        // Will change to true once player has completed this round
        this.threeCorrect = false;
        if (gameState.getNumberCorrect(currentPlayer)==3 && gameState.getWinState() <= 1) {
            if (currentPlayer == gameState.getNumberOfPlayers()-1) {
                gameState.checkForWin(true);
            }
            this.threeCorrect = true;
        }

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
        
        if (gameState.getWinState() > 1) {
            if (this.timedEvent.repeatCount == 0 && !this.timesUp) {
                this.openScene("nextPlayer");
                this.timesUp = true;
            }
        } else {
            if (this.timedEvent.repeatCount == 0 && !this.timesUp && !this.threeCorrect) {
                this.openScene("trivia");
                this.timesUp = true;
            }

            if (this.timedEvent.repeatCount == 0 && gameState.getNumberCorrect(gameState.getCurrentPlayer()) == 3 && !this.timesUp && this.threeCorrect) {
                this.openScene("newStage");
            }
        }
    }
}