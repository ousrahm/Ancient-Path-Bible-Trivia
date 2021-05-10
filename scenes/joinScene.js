class JoinScene extends Phaser.Scene {
    constructor() {
        super("joinGame");
    }

    async create() {
        openedJoinScene = true;

        // Creates constants for the middle of the x and y axes of the scene
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // Prints a prompt and arrow 
        var prompt = this.add.text(screenCenterX, screenCenterY, "Please enter your game code below.", {fontFamily: 'balbeer', fontSize: "70px", align: "center", color: 'black'}).setOrigin(.5);
        var arrow = this.add.text(screenCenterX, screenCenterY + 200, "↓", {fontFamily: 'balbeer', fontSize: "100px", align: "center", color: 'black'}).setOrigin(.5);

        // Connects an interactive back button with hiding an input box and opening the menu scene again.
        const backButton = this.add.text(50, screenCenterY - 250, "BACK", {fontFamily: 'balbeer', fontSize: "40px", fill: "black"}).setInteractive().on('pointerup', () => { 
            document.getElementById('codeBox').style.visibility = "hidden";
            document.getElementById('enterCode').style.visibility = "hidden";
            openedJoinScene = false;
            this.openScene("menu"); 
        });
        
        // Makes an input box and enter button visible
        document.getElementById('codeBox').style.visibility = "visible";
        document.getElementById('enterCode').style.visibility = "visible";

        // Prints a next button for the player to move to the next scene
        var nextScene = this.add.text(screenCenterX + 450, screenCenterY - 250, "NEXT", {fontFamily: 'balbeer', fontSize: "40px", align: "center", color: 'black'}).setInteractive().on('pointerup', async () => { 
            // Once the button is pressed, add one to the joined variable in the database
            try {
                var getJoined = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("joined").get();

            } catch (error) {
                this.add.text(screenCenterX, screenCenterY+1, "________________________________", {fontFamily: 'balbeer', fontSize: "70px", align: "center", color: 'black'}).setOrigin(.5);
                return;
            }
            gameState.setMyPlayer(getJoined.val());
            await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("joined").set(getJoined.val()+1);    
            // Open the naming scene
            this.openScene("naming") 
            
        });
    }

    /**
     * Starts the scene of the specified name.
     * @param {String} nameOfScene 
     */
    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }

    update() {

    }
}