var config = {
    width: 1200,
    height: 600,
    backgroundColor: 0x0000000,
    scene: [LoadingScene, MenuScene, HostScene, JoinScene, TriviaScene, CorrectScene, IncorrectScene, newStageScene]
}
window.onload = function() {
    // Created a new Game instance that we can configure
    var game = new Phaser.Game(config);
}

var gameState = new GameState(1);


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




