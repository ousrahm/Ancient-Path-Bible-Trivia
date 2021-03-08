class HostScene extends Phaser.Scene {
    constructor() {
        super("hostGame");
    }

    create() {
        this.add.text(650, 320, "Host Screen...", {
            font: "bold 70px Arial", 
            fill: "white"
        });

        const backButton = this.add.text(20, 20, "Back", {font: "bold 30px Arial", fill: "white"}).setInteractive().on('pointerup', () => { this.openScene("menu") });

    }

    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }


    update() {

    }
}