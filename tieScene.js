class TieScene extends Phaser.Scene {
    constructor() {
        super("tie");
    }

    preload(){ 
    }

    create() {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        var style = {fontFamily: 'Arial', fontSize: "60px", align: "center", wordWrap: {width: 500, useAdvancedWrap: true}, color: '#ffffff'};

        var message = "Player " + (gameState.getPlayersFinished()[0] + 1);

        for (let i = 1; i < gameState.getPlayersFinished().length; i++) {
            message += " and Player " + (gameState.getPlayersFinished()[i] + 1);
        }

        message += " have tied! Answer trivia questions to obtain the final victory!!"

        for (let i = 0; i < gameState.getNumberOfPlayers(); i++){
            gameState.resetNumberCorrect(gameState.getPlayers()[i]);
        }

        this.add.text(screenCenterX, screenCenterY, message, style).setOrigin(.5);

        if (!gameState.getHasTied()) {
            for (let i = 0; i < gameState.getWinState(); i++) {
                console.log("Players finished (" + i + "):" + gameState.getPlayersFinished()[i]);
            }

            //gameState.setCurrentPlayer(gameState.getPlayersFinished[0]);
            //gameState.changeCurrentPlayer();
            for (let i = 0; i < gameState.getWinState(); i++) {
                gameState.resetNumberCorrect(gameState.getPlayersFinished[i]);
                gameState.resetNumberAnswered(gameState.getPlayersFinished[i]);
            }
            
            //gameState.placeInTiebreakerStage();
        }

        gameState.setHasTied(true);

        // Adds timer
        this.timedEvent = this.time.addEvent({ delay: 1000, callbackScope: this, repeat: 3 });
        this.timesUp = false;
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