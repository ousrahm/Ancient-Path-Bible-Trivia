
var database = firebase.database();



var config = {
    width: 1200,
    height: 600,
    backgroundColor: 0x0000000,
    scale: { parent: 'mygame', autoCenter: Phaser.Scale.CENTER_BOTH }, 
    scene: [LoadingScene, MenuScene, HostScene, JoinScene, TriviaScene, CorrectScene, IncorrectScene, newStageScene, nextPlayerScene, victoryScene, lobbyScene, StoryLine, TieScene, TrueTieScene, namingScene]
}

window.onload = function() {
    // Created a new Game instance that we can configure
    var game = new Phaser.Game(config);
    
    // Handler for naming box and naming enter button
    document.getElementById('enterButton').addEventListener("mouseup", 
    function(){
        var name = document.getElementById('nameBox').value;

        var player = 'P'+(gameState.getMyPlayer()+1);
        var playerRef = database.ref("promised-land-journey-game").child(gameState.getGameCode()).child(player);
        playerRef.set(name);

        gameState.changePlayerName(0);

        document.getElementById('nameBox').style.visibility= "hidden";
        document.getElementById('enterButton').style.visibility="hidden";
    });

    // Handler for code box and code enter button
    document.getElementById('enterCode').addEventListener("mouseup", 
    async function(){
        var code = document.getElementById('codeBox').value;
        if (code.length < 4) {
            document.getElementById('codeBox').value = "Code should be 4 characters.";
            return;
        }

        var gameRef = await database.ref("promised-land-journey-game").child(code).get();
        if (!gameRef.exists()) {
            document.getElementById('codeBox').value = "Invalid code.";
            return;
        }

        gameState.setUpGameCodeFromJoin(code);

        document.getElementById('codeBox').style.visibility= "hidden";
        document.getElementById('enterCode').style.visibility="hidden";

        var numberOfPlayers = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("Player Number").get();
        gameState.setUpGameState(numberOfPlayers.val()); 
    });
}


var gameState = new GameState();
var gameStarted = false;

var data;
$.ajax({
    type: "GET",  
    url: "csvs/sampleQuestions.csv",
    dataType: "text",       
    success: function(response)  
    {
    data = $.csv.toArrays(response);
    makeQuestions(data);
    }   
});

var questions;
function makeQuestions(data) {
    questions = new Questions(data);
}


