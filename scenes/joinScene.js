class JoinScene extends Phaser.Scene {
    constructor() {
        super("joinGame");
    }

    create() {
        
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        var prompt = this.add.text(screenCenterX, screenCenterY, "Please enter your game code below.", {fontFamily: 'balbeer', fontSize: "70px", align: "center", color: '#ffffff'}).setOrigin(.5);
        var arrow = this.add.text(screenCenterX, screenCenterY + 200, "↓", {fontFamily: 'balbeer', fontSize: "100px", align: "center", color: '#ffffff'}).setOrigin(.5);


        const backButton = this.add.text(20, 20, "Back", {font: "bold 30px Arial", fill: "white"}).setInteractive().on('pointerup', () => { 
            document.getElementById('codeBox').style.visibility = "hidden";
            document.getElementById('enterCode').style.visibility = "hidden";
            this.openScene("menu"); 
        });
        
        document.getElementById('codeBox').style.visibility = "visible";
        document.getElementById('enterCode').style.visibility = "visible";

        
        var nextScene = this.add.text(screenCenterX + 450, screenCenterY - 250, "NEXT", {fontFamily: 'balbeer', fontSize: "40px", align: "center", color: '#ffffff'}).setInteractive().on('pointerup', async () => { 
            var getJoined = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("joined").get();
            gameState.setMyPlayer(getJoined.val());
            await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("joined").set(getJoined.val()+1);    
            this.openScene("naming") 
        });

    }

    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }

    update() {

    }
}