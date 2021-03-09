class TriviaScene extends Phaser.Scene {
    constructor() {
        super("trivia");
    }

    preload() {
        
    }

    create() {

        // How to run a looping background
        this.background = this.add.video(0, 0, 'desertLoop').setOrigin(0,0);
        this.background.play();

        // Temporary Question
        var question = ["How many plagues did Israel","have to face during the escape","from Egypt with Moses?"];

        // Back Button
        const backButton = this.add.text(20, 20, "Back", {font: "bold 30px Arial", fill: "white"}).setInteractive().on('pointerup', () => { this.openScene("menu") });

        // Adds trivia board and trivia question
        var triviaBoard = this.add.image(config.width/2, 200, "triviaBoard");
        triviaBoard.scaleX = .78;
        triviaBoard.scaleY = .46;
        var text = this.add.text(triviaBoard.x/2, triviaBoard.y/1.7, question, { fontFamily: 'Georgia', fontSize: "47px", color: '#ffffff', align: "center"});

        // Adds timer
        this.timer = this.add.text(50, 50, 20, { fontFamily: 'Arial', fontSize: "25px", color: '#ffffff', align: "center"});
        this.timersAt1 = false;
        this.updateCount = 0;
    }

    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }


    update() {
        // Because update runs 60 times a second, once updateCount reaches a multiple of 60, 
        // that is one second, and it subtracts that from the timer. Once the timer reaches 1, the next second, it changes the timer to "Time's up!".
        this.updateCount+= 1;
        if (this.timersAt1) {
            this.timer.text = "Time's up!"
        }
        if (this.updateCount % 60 == 0 && !this.timersAt1){
            if (this.timer.text == 1) {
                this.timersAt1 = true;
            } else {
                this.timer.text -= 1;
            }
        }

    

    }
}


