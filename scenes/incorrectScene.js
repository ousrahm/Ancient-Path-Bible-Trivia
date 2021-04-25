/**
 * This class is used to change the gameState and change the current question.
 * It will then open another trivia question for whoever is next in the game. 
 */

 class IncorrectScene extends Phaser.Scene {
    constructor() {
        super("incorrect");
    }

    preload(){ 
    }

    async create() {
        // How to run a looping background
        var backgroundName = gameState.getCurrentStageName(gameState.getCurrentPlayer());
        this.background = this.add.video(0, 0, backgroundName).setOrigin(0,0);
        this.background.play();

        // If the current player has finished the stages, check for a win
        if (gameState.getWinState() > 1) {
            if (gameState.getCurrentPlayer() == gameState.getPlayersFinished()[gameState.getWinState()-1]) {
                gameState.checkForWin(false);
            }
        // If the current player is the last player, check for a win
        } else if (gameState.getCurrentPlayer() == gameState.getNumberOfPlayers()-1) {
            gameState.checkForWin(false);
        } 

        // Creates constants for the middle of the x and y axes of the scene
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // Adds trivia board
        this.triviaBoard = this.add.image(screenCenterX, 200, "triviaBoard");
        this.triviaBoard.scaleX = .78;
        this.triviaBoard.scaleY = .46;

        // Prints a message to the scene
        var responses = ["Nice try! ", "Sorry! ", "Bummer! ", "Not this time! "]
        var texts = responses[this.getRandomInt(4)] + "Incorrect answer.";
        var style = {fontFamily: 'balbeer', fontSize: "30px", align: "center", color: '#ffffff'}
        this.add.text(screenCenterX, 20, texts, style).setOrigin(.5);

        // Creates timer
        this.timedEvent = this.time.addEvent({ delay: 3000, callbackScope: this, repeat: 1 });
        this.timesUp = false;

        // Adds one to numberAnswered array of current player
        const currentPlayer = gameState.getCurrentPlayer();
        gameState.addNumberAnswered(currentPlayer);

        var selectRef = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child('selectedAnswer').get();

        // Sets retrievedQuestion in database to false
        // Sets selectedAnswer in database back to an empty string
        if (gameState.getMyPlayer() === 0) {
            await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child('retrievedQuestion').set(false);
            await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("selectedAnswer").set("");
        }

        // Prints question to scene
        var style = {fontFamily: 'barthowheel', fontSize: "50px", align: "left", wordWrap: {width: this.triviaBoard.width/1.5, useAdvancedWrap: true}, color: '#ffffff'};
        var questionRef = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child('question').get();
        var question = questionRef.val();
        this.add.text(this.triviaBoard.x/2.1, this.triviaBoard.y/2.1, question, style);

        // Sends selected answer to this.addAnswers()
        this.addAnswers(selectRef.val());
        
    }

    /**
     * Starts the scene of the specified name.
     * @param {String} nameOfScene 
     */
    openScene(nameOfScene){
        this.scene.start(nameOfScene);
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
     * addAnswers():
     * The answers to the current question are retrieved from the database.
     * The answer boards are printed to the screen and connected to answerResponse().
     */
        async addAnswers(selectedAnswer) {

            var answers = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("answers").get();
            var correctAnswerRef = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("correctAnswer").get();
            var correctAnswer = correctAnswerRef.val();
            
            var style = {fontFamily: 'barthowheel', fontSize: "35px", align: "left", color: '#ffffff'};
            var correctStyle = {fontFamily: 'barthowheel', fontSize: "35px", align: "left", color: '#00ff00'};
            var incorrectStyle = {fontFamily: 'barthowheel', fontSize: "35px", align: "left", color: '#ff0000'};
            
            this.answerA = this.add.image(this.triviaBoard.x - 175, this.triviaBoard.y+230, "woodenAnswerA").setScale(.25);
            this.answerA.setInteractive().on('pointerup', () => { this.answerResponse("A")});
            if ("A" === correctAnswer) {
                this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+220, answers.val()["A"], correctStyle);
            } else if ("A" === selectedAnswer) {
                this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+220, answers.val()["A"], incorrectStyle);
            } else {
                this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+220, answers.val()["A"], style);
            }
    
            this.answerB = this.add.image(this.triviaBoard.x + 150, this.triviaBoard.y+230, "woodenAnswerB").setScale(.25);
            this.answerB.setInteractive().on('pointerup', () => { this.answerResponse("B") });
            this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+220, answers.val()["B"], style);
            if ("B" === correctAnswer) {
                this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+220, answers.val()["B"], correctStyle);
            } else if ("B" === selectedAnswer) {
                this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+220, answers.val()["B"], incorrectStyle);
            } else {
                this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+220, answers.val()["B"], style);
                
            }
            
            this.answerC = this.add.image(this.triviaBoard.x - 175, this.triviaBoard.y+330, "woodenAnswerC").setScale(.25);
            this.answerC.setInteractive().on('pointerup', () => { this.answerResponse("C") });
            if ("C" === correctAnswer) {
                this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+320, answers.val()["C"], correctStyle);
            } else if ("C" === selectedAnswer) {
                this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+320, answers.val()["C"], incorrectStyle);
            }else {
                this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+320, answers.val()["C"], style);
            }
    
            this.answerD = this.add.image(this.triviaBoard.x + 150, this.triviaBoard.y+330, "woodenAnswerD").setScale(.25);
            this.answerD.setInteractive().on('pointerup', () => { this.answerResponse("D") });
            this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+320, answers.val()["D"], style);
            if ("D" === correctAnswer) {
                this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+320, answers.val()["D"], correctStyle);
            } else if ("D" === selectedAnswer) {
                this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+320, answers.val()["D"], incorrectStyle);
            } else {
                this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+320, answers.val()["D"], style);
            }
        }

    update() {
        // Once the timer is up, open nextPlayerScene
        if (this.timedEvent.repeatCount == 0 && !this.timesUp) {
            this.openScene("nextPlayer");
            this.timesUp = true;
        }

    }
}