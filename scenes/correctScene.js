/**
 * This class should be used to change the gameState and change the current question.
 * It will then open another trivia question for whoever is next in the game. 
 */

 class CorrectScene extends Phaser.Scene {
    constructor() {
        super("correct");
    }

    preload(){ 
    }

    async create() {
        // How to run a looping background
        var backgroundName = gameState.getCurrentStageName(gameState.getCurrentPlayer());
        this.background = this.add.video(0, 0, backgroundName).setOrigin(0,0);
        this.background.play();

        // Creates constants for the middle of the x and y axes of the scene
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // Adds trivia board
        this.triviaBoard = this.add.image(screenCenterX, 200, "triviaBoard");
        this.triviaBoard.scaleX = .78;
        this.triviaBoard.scaleY = .46;

        // Prints a positive message to the scene
        var responses = ["Awesome! ", "Great job! ", "Kudos! ", "Wonderful! "]
        var texts = responses[this.getRandomInt(4)] + "Correct answer!";
        var style = {fontFamily: 'balbeer', fontSize: "30px", align: "center", color: '#ffffff'}
        this.add.text(screenCenterX, 20, texts, style).setOrigin(.5);

        // Creates timer
        this.timedEvent = this.time.addEvent({ delay: 3000, callbackScope: this, repeat: 1 });
        this.timesUp = false;

        // Adds one to the number correct and the number answered of the current player in the GameState class
        const currentPlayer = gameState.getCurrentPlayer();
        gameState.addNumberCorrect(currentPlayer);
        gameState.addNumberAnswered(currentPlayer);

        // Once the player has answered 3 questions correctly, threeCorrect will change to true,
        // and a win will be checked for
        this.threeCorrect = false;
        if (gameState.getNumberCorrect(currentPlayer)==3 && gameState.getWinState() <= 1) {
            if (currentPlayer == gameState.getNumberOfPlayers()-1) {
                gameState.checkForWin(true);
            }
            this.threeCorrect = true;
        }

        var style = {fontFamily: 'barthowheel', fontSize: "50px", align: "left", wordWrap: {width: this.triviaBoard.width/1.5, useAdvancedWrap: true}, color: '#ffffff'};
        var questionRef = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child('question').get();
        var question = questionRef.val();
        this.add.text(this.triviaBoard.x/2.1, this.triviaBoard.y/2.1, question, style);

        // retrievedQuestion is reset to false in the database
        // selectAnswer is reset to an empty string in the database
        if (gameState.getMyPlayer() === 0) {
            await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child('retrievedQuestion').set(false);
            await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("selectedAnswer").set("");
        }

        this.addAnswers();
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
     async addAnswers() {
        var answers = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("answers").get();
        var correctAnswerRef = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("correctAnswer").get();
        var correctAnswer = correctAnswerRef.val();
        var style;
        var fontSize;
        // var style = {fontFamily: 'barthowheel', fontSize: "35px", align: "left", color: '#ffffff'};
        // var correctStyle = {fontFamily: 'barthowheel', fontSize: "35px", align: "left", color: '#00ff00'};
        
        this.answerA = this.add.image(this.triviaBoard.x - 175, this.triviaBoard.y+230, "woodenAnswerA").setScale(.25);
        if ("A" === correctAnswer) {
            if (answers.val()["A"].length > 15) {
                fontSize = 500/(answers.val()["A"].length) < 23 ? 23 : 500/(answers.val()["A"].length);
                style = {fontFamily: 'barthowheel', fontSize: fontSize + "px", wordWrap: {width: 200, useAdvancedWrap: true}, align: "left", color: '#00ff00'};
                this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+205, answers.val()["A"], style);
            } else {
                style = {fontFamily: 'barthowheel', fontSize: "35px", wordWrap: {width: 200, useAdvancedWrap: true}, align: "left", color: '#00ff00'};
                this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+220, answers.val()["A"], style);
            }
        } else {
            if (answers.val()["A"].length > 15) {
                fontSize = 500/(answers.val()["A"].length) < 23 ? 23 : 500/(answers.val()["A"].length);
                style = {fontFamily: 'barthowheel', fontSize: fontSize + "px", wordWrap: {width: 200, useAdvancedWrap: true}, align: "left", color: '#ffffff'};
                this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+205, answers.val()["A"], style);
            } else {
                style = {fontFamily: 'barthowheel', fontSize: "35px", wordWrap: {width: 200, useAdvancedWrap: true}, align: "left", color: '#ffffff'};
                this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+220, answers.val()["A"], style);
            }
        } 

        this.answerB = this.add.image(this.triviaBoard.x + 150, this.triviaBoard.y+230, "woodenAnswerB").setScale(.25);
        if ("B" === correctAnswer) {
            if (answers.val()["B"].length > 15) {
                fontSize = 500/(answers.val()["B"].length) < 23 ? 23 : 500/(answers.val()["B"].length);
                style = {fontFamily: 'barthowheel', fontSize: fontSize + "px", wordWrap: {width: 200, useAdvancedWrap: true}, align: "left", color: '#00ff00'};
                this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+205, answers.val()["B"], style);
            } else {
                style = {fontFamily: 'barthowheel', fontSize: "35px", wordWrap: {width: 200, useAdvancedWrap: true}, align: "left", color: '#00ff00'};
                this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+220, answers.val()["B"], style);
            }
        } else {
            if (answers.val()["B"].length > 15) {
                fontSize = 500/(answers.val()["B"].length) < 23 ? 23 : 500/(answers.val()["B"].length);
                style = {fontFamily: 'barthowheel', fontSize: fontSize + "px", wordWrap: {width: 200, useAdvancedWrap: true}, align: "left", color: '#ffffff'};
                this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+205, answers.val()["B"], style);
            } else {
                style = {fontFamily: 'barthowheel', fontSize: "35px", wordWrap: {width: 200, useAdvancedWrap: true}, align: "left", color: '#ffffff'};
                this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+220, answers.val()["B"], style);
            }
        }
        
        this.answerC = this.add.image(this.triviaBoard.x - 175, this.triviaBoard.y+330, "woodenAnswerC").setScale(.25);
        if ("C" === correctAnswer) {
            if (answers.val()["C"].length > 15) {
                fontSize = 500/(answers.val()["C"].length) < 23 ? 23 : 500/(answers.val()["C"].length);
                style = {fontFamily: 'barthowheel', fontSize: fontSize + "px", wordWrap: {width: 200, useAdvancedWrap: true}, align: "left", color: '#00ff00'};
                this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+305, answers.val()["C"], style);
            } else {
                style = {fontFamily: 'barthowheel', fontSize: "35px", wordWrap: {width: 200, useAdvancedWrap: true}, align: "left", color: '#00ff00'};
                this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+320, answers.val()["C"], style);
            }
        } else {
            if (answers.val()["C"].length > 15) {
                fontSize = 500/(answers.val()["C"].length) < 23 ? 23 : 500/(answers.val()["C"].length);
                style = {fontFamily: 'barthowheel', fontSize: fontSize + "px", wordWrap: {width: 200, useAdvancedWrap: true}, align: "left", color: '#ffffff'};
                this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+305, answers.val()["C"], style);
            } else {
                style = {fontFamily: 'barthowheel', fontSize: "35px", wordWrap: {width: 200, useAdvancedWrap: true}, align: "left", color: '#ffffff'};
                this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+320, answers.val()["C"], style);
            }
        }

        this.answerD = this.add.image(this.triviaBoard.x + 150, this.triviaBoard.y+330, "woodenAnswerD").setScale(.25);
        if ("D" === correctAnswer) {
            if (answers.val()["D"].length > 15) {
                fontSize = 500/(answers.val()["D"].length) < 23 ? 23 : 500/(answers.val()["D"].length);
                style = {fontFamily: 'barthowheel', fontSize: fontSize + "px", wordWrap: {width: 200, useAdvancedWrap: true}, align: "left", color: '#00ff00'};
                this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+305, answers.val()["D"], style);
            } else {
                style = {fontFamily: 'barthowheel', fontSize: "35px", wordWrap: {width: 200, useAdvancedWrap: true}, align: "left", color: '#00ff00'};
                this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+320, answers.val()["D"], style);
            }
        } else {
            if (answers.val()["D"].length > 15) {
                fontSize = 500/(answers.val()["D"].length) < 23 ? 23 : 500/(answers.val()["D"].length);
                style = {fontFamily: 'barthowheel', fontSize: fontSize + "px", wordWrap: {width: 200, useAdvancedWrap: true}, align: "left", color: '#ffffff'};
                this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+305, answers.val()["D"], style);
            } else {
                style = {fontFamily: 'barthowheel', fontSize: "35px", wordWrap: {width: 200, useAdvancedWrap: true}, align: "left", color: '#ffffff'};
                this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+320, answers.val()["D"], style);
            }
        }
    }

    update() {
        // If more than one player has finished all the stages, open the nextPlayer scene
        if (gameState.getWinState() > 1) {
            if (this.timedEvent.repeatCount == 0 && !this.timesUp) {
                this.openScene("nextPlayer");
                this.timesUp = true;
            }
        } else {
            // If nobody has finished all the stages yet and this player has not finished this stage, open the triviaScene
            if (this.timedEvent.repeatCount == 0 && !this.timesUp && !this.threeCorrect) {
                this.openScene("trivia");
                this.timesUp = true;
            }
            // If nobody has finished all the stages yet and this player has finished the stage, open the newStage scene
            if (this.timedEvent.repeatCount == 0 && gameState.getNumberCorrect(gameState.getCurrentPlayer()) == 3 && !this.timesUp && this.threeCorrect) {
                this.openScene("newStage");
            }
        }
    }
}