/**
 * This class holds the menu scene. The menu scene will allow a user to host or join a game.
 */
class MenuScene extends Phaser.Scene {
    constructor() {
        // calling super makes this class inherit characteristics from its predecessor, the Scene class from Phaser
        // we are calling it playGame bc we will use this to play the game 
        super("menu");
    } 

    preload(){ 
        this.load.image("triviaBoard", 'images/triviaBoard.png');
        this.load.image("woodenAnswerA", "images/woodenAnswerA.png");
        this.load.image("woodenAnswerB", "images/woodenAnswerB.png");
        this.load.image("woodenAnswerC", "images/woodenAnswerC.png");
        this.load.image("woodenAnswerD", "images/woodenAnswerD.png");
    }

    create() {
        document.getElementById('checkBoxDiv').style.visibility= "visible";

        // Creates constants for the middle of the x and y axes of the scene
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        
        // Adds desert background
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "desertBackground")
        this.background.setOrigin(0,0);

        // Adds sign to hold menu buttons
        this.menuSign = this.add.image(screenCenterX, screenCenterY + 80, "menuSign").setOrigin(.5);
        this.menuSign.setScale(.5)
    
        // Prints game title text
        this.add.text(screenCenterX, screenCenterY - 120, "Ancient Path", {fontSize: '100px', fontFamily: "balbeer", fill: "white"}).setOrigin(.5);
        this.add.text(screenCenterX, screenCenterY - 30, "Bible Trivia", {fontSize: '90px', fontFamily: "balbeer", fill: "white"}).setOrigin(.5);

        var style1 = {fontSize: '80px', fontFamily: "honest", fill: "white"};

        // Host text
        const hostButton = this.add.text(screenCenterX - 170, screenCenterY + 100, "HOST", style1).setOrigin(.5);
        hostButton.setInteractive().on('pointerup', () => { this.openScene("hostGame") });
        
        // Join text
        const joinButton = this.add.text(screenCenterX + 170, screenCenterY + 100, "JOIN", style1).setOrigin(.5)
        joinButton.setInteractive().on('pointerup', () => { this.openScene("joinGame") });
    }

    /**
     * Starts the scene of the specified name.
     * @param {String} nameOfScene 
     */
    openScene(nameOfScene){
        document.getElementById('checkBoxDiv').style.visibility= "hidden";
        this.scene.start(nameOfScene);
    }

    update() {
        

    }
}