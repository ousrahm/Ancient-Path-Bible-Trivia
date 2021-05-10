/**
 * This class holds the naming scene which allows a player to enter their name 
 * after the host and join scenes.
 */
class namingScene extends Phaser.Scene {
    constructor() {
        super("naming");
    }

    preload() {
        
    }

    async create() {
        openedNamingScene = true;

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        var prompt = this.add.text(screenCenterX, screenCenterY, "Please enter your name below.", {fontFamily: 'balbeer', fontSize: "70px", align: "center", color: 'black'}).setOrigin(.5);
        var arrow = this.add.text(screenCenterX, screenCenterY + 200, "↓", {fontFamily: 'balbeer', fontSize: "100px", align: "center", color: 'black'}).setOrigin(.5);

        document.getElementById('nameBox').style.visibility = "visible";
        document.getElementById('enterButton').style.visibility = "visible";

        
        
        var nextScene = this.add.text(screenCenterX + 450, screenCenterY - 250, "NEXT", {fontFamily: 'balbeer', fontSize: "40px", align: "center", color: 'black'})
        nextScene.setInteractive().on('pointerup', async () => { 

            this.openScene("lobbyGame");
        });
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


