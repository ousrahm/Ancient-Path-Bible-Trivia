class lobbyScene extends Phaser.Scene {
    constructor() {
        super("lobbyGame");
    }

    async create() {
        this.add.text(650, 320, "Lobby", {
            font: "bold 70px Arial", 
            fill: "white"
        });

        const backButton = this.add.text(20, 20, "Back", {font: "bold 30px Arial", fill: "white"}).setInteractive().on('pointerup', () => { this.openScene("menu") });

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        var prompt = this.add.text(screenCenterX, screenCenterY, "Lobby Code:"+gameState.getGameCode(), {fontFamily: 'balbeer', fontSize: "70px", align: "center", color: '#ffffff'}).setOrigin(.5);
        
      

    }

    openScene(nameOfScene){
        this.scene.start(nameOfScene);
    }

    

    update() {

    }
}