$(document).ready(function () {
    scoreUpdated.handlers.push(function (playerId, score) {
        // Get player index
        var index = players.findIndex((player) => { return player.playerId === playerId; });

        // Update displayed player score
        update(index);
    });
});


    var questions;
    var qAnswerd = 0;
    var currentquestion;



function start() {
    questions = DummyQuestions();
    nextQuestion();
}

function questionAsnsered(awnser) {
    if (awnser == questions[currentquestion].correctAnswer) {

        //alert($(window).width());
        $(".answer").hide();

        // Increase score and broadcast
        players[0].score++;
        connection.invoke("SendScore", players[0].score);

        qAnswerd++;
        update(0);
        let x = document.getElementsByClassName('cquestion');
        for (let i = 0; i < x.length; i++) {
            x[i].style.backgroundColor = "green";
        }

        setTimeout(function () {
            nextQuestion(currentquestion);
            $(".answer").show();
        }, 1000);
        
    }
    else {
        $(".answer").hide();
        qAnswerd++;
        let x = document.getElementsByClassName('cquestion');
        for (let i = 0; i < x.length; i++) {
            x[i].style.backgroundColor = "red";
        }
        setTimeout(function () {
            nextQuestion(currentquestion);
            $(".answer").show();
        }, 1000);

    }
}

function update(itemIndex) {
    // Get elements
    var elem = document.getElementById("Camelbar" + (itemIndex + 1));
    var img = document.getElementById("img" + (itemIndex + 1));
    var label = document.getElementById("crp" + (itemIndex + 1));

    // Get new width
    var width = players[itemIndex].score / questions.length * 100;
    if (width < 6) width = 6;

    // Assign new values
    elem.style.width = width + '%';
    img.style.left = width + '%';
    label.innerHTML = players[itemIndex].score;

    // Check for game winner
    setTimeout(checkEndGame, 50);
}

function checkEndGame() {
    var won = false;

    for (let i = 0; i < players.length; i++) {
        if (players[i].score === questions.length) {
            won = true

            // Show the winning player
            let playerName = players[i].playerId.toLowerCase();
            playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1);
            alert(playerName + " heeft gewonnen!");
        }
    }

    if (won)
        location.href = "/menu/menu";
}

function nextQuestion(lastquestion) {
    currentquestion = Math.floor(Math.random() * 5 + 0);
    
    var x = document.getElementsByClassName('cquestion');
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "#0168b3";
    }

    while (currentquestion === lastquestion) {
        currentquestion = Math.floor(Math.random() * 5 + 0);
    }

    document.getElementById('qlbl').innerHTML = questions[currentquestion].question;
    document.getElementById('canswer1').innerHTML = questions[currentquestion].answers[0];
    document.getElementById('canswer2').innerHTML = questions[currentquestion].answers[1];
    document.getElementById('canswer3').innerHTML = questions[currentquestion].answers[2];
    document.getElementById('canswer4').innerHTML = questions[currentquestion].answers[3]; 
}


function DummyQuestions(){
    var q =
        [
            {
                question: "Wat is de hooftstad van Duitsland?",
                answers: ["Amsterdam", "Köln", "Wenen even een lang antwoord maken", "Berlijn"],
                correctAnswer: "Berlijn"
            },

            {
                question: "In welke provicie ligt Eindhoven en ik moet deze vraag langer maken want wil testen wat er gebeurd als ie te lang is?",
                answers: ["Overijsel", "Drenthe", "Zeeland", "Noord-Brabant"],
                correctAnswer: "Noord-Brabant"
            },

            {
                question: "Wat is de hoofdstad van Noord-Holland",
                answers: ["Den Haag", "Amsterdam", "Haarlem", "Alkmaar"],
                correctAnswer: "Haarlem"
            },

            {
                question: "Wat is het hoogste punt in Nederland?",
                answers: ["Tankenberg", "Vaalserberg", "Signaal Imbosch", "Groot Valkenisse"],
                correctAnswer: "Vaalserberg"
            },

            {
                question: "Wat is de langste rivier van Europa?",
                answers: ["Donau", "Oeral", "Wolga", "Dnjepr"],
                correctAnswer: "Wolga"
            }
        ];
    return q;
}