class TrueTieScene extends Phaser.Scene {
    constructor() {
        super("trueTie");
    }

    preload(){ 
    }

    create() {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        var style = {fontFamily: 'balbeer', fontSize: "60px", align: "center", wordWrap: {width: 500, useAdvancedWrap: true}, color: 'black'};

        var message = "True tie game! " + gameState.getPlayerNames(gameState.getPlayersFinished()[0]);

        for (let i = 1; i < gameState.getPlayersFinished().length; i++) {
            message += " and " + gameState.getPlayerNames(gameState.getPlayersFinished()[i]);
        }

        message += " have all reached the Promised Land!!! Congratulations!"

        for (let i = 0; i < gameState.getNumberOfPlayers(); i++){
            gameState.resetNumberCorrect(gameState.getPlayers()[i]);
        }

        this.add.text(screenCenterX, screenCenterY, message, style).setOrigin(.5);
    }

    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }

    

    update() {
    }
}