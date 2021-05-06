/**
 * This class holds the loading scene which occurs as soon as a user
 * opens the website.
 */
class LoadingScene extends Phaser.Scene {
    constructor() {
        // calling super makes this class inherit characteristics from its predecessor, the Scene class from Phaser
        // we are calling it bootGame bc we will use this to start the game 
        super("bootGame");
    }

    preload()  {
        this.load.image("desertBackground", "images/desertImage2.jpg");
        this.load.image("menuSign", "images/menuSign.png");

        this.load.video('forest', 'images/forest.mp4', false, true);
        this.load.video('hills', 'images/hillsFINAL.mp4', false, true);
        this.load.video('mountains', 'images/mountains.mp4', false, true);
        this.load.video('ocean', 'images/oceanFINAL.mp4', false, true);
        this.load.video('reddesert', 'images/reddesert.mp4', false, true);
        this.load.video('river', 'images/riverFlowingFINAL.mp4', false, true);
        this.load.video('rocks', 'images/rocks.mp4', false, true);
        this.load.video('roundForest', 'images/roundForest.mp4', false, true);
    }

    create() {
        this.add.text(200, 200, "Loading Game...", {font: "bold 30px Arial", fill: "white"});
        this.scene.start("menu");

    }
}