
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
    document.getElementById('enterButton').addEventListener("mouseup", function(){ nameHandler(); });

    // Handler for code box and code enter button
    document.getElementById('enterCode').addEventListener("mouseup", function(){ codeHandler(); });

    $(document).on("keypress", async function(event){
        if (event.key === "Enter" && openedNamingScene) {
            nameHandler();
        } else if (event.key === "Enter" && openedJoinScene) {
            codeHandler();
        }
    });
   
}

let nameHandler = async function() {
    var name = document.getElementById('nameBox').value;
    try {
        if (name !== "") {
            var player = 'P'+(gameState.getMyPlayer()+1);
            var playerRef = database.ref("promised-land-journey-game").child(gameState.getGameCode()).child(player);
            playerRef.set(name);
        }
    } catch (e) {
        document.getElementById('nameBox').value = "Invalid name.";
    }
    
    gameState.changePlayerName(0);

    document.getElementById('nameBox').style.visibility= "hidden";
    document.getElementById('enterButton').style.visibility="hidden";
    openedNamingScene = false;
}

let codeHandler = async function() {
    var code = document.getElementById('codeBox').value.toUpperCase();
    if (code.length < 4) {
        document.getElementById('codeBox').value = "Code should be 4 characters.";
        return;
    }
    try {
        var gameRef = await database.ref("promised-land-journey-game").child(code).get();
        if (!gameRef.exists()) {
            document.getElementById('codeBox').value = "Invalid code.";
            return;
        }
    } catch (e) {
        document.getElementById('codeBox').value = "Invalid code!";
        return;
    }

    gameState.setUpGameCodeFromJoin(code);

    document.getElementById('codeBox').style.visibility= "hidden";
    document.getElementById('enterCode').style.visibility="hidden";

    var numberOfPlayers = await database.ref("promised-land-journey-game").child(gameState.getGameCode()).child("Player Number").get();
    gameState.setUpGameState(numberOfPlayers.val()); 

    openedJoinScene = false;
}


var gameState = new GameState();
var gameStarted = false;

var openedJoinScene = false;
var openedNamingScene = false;

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


