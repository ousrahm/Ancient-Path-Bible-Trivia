class tempInput extends Phaser.Scene {
    constructor() {
        super('input');
    }

    preload() {
        this.load.image("num2", "images/number2.png");
        this.load.image("num3", "images/number3.png");
        this.load.image("num4", "images/number4.png");
    }

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.add.text(screenCenterX, screenCenterY-200, "How many players?", {font: "70px Arial", fill: "white"}).setOrigin(.5);
        
        var num2 = this.add.image(screenCenterX - 200, screenCenterY, "num2").setOrigin(.5).setScale(.3);
        var num3 = this.add.image(screenCenterX, screenCenterY, "num3").setOrigin(.5).setScale(.15);
        var num4 = this.add.image(screenCenterX + 200, screenCenterY, "num4").setOrigin(.5).setScale(.15);

        num2.setInteractive().on('pointerup', () => { this.setUpGame(2) });
        num3.setInteractive().on('pointerup', () => { this.setUpGame(3) });
        num4.setInteractive().on('pointerup', () => { this.setUpGame(4) });

    }

    setUpGame(numberOfPlayers) {
        gameState.setUpGameState(numberOfPlayers);
        this.openScene("trivia");
    }

    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }

    update() {

    }
}