class victoryScene extends Phaser.Scene {
    constructor() {
        super("victory");
    }

    preload(){ 
    }

    create() {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        var playerNumber = gameState.getPlayersFinished()[0];
        var style = {fontFamily: 'balbeer', fontSize: "60px", align: "center", wordWrap: {width: 500, useAdvancedWrap: true}, color: '#ffffff'};
        this.add.text(screenCenterX, screenCenterY, "Congratulations "+ gameState.getPlayerNames(gameState.getPlayersFinished()[0]) +"!! You have reached the Promised Land! :)", style).setOrigin(.5);

        var resetStyle = {fontFamily: 'balbeer', fontSize: "40px", align: "center", wordWrap: {width: 500, useAdvancedWrap: true}, color: '#ffffff'};
        var resetGame = this.add.text(screenCenterX, screenCenterY + 250, "Return to Main Menu", resetStyle).setOrigin(.5);
        resetGame.setInteractive().on('pointerup', () => { this.reset() });
    }

    reset() {
        database.ref("promised-land-journey-game").child(gameState.getGameCode()).remove();
        gameState.resetGameState();
        this.openScene('menu');
    }

    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }

    

    update() {
       
    }
}