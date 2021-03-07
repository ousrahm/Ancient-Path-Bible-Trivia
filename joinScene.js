class JoinScene extends Phaser.Scene {
    constructor() {
        super("joinGame");
    }

    create() {
        this.add.text(650, 320, "Join Screen...", {
            font: "bold 70px Arial", 
            fill: "white"
        });

        const backButton = this.add.text(20, 20, "Back", {font: "bold 30px Arial", fill: "white"}).setInteractive().on('pointerup', () => { this.backToMenu() });

    }

    backToMenu() {
        this.scene.start("menu")
    }

    update() {

    }
}