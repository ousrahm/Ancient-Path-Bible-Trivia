class LoadingScene extends Phaser.Scene {
    constructor() {
        // calling super makes this class inherit characteristics from its predecessor, the Scene class from Phaser
        // we are calling it bootGame bc we will use this to start the game 
        super("bootGame");
    }

    preload()  {
        this.load.image("desertBackground", "images/desertImage2.jpg");
        this.load.image("menuSign", "images/menuSign.png")
        this.load.image('settingRock', 'images/rock.png');
        this.load.image("settingsGear", "images/settingsGear.png")
        this.load.image("cloud", "images/cloudSquare.png")

        this.load.video('desertLoop', 'images/desertLoopNoAudio.mp4', 'loadeddata', false, true);
        this.load.video('autumnLoop', 'images/autumn.mp4', 'loadeddata', false, true);
        this.load.video('rainbowLoop', 'images/rainbow.mp4', 'loadeddata', false, true);
        this.load.video('summerLoop', 'images/summer.mp4', 'loadeddata', false, true);
        this.load.video('finaleLoop', 'images/finale.mp4', 'loadeddata', false, true);
    }

    create() {
        this.add.text(200, 200, "Loading Game...", {font: "bold 30px Arial", fill: "white"});
        this.scene.start("menu");

    }
}