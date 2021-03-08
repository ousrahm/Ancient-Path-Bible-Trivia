class MenuScene extends Phaser.Scene {
    constructor() {
        // calling super makes this class inherit characteristics from its predecessor, the Scene class from Phaser
        // we are calling it playGame bc we will use this to play the game 
        super("menu");
    }

    create() {
        // Background
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "desertBackground")
        this.background.setOrigin(0,0);

        // Sign to hold menu buttons
        this.menuSign = this.add.image(config.width/2, config.height/2+30, "menuSign");
        this.menuSign.setScale(.5)
    
        // Game title text
        this.add.text(235, 120, "Promised Land Journey", {
            font: "70px Arial", 
            fill: "white"
        });

        // Host text
        const hostButton = this.add.text(350, 320, "HOST", {font: "bold 70px Arial", fill: "white"}).setInteractive().on('pointerup', () => { this.openScene("hostGame") });
        
        // Join text
        const joinButton = this.add.text(650, 320, "JOIN", {font: "bold 70px Arial", fill: "white"}).setInteractive().on('pointerup', () => { this.openScene("joinGame") });;

        // Settings Rock
        this.settingRock = this.add.image(80, config.height-28, "settingRock")
        this.settingRock.setScale(.15)

        // Temporary Start Trivia Button to take user to trivia question
        const startTrivia = this.add.text(40, 40, "Trivia", {font: "bold 40px Arial", fill: "white"}).setInteractive().on('pointerup', () => { this.openScene("trivia") });

    }

    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }

    update() {
        

    }
}