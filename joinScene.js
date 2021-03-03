class JoinScene extends Phaser.Scene {
    constructor() {
        super("joinGame");
    }

    create() {
        this.add.text(650, 320, "Join Screen...", {
            font: "bold 70px Arial", 
            fill: "white"
        });

    }


    update() {

    }
}