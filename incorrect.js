class IncorrectScene extends Phaser.Scene {
    constructor() {
        super("incorrect");
    }

    preload(){ 
    }

    create() {
        this.incorrectImage = this.add.image(config.width/2, config.height/2, "incorrect");

        this.timedEvent = this.time.addEvent({ delay: 1000, callbackScope: this, repeat: 5 });
        this.timesUp = false;

    }

    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }

    update() {
        if (this.timedEvent.repeatCount == 0 && !this.timesUp) {
            this.openScene("trivia");
            this.timesUp = true;
        }

    }
}