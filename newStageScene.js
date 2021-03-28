class newStageScene extends Phaser.Scene {
    constructor() {
        super("newStage");
    }

    preload() {
    }

    create() {
        var currentPlayer = gameState.getCurrentPlayer();

        // Adds timer
        this.timedEvent = this.time.addEvent({ delay: 1000, callbackScope: this, repeat: 1 });
        this.timesUp = false;

        // Advance currentPlayer's stage (resets numberCorrect & numberAnswered counters)
        gameState.advanceStage(currentPlayer);

        this.storyLine = gameState.reachedCurrentStage();

        var nextStage = gameState.getStages(currentPlayer);
        var texts = "Player " + (currentPlayer+1) + " has moved on to Stage " + (nextStage+1) + "!! Player " + (gameState.changeCurrentPlayer()+1) + " get ready!!";
        if (gameState.getStages(currentPlayer) == gameState.getFinalStage()) {
            texts = "Player " + (currentPlayer+1) + " has finished the final stage!!";
        }


        
        // Checks for win
        this.gameOver = false;
        if (gameState.getWinState() == 1) {
            this.gameOver = true;
            this.openScene('victory');
        } else if (gameState.getWinState() > 1) {
            this.gameOver = true;
            // SEND TO TIEBREAKER SCENE
        }else {
            // Added text about player moving onto next stage and change current player
            const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
            const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
            var style = {fontFamily: 'Arial', fontSize: "60px", align: "center", wordWrap: {width: 500, useAdvancedWrap: true}, color: '#ffffff'};
            
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


