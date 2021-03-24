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

        // Adds image of check
        this.correctImage = this.add.image(config.width/2, config.height/2, "correct").setScale(.8);

        // Adds timer
        this.timedEvent = this.time.addEvent({ delay: 1000, callbackScope: this, repeat: 1 });
        this.timesUp = false;

        const currentPlayer = gameState.getCurrentPlayer();
        gameState.addNumberCorrect(currentPlayer);
        gameState.addNumberAnswered(currentPlayer);

        // Will change to true once player has completed this round
        this.threeCorrect = false;
        if (gameState.getNumberCorrect(currentPlayer)==3) {
            if (currentPlayer == gameState.getNumberOfPlayers()-1) {
                gameState.checkForWin(true);
            }
            this.threeCorrect = true;
        }

    }

    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }

    

    update() {
        if (this.timedEvent.repeatCount == 0 && !this.timesUp && !this.threeCorrect) {
            this.openScene("trivia");
            this.timesUp = true;
        }

        if (this.timedEvent.repeatCount == 0 && gameState.getNumberCorrect(gameState.getCurrentPlayer()) == 3 && !this.timesUp && this.threeCorrect) {
            this.openScene("newStage");
        }
    }
}