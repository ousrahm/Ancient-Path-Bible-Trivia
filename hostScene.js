class HostScene extends Phaser.Scene {
    constructor() {
        super("hostGame");
    }

    create() {
        this.add.text(650, 320, "Host Screen...", {
            font: "bold 70px Arial", 
            fill: "white"
        });

    }


    update() {

    }
}