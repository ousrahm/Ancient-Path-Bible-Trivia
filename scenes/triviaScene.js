class TriviaScene extends Phaser.Scene {
    constructor() {
        super("trivia");
    }

    preload() {
    }

    async create() {
        // Creates a variable to hold the current player
        this.currentPlayer = gameState.getCurrentPlayer();

        // How to run a looping background
        var backgroundName = gameState.getCurrentStageName(this.currentPlayer);
        this.background = this.add.video(0, 0, backgroundName).setOrigin(0,0);
        this.background.play();

        // Temporary back button
        // const backButton = this.add.text(20, 20, "Back", {font: "bold 30px Arial", fill: "white"}).setInteractive().on('pointerup', () => { this.openScene("menu") });

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // Adds trivia board
        this.triviaBoard = this.add.image(screenCenterX, 200, "triviaBoard");
        this.triviaBoard.scaleX = .78;
        this.triviaBoard.scaleY = .46;

        // If the player running this scene is the host, run the addQuestion function
        if (gameState.getMyPlayer() === 0){
            this.addQuestion();
        }

        // Adds timer
        this.timerText = this.add.text(50, 60, "", { fontFamily: 'earth', fontSize: "50px", color: '#ffffff', align: "center"});
        this.timedEvent = this.time.addEvent({ delay: 1000, callbackScope: this, repeat: 20 });
        this.answersAdded = false;
        this.timesUp = false;
        

        // Gets number correct and number incorrect
        var correct = gameState.getNumberCorrect(this.currentPlayer);
        var incorrect = gameState.getNumberAnswered(this.currentPlayer) - correct;

        // Adds current player text
        this.add.text(screenCenterX, 20, gameState.getPlayerNames(this.currentPlayer), { fontFamily: 'earth', fontSize: "40px", color: '#ffffff', align: "center"}).setOrigin(.5);

        // Adds correct and incorrect counters
        this.incorrectCounter = this.add.text(30, 150, "Incorrect: "+incorrect, { fontFamily: 'earth', fontSize: "30px", color: '#ffffff', align: "center"})

        // Adds location of other players
        for (let i = 0; i < gameState.getNumberOfPlayers(); i++) {
            this.addPlayerInfo(i, gameState.getPlayerNamesArray()[i]);
        }

        // On the change of retrieveQuestion, call this.retrieveQuestion
        database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("retrievedQuestion").on("value", this.retrieveQuestion)

    }

    /**
     * Function:
     * Only the host will access this function    
     * Adds a random question to the database to be accessed by all players
     * Grabs answers, shuffles them, and sends them to the database to be accessed by all players
     * Prints the question to the scene and calls addAnswers()
     */
    async addQuestion() {

        // Pushes a random question to our database
        var question = questions.getRandomQuestion(gameState.getStages(this.currentPlayer));
        await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("question").set(question);

        console.log(question);

        // Gets answers for the current question and scrambles them
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

        // Pushes answers to the database
        var answersRef = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("answers");
        
        await answersRef.child("A").set(scrambled[0]);
        await answersRef.child("B").set(scrambled[1]);
        await answersRef.child("C").set(scrambled[2]);
        await answersRef.child("D").set(scrambled[3]);

        // Sets retrievedQuestion in database to true
        await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child('retrievedQuestion').set(true);

        // Prints trivia question to scene
        var style = {fontFamily: 'barthowheel', fontSize: "50px", align: "left", wordWrap: {width: this.triviaBoard.width/1.5, useAdvancedWrap: true}, color: '#ffffff'};
        var text = this.add.text(this.triviaBoard.x/2.1, this.triviaBoard.y/2.1, question, style);
        
        this.addAnswers();
    }

    /**
     * Function:
     * The host will never access this function
     * 
     */
    async retrieveQuestion() {
        // If the player is not the host, continue
        if (gameState.getMyPlayer() !== 0){
            // If the host has posted a new question to the database, retrieve that question and those answers.
            var retrieved = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child('retrievedQuestion').get();

            if (retrieved.val()) {
                // this is undefined in a uncaught type error when opening trivia
                this.addAnswers();
                
                let question = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child('question').get();
                
                // Prints trivia question to scene
                var style = {fontFamily: 'barthowheel', fontSize: "50px", align: "left", wordWrap: {width: this.triviaBoard.width/1.5, useAdvancedWrap: true}, color: '#ffffff'};
                var text = this.add.text(this.triviaBoard.x/2.1, this.triviaBoard.y/2.1, question.val(), style);

            } else {
                console.log(retrieved.val())
            }
        
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
     * The answers to the current question are retrieved from the database.
     * The answer boards are printed to the screen and connected to answerResponse().
     */
    async addAnswers() {
        var answers = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("answers").get();
        console.log(answers);
        console.log(answers["A"]);
        var style = {fontFamily: 'barthowheel', fontSize: "35px", align: "left", color: '#ffffff'};
        
        this.answerA = this.add.image(this.triviaBoard.x - 175, this.triviaBoard.y+230, "woodenAnswerA").setScale(.25);
        this.answerA.setInteractive().on('pointerup', () => { this.answerResponse("A")});
        this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+220, answers["A"], style);

        this.answerB = this.add.image(this.triviaBoard.x + 150, this.triviaBoard.y+230, "woodenAnswerB").setScale(.25);
        this.answerB.setInteractive().on('pointerup', () => { this.answerResponse("B") });
        this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+220, answers["B"], style);
        
        this.answerC = this.add.image(this.triviaBoard.x - 175, this.triviaBoard.y+330, "woodenAnswerC").setScale(.25);
        this.answerC.setInteractive().on('pointerup', () => { this.answerResponse("C") });
        this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+320, answers["C"], style);

        this.answerD = this.add.image(this.triviaBoard.x + 150, this.triviaBoard.y+330, "woodenAnswerD").setScale(.25);
        this.answerD.setInteractive().on('pointerup', () => { this.answerResponse("D") });
        this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+320, answers["D"], style);
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
    addPlayerInfo(player, name) {
        var playerStage = gameState.getStages(player)+1
        var playerCorrect = gameState.getNumberCorrect(player);
        var style = { fontFamily: 'earth', fontSize: "20px", color: '#ffffff', align: "left"};
        this.add.text(30, 200 + (player*30), name+": " + "Stage " + playerStage + "." + playerCorrect, style);
    }



    update() {
        /** If the timer is still running, update on screen accordingly. */
        if (!this.timesUp) {
            this.timerText.setText(this.timedEvent.repeatCount);
        }
        // /** If timer reaches 17, show the answers. */
        // if (this.timedEvent.repeatCount == 17 && !this.answersAdded) {
        //     this.addAnswers();
        //     this.answersAdded = true;            
        // }
        /** If the timer reaches 0, go to incorrect scene. */
        if (this.timedEvent.repeatCount == 0 && !this.timesUp) {
            this.timesUp = true;
            this.openScene("incorrect");
        }

    }
}


