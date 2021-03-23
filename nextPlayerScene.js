class nextPlayerScene extends Phaser.Scene {
    constructor() {
        super("nextPlayer");
    }

    preload() {
    }

    create() {
        var currentPlayer = gameState.getCurrentPlayer();

        // Adds timer
        this.timedEvent = this.time.addEvent({ delay: 1000, callbackScope: this, repeat: 3 });
        this.timesUp = false;

        this.gameOver = false;
        if (gameState.getWinState() == 1) {
            this.gameOver = true;
            this.openScene('victory');
        } else if (gameState.getWinState() > 1) {
            // SEND TO TIEBREAKER
        } else {
            // Added text about it being the next player's turn and change current player 
            const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
            const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
            var style = {fontFamily: 'Arial', fontSize: "60px", align: "center", wordWrap: {width: 500, useAdvancedWrap: true}, color: '#ffffff'};
            this.add.text(screenCenterX, screenCenterY, "Player " + (currentPlayer+1) + "'s turn is over. Player " + (gameState.changeCurrentPlayer()+1) + " get ready!!", style).setOrigin(.5);
        
        }

        

    }

    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }



    update() {
        if (this.timedEvent.repeatCount == 0 && !this.timesUp && !this.gameOver) {
            this.openScene("trivia");
            this.timesUp = true;
        }
       

    }
}


