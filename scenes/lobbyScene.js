class lobbyScene extends Phaser.Scene {
    constructor() {
        super("lobbyGame");
    }

    async create() {

        // const backButton = this.add.text(20, 20, "BACK", {fontFamily: 'balbeer', fontSize: "30px", align: "center", color: 'black'}).setInteractive().on('pointerup', () => { this.openScene("menu") });

        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        var prompt = this.add.text(this.screenCenterX, this.screenCenterY - 200, "Lobby Code:"+gameState.getGameCode(), {fontFamily: 'balbeer', fontSize: "70px", align: "center", color: 'black'}).setOrigin(.5);
 
        var focus = this.add.text(50, this.screenCenterY, "ATTENTION: Changing tabs/leaving your browser during the game will cause issues.", {fontFamily: 'balbeer', wordWrap: {width: 300, useAdvancedWrap: true}, fontSize: "30px", align: "center", color: 'black'})
        
        this.timedEvent = this.time.addEvent({ delay: 1000, callbackScope: this, repeat: 20});

        this.startedListener = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child('started').on('value', async (snapshot) => {
            if (snapshot.val() && gameState.getMyPlayer() !== 0) {
                for (let i = 0; i < 4; i++) {
                    await gameState.changePlayerName(i);
                }
                this.openScene('trivia');
            }
        })

    }

    openScene(nameOfScene){
        database.ref("promised-land-journey-game").child(gameState.getGameCode()).child('started').off("value", this.startedListener);
        this.scene.start(nameOfScene);
    }
    // Uncaught (in promise) TypeError: Cannot read property 'joined' of null
    // at lobbyScene.printPlayers (lobbyScene.js:37
    
    async printPlayers() {
        var gameObject = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).get();
        var numJoined = gameObject.val()["joined"];

        if (typeof this.texts !== 'undefined') {
            for (let i = 0; i < this.texts.length; i++) {
                this.texts[i].destroy();
            }
        }
        this.texts = [];
        
        for (let i = 0; i < numJoined; i++) {
            var player = "P" + (i+1);
            this.texts.push(this.add.text(this.screenCenterX, this.screenCenterY-(50 - i*70), "P" + (i+1) + ": " + gameObject.val()[player], {fontFamily: 'balbeer', fontSize: "50px", align: "center", color: 'black'}).setOrigin(0.5));
        }

        if (numJoined == gameState.getNumberOfPlayers() && gameState.getMyPlayer() === 0) {
            this.readyButton = this.add.text(this.screenCenterX, this.screenCenterY + 270, "READY", {fontFamily: 'balbeer', fontSize: "50px", align: "center", color: 'black'}).setOrigin(0.5);
            this.readyButton.setInteractive().on('pointerup', async () => {

                for (let i = 0; i < 4; i++) {
                    gameState.changePlayerName(i);
                }
                
                await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child('started').set(true);
                this.openScene('trivia')
                
            });
        }
    }

    async update() {
        if (this.timedEvent.repeatCount % 3 == 0){
            this.printPlayers();
        }

    }
}