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
        if (!document.getElementById('backgroundCheckBox').checked) {
            var backgroundName = gameState.getCurrentStageName(gameState.getCurrentPlayer());
            this.background = this.add.video(0, 0, backgroundName).setOrigin(0,0);
            this.background.displayHeight = config.height;
            this.background.displayWidth = config.width;
            this.background.play();
        }

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

        // Creates timer
        this.timedEvent = this.time.addEvent({ delay: 3000, callbackScope: this, repeat: 1 });
        this.timesUp = false;

        // Adds one to numberAnswered array of current player
        const currentPlayer = gameState.getCurrentPlayer();
        gameState.addNumberAnswered(currentPlayer);

        var selectRef = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child('selectedAnswer').get();

        // Prints a message to the scene
        var responses = ["Nice try! ", "Sorry! ", "Bummer! ", "Not this time! "];
        var texts;
        if (selectRef.val() === "") {
            texts = responses[this.getRandomInt(4)] + "The timer ran out!";
        } else {
            texts = responses[this.getRandomInt(4)] + "Incorrect answer.";
        }
        var style = {fontFamily: 'balbeer', fontSize: "30px", align: "center", color: '#ffffff'}
        this.add.text(screenCenterX, 20, texts, style).setOrigin(.5);

        // Sets retrievedQuestion in database to false
        // Sets selectedAnswer in database back to an empty string
        if (gameState.getMyPlayer() === 0) {
            await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child('retrievedQuestion').set(false);
            // await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("selectedAnswer").set("");
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
    async openScene(nameOfScene){
        if (gameState.getMyPlayer() === 0) {
            await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("selectedAnswer").set("");
        }
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
            var fontSize;
            var style;
            
            this.answerA = this.add.image(this.triviaBoard.x - 175, this.triviaBoard.y+230, "woodenAnswerA").setScale(.25);
            if ("A" === correctAnswer) {
                if (answers.val()["A"].length > 15) {
                    fontSize = 500/(answers.val()["A"].length) < 23 ? 23 : 500/(answers.val()["A"].length);
                    style = {fontFamily: 'barthowheel', fontSize: fontSize + "px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#00ff00'};
                    this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+200, answers.val()["A"], style);
                } else {
                    style = {fontFamily: 'barthowheel', fontSize: "30px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#00ff00'};
                    this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+220, answers.val()["A"], style);
                }
            } else if ("A" === selectedAnswer) {
                if (answers.val()["A"].length > 15) {
                    fontSize = 500/(answers.val()["A"].length) < 23 ? 23 : 500/(answers.val()["A"].length);
                    style = {fontFamily: 'barthowheel', fontSize: fontSize + "px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#ff0000'};
                    this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+200, answers.val()["A"], style);
                } else {
                    style = {fontFamily: 'barthowheel', fontSize: "30px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#ff0000'};
                    this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+220, answers.val()["A"], style);
                }
            } else {
                if (answers.val()["A"].length > 15) {
                    fontSize = 500/(answers.val()["A"].length) < 23 ? 23 : 500/(answers.val()["A"].length);
                    style = {fontFamily: 'barthowheel', fontSize: fontSize + "px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#ffffff'};
                    this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+200, answers.val()["A"], style);
                } else {
                    style = {fontFamily: 'barthowheel', fontSize: "30px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#ffffff'};
                    this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+220, answers.val()["A"], style);
                }
            }
    
            this.answerB = this.add.image(this.triviaBoard.x + 150, this.triviaBoard.y+230, "woodenAnswerB").setScale(.25);
            if ("B" === correctAnswer) {
                if (answers.val()["B"].length > 15) {
                    fontSize = 500/(answers.val()["B"].length) < 23 ? 23 : 500/(answers.val()["B"].length);
                    style = {fontFamily: 'barthowheel', fontSize: fontSize + "px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#00ff00'};
                    this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+200, answers.val()["B"], style);
                } else {
                    style = {fontFamily: 'barthowheel', fontSize: "30px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#00ff00'};
                    this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+220, answers.val()["B"], style);
                }
            } else if ("B" === selectedAnswer) {
                if (answers.val()["B"].length > 15) {
                    fontSize = 500/(answers.val()["B"].length) < 23 ? 23 : 500/(answers.val()["B"].length);
                    style = {fontFamily: 'barthowheel', fontSize: fontSize + "px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#ff0000'};
                    this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+200, answers.val()["B"], style);
                } else {
                    style = {fontFamily: 'barthowheel', fontSize: "30px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#ff0000'};
                    this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+220, answers.val()["B"], style);
                }
            } else {
                if (answers.val()["B"].length > 15) {
                    fontSize = 500/(answers.val()["B"].length) < 23 ? 23 : 500/(answers.val()["B"].length);
                    style = {fontFamily: 'barthowheel', fontSize: fontSize + "px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#ffffff'};
                    this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+200, answers.val()["B"], style);
                } else {
                    style = {fontFamily: 'barthowheel', fontSize: "30px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#ffffff'};
                    this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+220, answers.val()["B"], style);
                }
            }
            
            this.answerC = this.add.image(this.triviaBoard.x - 175, this.triviaBoard.y+330, "woodenAnswerC").setScale(.25);
            if ("C" === correctAnswer) {
                if (answers.val()["C"].length > 15) {
                    fontSize = 500/(answers.val()["C"].length) < 23 ? 23 : 500/(answers.val()["C"].length);
                    style = {fontFamily: 'barthowheel', fontSize: fontSize + "px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#00ff00'};
                    this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+300, answers.val()["C"], style);
                } else {
                    style = {fontFamily: 'barthowheel', fontSize: "30px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#00ff00'};
                    this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+320, answers.val()["C"], style);
                }
            } else if ("C" === selectedAnswer) {
                if (answers.val()["C"].length > 15) {
                    fontSize = 500/(answers.val()["C"].length) < 23 ? 23 : 500/(answers.val()["C"].length);
                    style = {fontFamily: 'barthowheel', fontSize: fontSize + "px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#ff0000'};
                    this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+300, answers.val()["C"], style);
                } else {
                    style = {fontFamily: 'barthowheel', fontSize: "30px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#ff0000'};
                    this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+320, answers.val()["C"], style);
                }
            }else {
                if (answers.val()["C"].length > 15) {
                    fontSize = 500/(answers.val()["C"].length) < 23 ? 23 : 500/(answers.val()["C"].length);
                    style = {fontFamily: 'barthowheel', fontSize: fontSize + "px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#ffffff'};
                    this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+300, answers.val()["C"], style);
                } else {
                    style = {fontFamily: 'barthowheel', fontSize: "30px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#ffffff'};
                    this.add.text(this.triviaBoard.x - 260, this.triviaBoard.y+320, answers.val()["C"], style);
                }
            }
    
            this.answerD = this.add.image(this.triviaBoard.x + 150, this.triviaBoard.y+330, "woodenAnswerD").setScale(.25);
            if ("D" === correctAnswer) {
                if (answers.val()["D"].length > 15) {
                    fontSize = 500/(answers.val()["D"].length) < 23 ? 23 : 500/(answers.val()["D"].length);
                    style = {fontFamily: 'barthowheel', fontSize: fontSize + "px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#00ff00'};
                    this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+300, answers.val()["D"], style);
                } else {
                    style = {fontFamily: 'barthowheel', fontSize: "30px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#00ff00'};
                    this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+320, answers.val()["D"], style);
                }
            } else if ("D" === selectedAnswer) {
                if (answers.val()["D"].length > 15) {
                    fontSize = 500/(answers.val()["D"].length) < 23 ? 23 : 500/(answers.val()["D"].length);
                    style = {fontFamily: 'barthowheel', fontSize: fontSize + "px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#ff0000'};
                    this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+300, answers.val()["D"], style);
                } else {
                    style = {fontFamily: 'barthowheel', fontSize: "30px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#ff0000'};
                    this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+320, answers.val()["D"], style);
                }
            } else {
                if (answers.val()["D"].length > 15) {
                    fontSize = 500/(answers.val()["D"].length) < 23 ? 23 : 500/(answers.val()["D"].length);
                    style = {fontFamily: 'barthowheel', fontSize: fontSize + "px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#ffffff'};
                    this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+300, answers.val()["D"], style);
                } else {
                    style = {fontFamily: 'barthowheel', fontSize: "30px", wordWrap: {width: 210, useAdvancedWrap: true}, align: "left", color: '#ffffff'};
                    this.add.text(this.triviaBoard.x + 70, this.triviaBoard.y+320, answers.val()["D"], style);
                }
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