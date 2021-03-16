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
        this.correctImage = this.add.image(config.width/2, config.height/2, "correct");

        this.timedEvent = this.time.addEvent({ delay: 1000, callbackScope: this, repeat: 5 });
        this.timesUp = false;

        const currentPlayer = gameState.getCurrentPlayer();
        gameState.addNumberCorrect(currentPlayer);
        gameState.addNumberAnswered(currentPlayer);

    }

    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }

    

    update() {
        if (this.timedEvent.repeatCount == 0 && !this.timesUp) {
            this.openScene("trivia");
            this.timesUp = true;
        }

    }
}