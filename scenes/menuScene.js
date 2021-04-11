class MenuScene extends Phaser.Scene {
    constructor() {
        // calling super makes this class inherit characteristics from its predecessor, the Scene class from Phaser
        // we are calling it playGame bc we will use this to play the game 
        super("menu");
    } 

    preload(){ 
        // this.load.video('desertLoop', 'images/desertLoopNoAudio.mp4', 'loadeddata', false, true);
        this.load.image("triviaBoard", 'images/wooden buttons/woodenBoard.png');
        this.load.image("woodenAnswerA", "images/wooden buttons/woodenAnswerA.png");
        this.load.image("woodenAnswerB", "images/wooden buttons/woodenAnswerB.png");
        this.load.image("woodenAnswerC", "images/wooden buttons/woodenAnswerC.png");
        this.load.image("woodenAnswerD", "images/wooden buttons/woodenAnswerD.png");
    }

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        
        // Background
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "desertBackground")
        this.background.setOrigin(0,0);

        // Sign to hold menu buttons
        this.menuSign = this.add.image(screenCenterX, screenCenterY + 80, "menuSign").setOrigin(.5);
        this.menuSign.setScale(.5)
    
        // Game title text
        this.add.text(screenCenterX, screenCenterY - 120, "Promised Land", {fontSize: '100px', fontFamily: "balbeer", fill: "white"}).setOrigin(.5);
        this.add.text(screenCenterX, screenCenterY - 30, "Journey", {fontSize: '90px', fontFamily: "balbeer", fill: "white"}).setOrigin(.5);

        var style1 = {fontSize: '80px', fontFamily: "honest", fill: "white"};

        // Host text
        const hostButton = this.add.text(screenCenterX - 170, screenCenterY + 100, "HOST", style1).setOrigin(.5);
        hostButton.setInteractive().on('pointerup', () => { this.openScene("hostGame") });
        
        // Join text
        const joinButton = this.add.text(screenCenterX + 170, screenCenterY + 100, "JOIN", style1).setOrigin(.5)
        joinButton.setInteractive().on('pointerup', () => { this.openScene("joinGame") });

        // Temporary Start Trivia Button to take user to trivia question
        const startTrivia = this.add.text(40, 40, "trivia", {font: "bold 40px balbeer", fill: "white"}).setInteractive().on('pointerup', () => { this.openScene("input") });

    }

    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }

    update() {
        

    }
}