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

        // Temporary back button
        const backButton = this.add.text(20, 20, "Back", {font: "bold 30px Arial", fill: "white"}).setInteractive().on('pointerup', () => { this.openScene("menu") });

        // Adds trivia board
        this.triviaBoard = this.add.image(config.width/2, 200, "triviaBoard");
        this.triviaBoard.scaleX = .78;
        this.triviaBoard.scaleY = .46;

        // Adds trivia question
        var style = {fontFamily: 'Georgia', fontSize: "45px", align: "left", wordWrap: {width: this.triviaBoard.width/1.5, useAdvancedWrap: true}, color: '#ffffff'};
        var text = this.add.text(this.triviaBoard.x/2.1, this.triviaBoard.y/2.1, questions.getRandomQuestion(), style);
    
        
        // Adds timer
        this.timerText = this.add.text(50, 60, "", { fontFamily: 'Arial', fontSize: "25px", color: '#ffffff', align: "center"});
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.logTime(), callbackScope: this, repeat: 25 });
        this.answersAdded = false;
        this.timesUp = false;

        // Gets number correct and number incorrect
        var currentPlayer = gameState.getCurrentPlayer();
        var correct = gameState.getNumberCorrect(currentPlayer);
        var incorrect = gameState.getNumberAnswered(currentPlayer) - correct;

        // Adds correct and incorrect counters
        this.correctCounter = this.add.text(50, 120, "Correct: "+correct, { fontFamily: 'Arial', fontSize: "25px", color: '#ffffff', align: "center"})
        this.incorrectCounter = this.add.text(50, 150, "Incorrect: "+incorrect, { fontFamily: 'Arial', fontSize: "25px", color: '#ffffff', align: "center"})

    }

    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }

    logTime(){
        console.log('timer is working!')
    }

    answerResponse(answer) {
        if (answer == questions.getCorrect()) {
            this.openScene("correct")
        } else {
            this.openScene("incorrect")
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    addAnswers() {
        var answers = questions.getAnswers();
        var scrambled = [];
        var gotCorrect = false;

        for (let i = 4; i > 0; i--) {
            var index = this.getRandomInt(i);
            if (index == 0 && !gotCorrect) {
                gotCorrect = true;
                var l;
                if (i==4){l="A";}else if(i==3){l="B"}else if(i==2){l="C"}else if(i==1){l="D"};
                questions.setCorrect(l);
            }
            scrambled.push(answers[index]);
            answers.splice(index, 1);
        }


        var style = {fontFamily: 'Georgia', fontSize: "30px", align: "left", color: '#ffffff'};
        
        this.answerA = this.add.image(this.triviaBoard.x - 175, this.triviaBoard.y+230, "woodenAnswerA").setScale(.25);
        this.answerA.setInteractive().on('pointerup', () => { this.answerResponse("A")});
        this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+220, scrambled[0], style);

        this.answerB = this.add.image(this.triviaBoard.x + 150, this.triviaBoard.y+230, "woodenAnswerB").setScale(.25);
        this.answerB.setInteractive().on('pointerup', () => { this.answerResponse("B") });
        this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+220, scrambled[1], style);
        
        this.answerC = this.add.image(this.triviaBoard.x - 175, this.triviaBoard.y+330, "woodenAnswerC").setScale(.25);
        this.answerC.setInteractive().on('pointerup', () => { this.answerResponse("C") });
        this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+320, scrambled[2], style);

        this.answerD = this.add.image(this.triviaBoard.x + 150, this.triviaBoard.y+330, "woodenAnswerD").setScale(.25);
        this.answerD.setInteractive().on('pointerup', () => { this.answerResponse("D") });
        this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+320, scrambled[3], style);
    }



    update() {
        if (!this.timesUp) {
            this.timerText.setText(this.timedEvent.repeatCount);
        }
        /** If timer reaches 20, show the answers */
        if (this.timedEvent.repeatCount == 20 && !this.answersAdded) {
            this.addAnswers()
            this.answersAdded = true;            
        }
        /** If the timer reaches 0, go to incorrect scene. */
        if (this.timedEvent.repeatCount == 0 && !this.timesUp) {
            this.timesUp = true;
            this.openScene("incorrect");
        }

    }
}


