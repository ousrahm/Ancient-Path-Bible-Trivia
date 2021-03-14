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
        this.triviaBoard = this.add.image(config.width/2, 200, "triviaBoard");
        this.triviaBoard.scaleX = .78;
        this.triviaBoard.scaleY = .46;
        var text = this.add.text(this.triviaBoard.x/2, this.triviaBoard.y/1.7, question, { fontFamily: 'Georgia', fontSize: "47px", color: '#ffffff', align: "center"});

        // Adds timer
        this.timerText = this.add.text(50, 50, 25, { fontFamily: 'Arial', fontSize: "35px", color: '#ffffff', align: "center"});
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.logTime(), callbackScope: this, repeat: 25 });
        this.answersAdded = false;
    }

    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }

    logTime(){
        console.log('timer is working!')
    }

    answerResponse(answer) {
        console.log("You answered:" + answer);
    }

    addAnswers() {
        this.answerA = this.add.image(this.triviaBoard.x - 175, this.triviaBoard.y+230, "answerBoardA").setScale(.25);
        this.answerA.setInteractive().on('pointerup', () => { this.answerResponse("A") });

        this.answerB = this.add.image(this.triviaBoard.x + 150, this.triviaBoard.y+230, "answerBoard").setScale(.25);
        this.answerB.setInteractive().on('pointerup', () => { this.answerResponse("B") });

        this.answerC = this.add.image(this.triviaBoard.x - 175, this.triviaBoard.y+330, "answerBoard").setScale(.25);
        this.answerC.setInteractive().on('pointerup', () => { this.answerResponse("C") });

        this.answerD = this.add.image(this.triviaBoard.x + 150, this.triviaBoard.y+330, "answerBoard").setScale(.25);
        this.answerD.setInteractive().on('pointerup', () => { this.answerResponse("D") });
    }



    update() {
        if (this.timedEvent.repeatCount == 20 && !this.answersAdded) {
            this.addAnswers()
            this.answersAdded = true;            
        }
        this.timerText.setText(this.timedEvent.repeatCount);

    }
}


