class newStageScene extends Phaser.Scene {
    constructor() {
        super("newStage");
    }

    preload() {
    }

    create() {
        var currentPlayer = gameState.getCurrentPlayer();

        // Adds timer
        this.timedEvent = this.time.addEvent({ delay: 1000, callbackScope: this, repeat: 3 });
        this.timesUp = false;

        // Advance currentPlayer's stage (resets numberCorrect & numberAnswered counters)
        gameState.advanceStage(currentPlayer);

        this.storyLine = gameState.reachedCurrentStage();

        var nextStage = gameState.getStages(currentPlayer);
        var texts = gameState.getPlayerNames(currentPlayer) + " has moved on to Stage " + (nextStage+1) + "!! " + gameState.getPlayerNames(gameState.changeCurrentPlayer()) + " get ready!!";
        if (gameState.getStages(currentPlayer) == gameState.getFinalStage()) {
            texts = gameState.getPlayerNames(currentPlayer) + " has finished the final stage!!";
        }


        
        // Checks for win
        this.gameOver = false;
        if (gameState.getWinState() == 1) {
            this.gameOver = true;
            this.openScene('victory');
        } else if (gameState.getWinState() > 1) {
            this.gameOver = true;
            this.openScene('tie');
        }else {
            // Added text about player moving onto next stage and change current player
            const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
            const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
            var style = {fontFamily: 'balbeer', fontSize: "80px", align: "center", wordWrap: {width: 950, useAdvancedWrap: true}, color: 'black'};
            
            this.add.text(screenCenterX, screenCenterY, texts, style).setOrigin(.5);
        }
        
    
        

    }

    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }



    update() {
        if (this.timedEvent.repeatCount == 0 && !this.timesUp && !this.gameOver && !this.storyLine) {
            this.openScene("storyline");
            this.timesUp = true;
        } else if (this.timedEvent.repeatCount == 0 && !this.timesUp && !this.gameOver && this.storyLine) {
            this.openScene("trivia")
            this.timesUp = true;
        }
       

    }
}


