class lobbyScene extends Phaser.Scene {
    constructor() {
        super("lobbyGame");
    }

    async create() {

        const backButton = this.add.text(20, 20, "Back", {font: "bold 30px Arial", fill: "white"}).setInteractive().on('pointerup', () => { this.openScene("menu") });

        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        var prompt = this.add.text(this.screenCenterX, this.screenCenterY - 200, "Lobby Code:"+gameState.getGameCode(), {fontFamily: 'balbeer', fontSize: "70px", align: "center", color: '#ffffff'}).setOrigin(.5);
 
        this.timedEvent = this.time.addEvent({ delay: 1000, callbackScope: this, repeat: 20});

        
        
    }

    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }
    
    async printPlayers() {
        var gameObject = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).get();
        var numJoined = gameObject.val()["joined"];
        for (let i = 0; i < numJoined; i++) {
            var player = "P" + (i+1);
            this.add.text(this.screenCenterX, this.screenCenterY-(50 - i*70), "P" + (i+1) + ": " + gameObject.val()[player], {fontFamily: 'balbeer', fontSize: "50px", align: "center", color: '#ffffff'}).setOrigin(0.5);
        }

        if (numJoined == gameState.getNumberOfPlayers()) {
            this.readyButton = this.add.text(this.screenCenterX, this.screenCenterY + 270, "READY", {fontFamily: 'balbeer', fontSize: "50px", align: "center", color: '#ffffff'}).setOrigin(0.5);
            this.readyButton.setInteractive().on('pointerup', () => { this.openScene('trivia')});
        }
    }

    update() {
        if (this.timedEvent.repeatCount % 3 == 0){
            this.printPlayers();
        }

    }
}