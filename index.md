<!DOCTYPE html>
<html>
    <head>
        <h1 style="font-family:'Courier New', Courier, monospace; text-align: center;">Promised Land Journey Game</h1>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/1.0.11/jquery.csv.min.js"></script>
        <!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
        <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-database.js"></script>
        <!-- If you enabled Analytics in your project, add the Firebase SDK for Analytics -->
        <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-analytics.js"></script>
        <!-- Add Firebase products that you want to use -->
        <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-auth.js"></script>
        <!-- <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-firestore.js"></script> -->

        <script>
            // Your web app's Firebase configuration
            // For Firebase JS SDK v7.20.0 and later, measurementId is optional
            var firebaseConfig = {
              apiKey: "AIzaSyCF_3NhU55DeaMHPsVZVbne6hAyX85fh1o",
              authDomain: "promised-land-journey-game.firebaseapp.com",
              databaseURL: "https://promised-land-journey-game-default-rtdb.firebaseio.com",
              projectId: "promised-land-journey-game",
              storageBucket: "promised-land-journey-game.appspot.com",
              messagingSenderId: "671482883052",
              appId: "1:671482883052:web:716262c10ac3246b116ec9",
              measurementId: "G-MPN1DGWEJS"
            };
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            firebase.analytics();
        </script>

        <style media='screen' type='text/css'>
            @font-face {font-family: balbeer;src: url('fonts/Balbeer-Rustic.ttf');font-weight:400;font-weight:normal;}
            @font-face {font-family: bali;src: url('fonts/BALI\ TOLAK\ REKLAMASI.ttf');font-weight:400;font-weight:normal;}
            @font-face {font-family: balloon;src: url('fonts/Balloon\ Pops.ttf');font-weight:400;font-weight:normal;}
            @font-face {font-family: barnacle;src: url('fonts/Barnacle\ Boy\ Font\ by\ 7NTypes.otf');font-weight:400;font-weight:normal;}
            @font-face {font-family: barthowheel;src: url('fonts/Barthowheel\ Regular.ttf');font-weight:400;font-weight:normal;}
            @font-face {font-family: bavaria;src: url('fonts/Bavaria.ttf');font-weight:400;font-weight:normal;}
            @font-face {font-family: honest;src: url('fonts/Be\ Honest.ttf');font-weight:400;font-weight:normal;}
            @font-face {font-family: earth;src: url('fonts/Be\ Kind\ To\ The\ Earth.otf');font-weight:400;font-weight:normal;}
        </style>
        <script type="text/javascript" src="phaser.min.js"></script>
        <script type="text/javascript" src="scenes/gameState.js"></script>
        <script type="text/javascript" src="scenes/loadingScene.js"></script>
        <script type="text/javascript" src="scenes/menuScene.js"></script>
        <script type="text/javascript" src="scenes/tempInputScene.js"></script>
        <script type="text/javascript" src="scenes/hostScene.js"></script>
        <script type="text/javascript" src="scenes/joinScene.js"></script>
        <script type="text/javascript" src="scenes/triviaScene.js"></script>
        <script type="text/javascript" src="scenes/correctScene.js"></script>
        <script type="text/javascript" src="scenes/incorrectScene.js"></script>
        <script type="text/javascript" src="scenes/questions.js"></script>
        <script type="text/javascript" src="scenes/newStageScene.js"></script>
        <script type="text/javascript" src="scenes/nextPlayerScene.js"></script>
        <script type="text/javascript" src="scenes/storyLineScene.js"></script>
        <script type="text/javascript" src="scenes/victoryScene.js"></script>
        <script type="text/javascript" src="scenes/tieScene.js"></script>
        <script type="text/javascript" src="scenes/trueTieScene.js"></script>
        <script type="text/javascript" src="scenes/namingScene.js"></script>
        <script type="text/javascript" src="game.js"></script>
        <div id='mygame'></div> 
    </head>
    <body>
        <div style="font-family:balbeer; position:absolute; left:-1000px; visibility:hidden;">.</div>
        <div style="font-family:bali; position:absolute; left:-1000px; visibility:hidden;">.</div>
        <div style="font-family:balloon; position:absolute; left:-1000px; visibility:hidden;">.</div>
        <div style="font-family:barnacle; position:absolute; left:-1000px; visibility:hidden;">.</div>
        <div style="font-family:barthowheel; position:absolute; left:-1000px; visibility:hidden;">.</div>
        <div style="font-family:bavaria; position:absolute; left:-1000px; visibility:hidden;">.</div>
        <div style="font-family:honest; position:absolute; left:-1000px; visibility:hidden;">.</div>
        <div style="font-family:earth; position:absolute; left:-1000px; visibility:hidden;">.</div>

        <div style="display: block; margin: 0 auto;">
            <textarea id="nameBox" maxlength=15 style="display: block; visibility:hidden; text-align: center; margin-left: auto; margin-right: auto;">Leave empty for default</textarea>
            <button id="enterButton" style="display:block; visibility: hidden; text-align: center; margin-right: auto; margin-left: auto;">ENTER</button>
        </div>
        <!-- firebase deploy --only hosting -->
    </body>
</html>