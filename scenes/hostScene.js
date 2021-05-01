/**
 * This class holds the host scene which will set a game code, prompt the host for the number of players in the game,
 * and set up the game in the database and in the GameState class.
 */
class HostScene extends Phaser.Scene {
    constructor() {
        super('hostGame');
    }

    preload() {
    }

    async create() {
        // Prints an interactive back button to the scene
        const backButton = this.add.text(20, 20, "Back", {font: "bold 30px Arial", fill: "white"}).setInteractive().on('pointerup', () => { 
            this.openScene("menu"); 
        });

        // Grabs a reference to the database
        var gameRef = database.ref("promised-land-journey-game");

        // Grabs the current code of the game
        var getCall = await gameRef.child('gameCode').get();
        var gameCode = getCall.val()
        
        // If the code of the game is JJJJ, reset the code to AAAA
        if (gameCode === "JJJJ") {
            await gameRef.child('gameCode').set("AAAA");
        // If the code is not JJJJ, increment the code by one letter
        } else {
            var code = this.incrementCode(gameCode);
            await gameRef.child('gameCode').set(code);
        }
        gameState.setUpGameCode();

        // Constants for the center of the x and y axes of the scene
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // Prints text telling player to click on the number of players for a game
        var style = {fontFamily: 'balbeer', fontSize: "150px", align: "center", color: '#ffffff'}
        this.add.text(screenCenterX, screenCenterY-200, "Click on the number of players...", {fontFamily: 'balbeer', fontSize: "70px", align: "center", color: '#ffffff'}).setOrigin(.5);
        
        // Prints interactive number buttons to the screen (2, 3, 4)
        var num2 = this.add.text(screenCenterX - 200, screenCenterY, "2", style).setOrigin(.5);
        var num3 = this.add.text(screenCenterX, screenCenterY, "3", style).setOrigin(.5);
        var num4 = this.add.text(screenCenterX + 200, screenCenterY, "4", style).setOrigin(.5);

        // Once a number is selected, sets a game up with that number of players
        num2.setInteractive().on('pointerup', () => { this.setUpGame(2) });
        num3.setInteractive().on('pointerup', () => { this.setUpGame(3) });
        num4.setInteractive().on('pointerup', () => { this.setUpGame(4) });

    }

    /**
     * Function:
     *  Creates a new game in the database and sets it with the right values
     *  Sets up an instance of GameState with the correct values
     *  Adds one to the number of players that have joined the game
     *  Opens namingScene
     * @param {Number} numberOfPlayers 
     */
    async setUpGame(numberOfPlayers) {
        var game = database.ref("promised-land-journey-game").child(gameState.getGameCode());
        game.set({
            "Player Number": numberOfPlayers,
            "P1": "Player 1",
            "P2": "Player 2",
            "P3": "Player 3",
            "P4": "Player 4",
            "turn": 0,
            "joined": 0,
            "started": false,
            "retrievedQuestion": false,
            "question": "",
            "answers": {
                "A": "",
                "B": "",
                "C": "",
                "D": ""  
            },
            "correctAnswer": "",
            "selectedAnswer": "",
            "skippedStoryline": false

        })
        gameState.setUpGameState(numberOfPlayers); 

        var getJoined = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("joined").get();
        gameState.setMyPlayer(getJoined.val());
        await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("joined").set(getJoined.val()+1);    

        this.openScene("naming");
    }

    /**
     * Converts 4-char long string to a number, increments it, then converts it back to a 4-char long string and returns it.
     * @param {String} gameCode 
     * @returns String
     */
     incrementCode(gameCode) {
        var oldString = Array.from(gameCode);
        var letToNum = {
            "A": 0,
            "B": 1,
            "C": 2,
            "D": 3,
            "E": 4,
            "F": 5,
            "G": 6,
            "H": 7,
            "I": 8,
            "J": 9
        };

        var numCode = (letToNum[oldString[0]] * 1000) + (letToNum[oldString[1]]*100) + (letToNum[oldString[2]]*10) + (letToNum[oldString[3]]);
        numCode++;

        var numToLet = {
            0: "A",
            1: "B",
            2: "C",
            3: "D",
            4: "E",
            5: "F",
            6: "G",
            7: "H",
            8: "I",
            9: "J"
        };
        var newString = "";

        var length = 4; 

        if (numCode < 1000) { length--; }
        if (numCode < 100) { length--; }
        if (numCode < 10) { length--; }

        for (let i = 0; i < length; i++) {
            var str = String(numCode).charAt(i);
            var strNum = Number(str);
            newString += numToLet[strNum];
        }

        while (newString.length < 4) {
            newString = "A" + newString;
        }

        return newString;
    }


    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }

    update() {
    }
}