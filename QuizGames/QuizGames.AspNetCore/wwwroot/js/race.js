
    var questions;
    var qAnswerd = 0;
    //var playerpoints1 = 0;
    //var playerpoints2 = 0;
    //var playerpoints3 = 0;
    //var playerpoints4 = 0;
var points = [0, 0, 0, 0];
    var currentquestion;
    var loop;
var loopstarted = false;
var qQ = 10;
var finish = false;



function start() {
    questions = DummyQuestions();
    nextQuestion();
    window.addEventListener('resize', updatebars(qQ));
}

function questionAsnsered(awnser) {
    if (awnser == questions[currentquestion].correctAnswer) {

        //alert($(window).width());
        $(".answer").hide();
        points[0]++;
        updateScore();
        updatebars(qQ);
        //move("Camelbar1", "img1");
        qAnswerd++;
        var x = document.getElementsByClassName('cquestion');
        var i;
        for (i = 0; i < x.length; i++) {
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
        var x = document.getElementsByClassName('cquestion');
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].style.backgroundColor = "red";
        }
        setTimeout(function () {
            nextQuestion(currentquestion);
            $(".answer").show();
        }, 1000);

    }
}


function updatebars(qQuestions) {
    var beginP = 6;
    var pace = 94 / qQuestions;
    var positionP1 = beginP + pace * points[0];
    var positionP2 = beginP + pace * points[1];
    var positionP3 = beginP + pace * points[2];
    var positionP4 = beginP + pace * points[3];

    var positions = [positionP1, positionP2, positionP3, positionP4];

    
        
        if ($(window).width() > 1200) {

            positions.forEach(function (value, entry) {
                var i = entry+1;
                document.getElementById("Camelbar" + i).style.width = positions[entry] + "%";
                document.getElementById("Camelbar" + i).style.height = "50px";
                document.getElementById("img" + i).style.display = "block";
            });
        }
        else {

            positions.forEach(function (value, entry) {
                var i = entry + 1;
                document.getElementById("Camelbar" + i).style.height = positions[entry] + "%";
                document.getElementById("Camelbar" + i).style.width = "100%";
                document.getElementById("img" + i).style.display = "none";
            });
    }

    if (points[0] == qQ) {
        alert("YOU WON!")
        if (finish == false) {
            gameOver();
        }

        
    }
    else if (points[1] == qQ || points[2] == qQ || points[3] == qQ) {
        alert("you lose")
        if (finish == false) {
            gameOver();
        }
    }
    
}

function gameOver() {

    loopstarted = true;
    toggleGameplay();
    loopstarted = false;
    points.forEach(function (value, entry) {
        points[entry] = 0;
    }
    );
    finish = true;
    //playerpoints1 = 0;
    //playerpoints3 = 0;
    //playerpoints2 = 0;
    //playerpoints4 = 0;
    //alert("Game over!");
    updatebars(qQ);
    updateScore();
}

function nextQuestion(lastquestion) {
    currentquestion = Math.floor((Math.random() * 5) + 0);
    
    var x = document.getElementsByClassName('cquestion');
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "#0168b3";
    }

    while (currentquestion == lastquestion) {
        currentquestion = Math.floor((Math.random() * 5) + 0);
    }

    document.getElementById('qlbl').innerHTML = questions[currentquestion].question;
    document.getElementById('canswer1').innerHTML = questions[currentquestion].answers[0];
    document.getElementById('canswer2').innerHTML = questions[currentquestion].answers[1];
    document.getElementById('canswer3').innerHTML = questions[currentquestion].answers[2];
    document.getElementById('canswer4').innerHTML = questions[currentquestion].answers[3]; 
}


function toggleGameplay() {
    if (loopstarted == false) {
        loop = setInterval(random_points, 2000);
        loopstarted = true;
        document.getElementById('gameplaybtn').innerHTML = "Stop Gameplay";
    }
    else {
        loop = clearInterval(loop);
        loopstarted = false;
        document.getElementById('gameplaybtn').innerHTML = "Start Gameplay";
    }
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
        ]
    return q;
}

function updateScore() {
    document.getElementById('crp1').innerHTML = points[0];
    document.getElementById('crp2').innerHTML = points[1];
    document.getElementById('crp3').innerHTML = points[2];
    document.getElementById('crp4').innerHTML = points[3];
}

function random_points() {
    var i;
    for (i = 0; i < 3; i++) {
        var random = Math.floor((Math.random() * 2) + 0);
        if (random == 0) {
            if (i == 0) {
                points[1]++;
                updateScore();
                updatebars(qQ);
                
            }
            else if (i == 1) {
                points[2]++;
                updateScore();
                updatebars(qQ);
                
            }
            else if (i == 2) {
                points[3]++;
                updateScore();
                updatebars(qQ);
                
            }
        }
    }  
}


