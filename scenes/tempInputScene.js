class tempInput extends Phaser.Scene {
    constructor() {
        super('input');
    }

    preload() {
    }

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        var style = {fontFamily: 'balbeer', fontSize: "150px", align: "center", color: '#ffffff'}

        this.add.text(screenCenterX, screenCenterY-200, "Click on the number of players...", {fontFamily: 'balbeer', fontSize: "70px", align: "center", color: '#ffffff'}).setOrigin(.5);
        
        var num2 = this.add.text(screenCenterX - 200, screenCenterY, "2", style).setOrigin(.5);
        var num3 = this.add.text(screenCenterX, screenCenterY, "3", style).setOrigin(.5);
        var num4 = this.add.text(screenCenterX + 200, screenCenterY, "4", style).setOrigin(.5);

        num2.setInteractive().on('pointerup', () => { this.setUpGame(2) });
        num3.setInteractive().on('pointerup', () => { this.setUpGame(3) });
        num4.setInteractive().on('pointerup', () => { this.setUpGame(4) });

    }

    setUpGame(numberOfPlayers) {
        var gameRef = database.ref("promised-land-journey-game").push();
        gameRef.set({
            "Player Number": numberOfPlayers,
            1: "player1",
            2: "player2",
            3: "player3",
            4: "player4",
            "turn": 1
        })
        gameState.setUpGameState(numberOfPlayers);
        this.openScene("trivia");
    }

    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }

    update() {

    }
}