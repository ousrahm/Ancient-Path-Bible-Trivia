class TriviaScene extends Phaser.Scene {
    constructor() {
        super("trivia");
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