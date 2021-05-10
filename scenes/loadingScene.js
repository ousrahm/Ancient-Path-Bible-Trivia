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
        this.load.image("logo", "images/apa_logo.png");
        this.load.image("desertBackground", "images/desertImage.jpg");
        this.load.image("menuSign", "images/menuSign.png");

        this.load.video('forest', 'backgrounds/forest.mp4', false, true);
        this.load.video('hills', 'backgrounds/hills.mp4', false, true);
        this.load.video('mountains', 'backgrounds/mountains.mp4', false, true);
        this.load.video('ocean', 'backgrounds/ocean.mp4', false, true);
        this.load.video('reddesert', 'backgrounds/reddesert.mp4', false, true);
        this.load.video('river', 'backgrounds/river.mp4', false, true);
        this.load.video('rocks', 'backgrounds/rocks.mp4', false, true);
        this.load.video('roundForest', 'backgrounds/roundForest.mp4', false, true);
    }

    create() {

        // Adds timer
        this.timedEvent = this.time.addEvent({ delay: 1000, callbackScope: this, repeat: 5 });
        this.timesUp = false;

        // Creates constants for the middle of the x and y axes of the scene
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        
        // Adds logo to center of page
        this.logo = this.add.image(screenCenterX, screenCenterY - 50, "logo").setOrigin(0.5);
        this.logo.scaleX = .4;
        this.logo.scaleY = .4;

    }

    update() {
        if (this.timedEvent.repeatCount == 0 && !this.timesUp) {
            this.scene.start("menu");
            this.timesUp = true;
        }
    }
}