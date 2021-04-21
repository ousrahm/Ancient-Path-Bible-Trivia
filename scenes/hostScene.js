class HostScene extends Phaser.Scene {
    constructor() {
        super('hostGame');
    }

    preload() {
    }

    async create() {

        const backButton = this.add.text(20, 20, "Back", {font: "bold 30px Arial", fill: "white"}).setInteractive().on('pointerup', () => { 
            this.openScene("menu"); 
        });

        var gameRef = database.ref("promised-land-journey-game");
        var getCall = await gameRef.child('gameCode').get();
        var gameCode = getCall.val()
        if (gameCode === "JJJJ") {
            await gameRef.child('gameCode').set("AAAA");
        } else {
            var code = this.incrementCode(gameCode);
            await gameRef.child('gameCode').set(code);
        }
        gameState.setUpGameCode();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        var style = {fontFamily: 'balbeer', fontSize: "150px", align: "center", color: '#ffffff'}

        this.add.text(screenCenterX, screenCenterY-200, "Click on the number of players...", {fontFamily: 'balbeer', fontSize: "70px", align: "center", color: '#ffffff'}).setOrigin(.5);
        
        var num2 = this.add.text(screenCenterX - 200, screenCenterY, "2", style).setOrigin(.5);
        var num3 = this.add.text(screenCenterX, screenCenterY, "3", style).setOrigin(.5);
        var num4 = this.add.text(screenCenterX + 200, screenCenterY, "4", style).setOrigin(.5);

        num2.setInteractive().on('pointerup', () => { this.setUpGame(2) });
        num3.setInteractive().on('pointerup', () => { this.setUpGame(3) });
        num4.setInteractive().on('pointerup', () => { this.setUpGame(4) });

    }

    async setUpGame(numberOfPlayers) {
        /**
         * Started a new game in the database.
         * Grabbed the reference value to that game.
         * Set up a new GameState instance with the number of players and the reference value.
         */
        var game = database.ref("promised-land-journey-game").child(gameState.getGameCode());
        game.set({
            "Player Number": numberOfPlayers,
            "P1": "Player 1",
            "P2": "Player 2",
            "P3": "Player 3",
            "P4": "Player 4",
            "turn": 0,
            "joined": 0,
            "started": false

        })
        gameState.setUpGameState(numberOfPlayers); 
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