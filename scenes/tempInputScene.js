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

    async setUpGame(numberOfPlayers) {
        /**
         * Started a new game in the database.
         * Grabbed the reference value to that game.
         * Set up a new GameState instance with the number of players and the reference value.
         */
        var game = database.ref("promised-land-journey-game").push();
        game.set({
            "Player Number": numberOfPlayers,
            "P1": "Player 1",
            "P2": "Player 2",
            "P3": "Player 3",
            "P4": "Player 4",
            "turn": 0
        })
        var gameRef;
        await game.then(function(result){
            gameRef = game.path.pieces_[1];
        }, function(error){});

        gameState.setUpGameState(numberOfPlayers, gameRef);
        this.openScene("naming");
    }

    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }

    update() {

    }
}