// // Firebase App (the core Firebase SDK) is always required and must be listed first
// import firebase from "firebase/app";
// // If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// // import * as firebase from "firebase/app"

// // If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// // Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyCF_3NhU55DeaMHPsVZVbne6hAyX85fh1o",
//     authDomain: "promised-land-journey-game.firebaseapp.com",
//     databaseURL: "https://promised-land-journey-game-default-rtdb.firebaseio.com",
//     projectId: "promised-land-journey-game",
//     storageBucket: "promised-land-journey-game.appspot.com",
//     messagingSenderId: "671482883052",
//     appId: "1:671482883052:web:716262c10ac3246b116ec9",
//     measurementId: "G-MPN1DGWEJS"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);


var config = {
    width: 1200,
    height: 600,
    backgroundColor: 0x0000000,
    scale: { parent: 'mygame', autoCenter: Phaser.Scale.CENTER_BOTH }, 
    scene: [LoadingScene, MenuScene, HostScene, JoinScene, TriviaScene, CorrectScene, IncorrectScene, newStageScene, nextPlayerScene, victoryScene, tempInput, StoryLine, TieScene, TrueTieScene]
}
window.onload = function() {
    // Created a new Game instance that we can configure
    var game = new Phaser.Game(config);
}

var gameState = new GameState();


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




