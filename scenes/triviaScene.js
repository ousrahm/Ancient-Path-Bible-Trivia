class TriviaScene extends Phaser.Scene {
    constructor() {
        super("trivia");
    }

    preload() {
    }

    create() {
        var currentPlayer = gameState.getCurrentPlayer();

        // How to run a looping background
        var backgroundName = gameState.getCurrentStageName(gameState.getCurrentPlayer());
        this.background = this.add.video(0, 0, backgroundName).setOrigin(0,0);
        this.background.play();

        // Temporary back button
        const backButton = this.add.text(20, 20, "Back", {font: "bold 30px Arial", fill: "white"}).setInteractive().on('pointerup', () => { this.openScene("menu") });

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // Adds trivia board
        this.triviaBoard = this.add.image(screenCenterX, 200, "triviaBoard");
        this.triviaBoard.scaleX = .78;
        this.triviaBoard.scaleY = .46;

        // Adds trivia question
        var style = {fontFamily: 'barthowheel', fontSize: "50px", align: "left", wordWrap: {width: this.triviaBoard.width/1.5, useAdvancedWrap: true}, color: '#ffffff'};
        var text = this.add.text(this.triviaBoard.x/2.1, this.triviaBoard.y/2.1, questions.getRandomQuestion(gameState.getStages(currentPlayer)), style);
    
        
        // Adds timer
        this.timerText = this.add.text(50, 60, "", { fontFamily: 'earth', fontSize: "50px", color: '#ffffff', align: "center"});
        this.timedEvent = this.time.addEvent({ delay: 1000, callbackScope: this, repeat: 20 });
        this.answersAdded = false;
        this.timesUp = false;
        

        // Gets number correct and number incorrect
        var correct = gameState.getNumberCorrect(currentPlayer);
        var incorrect = gameState.getNumberAnswered(currentPlayer) - correct;

        // Adds current player text
        this.add.text(screenCenterX, 20, gameState.getPlayerNames(gameState.getCurrentPlayer()), { fontFamily: 'earth', fontSize: "40px", color: '#ffffff', align: "center"}).setOrigin(.5);

        // Adds correct and incorrect counters
        this.incorrectCounter = this.add.text(30, 150, "Incorrect: "+incorrect, { fontFamily: 'earth', fontSize: "30px", color: '#ffffff', align: "center"})

        // Adds location of other players
        for (let i = 0; i < gameState.getNumberOfPlayers(); i++) {
            this.addPlayerInfo(i);
        }

    }

    /**
     * openScene(nameOfScene):
     * Starts the scene of the specified name.
     * @param {String} nameOfScene 
     */
    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }

    /**
     * answerResponse(answer):
     * Open a scene based on the correct or incorrect answer.
     * @param {String} answer 
     */

    answerResponse(answer) {
        if (answer == questions.getCorrect()) {
            this.openScene("correct")
        } else {
            this.openScene("incorrect")
        }
    }

    /**
     * addAnswers():
     * The answers to the current question are retrieved. After they are scrambled, the correct answer is sent to the
     * questions class to be stored. The answer boards are added to the screen and connected to answerResponse().
     */

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


        var style = {fontFamily: 'barthowheel', fontSize: "35px", align: "left", color: '#ffffff'};
        
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

    /**
     * getRandomInt(max):
     * @param {Number} max 
     * @returns a random number from 0 to (max - 1);
     */
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    /**
     * addPlayerInfo(player):
     * Adds text to the screen displaying the player's number, stage, and number correct in that stage.
     * @param {Number} player 
     */
    addPlayerInfo(player) {
        var playerStage = gameState.getStages(player)+1
        var playerCorrect = gameState.getNumberCorrect(player);
        var style = { fontFamily: 'earth', fontSize: "20px", color: '#ffffff', align: "left"};
        this.add.text(30, 200 + (player*30), gameState.getPlayerNames(player)+": " + "Stage " + playerStage + "." + playerCorrect, style);
    }



    update() {
        /** If the timer is still running, update on screen accordingly. */
        if (!this.timesUp) {
            this.timerText.setText(this.timedEvent.repeatCount);
        }
        /** If timer reaches 17, show the answers. */
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


