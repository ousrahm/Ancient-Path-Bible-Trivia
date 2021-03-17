class newStageScene extends Phaser.Scene {
    constructor() {
        super("newStage");
    }

    preload() {
    }

    create() {
        var currentPlayer = gameState.getCurrentPlayer();

        // Added text about player moving onto next stage
        var nextStage = gameState.getStages(currentPlayer);
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        var style = {fontFamily: 'Arial', fontSize: "60px", align: "center", wordWrap: {width: 500, useAdvancedWrap: true}, color: '#ffffff'};
        this.add.text(screenCenterX, screenCenterY, "Player " + (currentPlayer+1) + " has moved on to Stage " + (nextStage+1) + "!!", style).setOrigin(.5);
       
        // Advance currentPlayer's stage (resets numberCorrect & numberAnswered counters)
        gameState.advanceStage(currentPlayer);

        // Change currentPlayer in gameState
    }



    update() {
       

    }
}


