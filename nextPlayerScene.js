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

        if (gameState.getHasTied() && currentPlayer == gameState.getPlayersFinished()[gameState.getPlayersFinished().length - 1]) {
            gameState.checkForWin(true);
            //TODO: Replace with 10 after testing
            if (gameState.getTieBreakerRounds() > 3) {
                this.openScene('trueTie');
            }
        }

        this.gameOver = false;
        if (gameState.getWinState() == 1) {
            this.gameOver = true;
            this.openScene('victory');
        } else if (gameState.getWinState() > 1 && !gameState.getHasTied()) {
            gameState.changeCurrentPlayer();
            this.gameOver = true;
            this.openScene('tie');
        } else {
            // Added text about it being the next player's turn and change current player 
            const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
            const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
            var style = {fontFamily: 'balbeer', fontSize: "80px", align: "center", wordWrap: {width: 1000, useAdvancedWrap: true}, color: '#ffffff'};
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


