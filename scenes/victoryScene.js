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
        var style = {fontFamily: 'Arial', fontSize: "60px", align: "center", wordWrap: {width: 500, useAdvancedWrap: true}, color: '#ffffff'};

        this.add.text(screenCenterX, screenCenterY, "Congratulations "+ gameState.getPlayerNames(gameState.getPlayersFinished()[0]) +"!! :)", style).setOrigin(.5);

    }

    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }

    

    update() {
       
    }
}