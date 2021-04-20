
class namingScene extends Phaser.Scene {
    constructor() {
        super("naming");
    }

    preload() {
        
    }

    async create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        var prompt = this.add.text(screenCenterX, screenCenterY, "Please enter your name below.", {fontFamily: 'balbeer', fontSize: "70px", align: "center", color: '#ffffff'}).setOrigin(.5);
        var arrow = this.add.text(screenCenterX, screenCenterY + 200, "↓", {fontFamily: 'balbeer', fontSize: "100px", align: "center", color: '#ffffff'}).setOrigin(.5);

        document.getElementById('nameBox').style.visibility = "visible";
        document.getElementById('enterButton').style.visibility = "visible";

        var getJoined = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("joined").get();
        gameState.setMyPlayer(getJoined.val());
        await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("joined").set(getJoined.val()+1);

        
        var nextScene = this.add.text(screenCenterX + 450, screenCenterY - 250, "NEXT", {fontFamily: 'balbeer', fontSize: "40px", align: "center", color: '#ffffff'}).setInteractive().on('pointerup', () => { this.openScene("lobbyGame") });
    }

    /**
     * openScene(nameOfScene):
     * Starts the scene of the specified name.
     * @param {String} nameOfScene 
     */
    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }

    
    update() {
        

    }
}


