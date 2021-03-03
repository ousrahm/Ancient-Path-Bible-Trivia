
var config = {
    width: 1200,
    height: 600,
    backgroundColor: 0x0000000,
    scene: [LoadingScene, MenuScene, HostScene, JoinScene]
}
window.onload = function() {
    // Created a new Game instance that we can configure
    var game = new Phaser.Game(config);
}
