class StoryLine extends Phaser.Scene {
    constructor() {
        // calling super makes this class inherit characteristics from its predecessor, the Scene class from Phaser
        // we are calling it playGame bc we will use this to play the game 
        super("storyline");
    } 

    preload(){ 
        
    }

    create() {
        // Adds timer
        this.timedEvent = this.time.addEvent({ delay: 1000, callbackScope: this, repeat: 3 });
        this.timesUp = false;

        var style = {fontFamily: 'Arial', fontSize: "60px", align: "center", wordWrap: {width: 500, useAdvancedWrap: true}, color: '#ffffff'};
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.add.text(screenCenterX, screenCenterY, "This is a story line.")

        this.add.text(config.width - 100, 30, "SKIP").setInteractive().on('pointerup', () => { this.openScene("trivia"); });;
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