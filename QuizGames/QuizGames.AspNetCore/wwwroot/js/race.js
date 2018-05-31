
    var questions;
    var qAnswerd = 0;
    var player1points = 0;
    var player2points = 0;
    var player3points = 0;
    var player4points = 0;
    var currentquestion;
    var loop;
var loopstarted = false;
var qQ = 10;



function start() {
    questions = DummyQuestions();
    nextQuestion();
    window.addEventListener('resize', updatebars(qQ));
}

function questionAsnsered(awnser) {
    if (awnser == questions[currentquestion].correctAnswer) {

        //alert($(window).width());
        $(".answer").hide();
        player1points++;
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
    var positionP1 = beginP + pace * player1points;
    var positionP2 = beginP + pace * player2points;
    var positionP3 = beginP + pace * player3points;
    var positionP4 = beginP + pace * player4points;


    if (player1points == qQ) {
        // Get the modal
        var modal = document.getElementById('myModal');

        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal
        btn.onclick = function () {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        gameOver();
    }
    else if (player2points == qQ || player3points == qQ || player4points == qQ) {
        alert("You Lost :(")
        gameOver();
    }
        else {
        if ($(window).width() > 1200) {
            document.getElementById("Camelbar1").style.width = positionP1 + '%';
            document.getElementById("Camelbar2").style.width = positionP2 + '%';
            document.getElementById("Camelbar3").style.width = positionP3 + '%';
            document.getElementById("Camelbar4").style.width = positionP4 + '%';

            document.getElementById("Camelbar1").style.height = "50px";
            document.getElementById("Camelbar2").style.height = "50px";
            document.getElementById("Camelbar3").style.height = "50px";
            document.getElementById("Camelbar4").style.height = "50px";

            document.getElementById("img1").style.display = "block";
            document.getElementById("img2").style.display = "block";
            document.getElementById("img3").style.display = "block";
            document.getElementById("img4").style.display = "block";
        }
        else {
            document.getElementById("Camelbar1").style.height = positionP1 + '%';
            document.getElementById("Camelbar2").style.height = positionP2 + '%';
            document.getElementById("Camelbar3").style.height = positionP3 + '%';
            document.getElementById("Camelbar4").style.height = positionP4 + '%';

            document.getElementById("Camelbar1").style.width = '100%';
            document.getElementById("Camelbar2").style.width = '100%';
            document.getElementById("Camelbar3").style.width = '100%';
            document.getElementById("Camelbar4").style.width = '100%';

            document.getElementById("img1").style.display = "none";
            document.getElementById("img2").style.display = "none";
            document.getElementById("img3").style.display = "none";
            document.getElementById("img4").style.display = "none";
        }
    }
    
}

function move(id1, id2) {
    var elem = document.getElementById(id1);
    var img = document.getElementById(id2);
    var width = Number(elem.style.width.replace(/[^\d\.\-]/g, ''));
    //var width = elem.offsetWidth;
    //var totalwidth = width / 7 * 100;
    
    if (width < 90) {
        width += 10;
        elem.style.width = width + '%';
        img.style.left = width + '%';
    }
    else {
        loopstarted = true;
        toggleGameplay();
        Camelbar1.style.width = 6 + '%';
        Camelbar2.style.width = 6 + '%';
        Camelbar3.style.width = 6 + '%';
        Camelbar4.style.width = 6 + '%';
        img1.style.left = 6 + '%';
        img2.style.left = 6 + '%';
        img3.style.left = 6 + '%';
        img4.style.left = 6 + '%';
        player1points = 0;
        player3points = 0;
        player2points = 0;
        player4points = 0;
        alert("Game over!");
        loopstarted = false;
        updateScore();
    }
}


function gameOver() {

    loopstarted = true;
    toggleGameplay();
    loopstarted = false;
    player1points = 0;
    player3points = 0;
    player2points = 0;
    player4points = 0;
    //alert("Game over!");
    updatebars(qQ)
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
    document.getElementById('crp1').innerHTML = player1points;
    document.getElementById('crp2').innerHTML = player2points;
    document.getElementById('crp3').innerHTML = player3points;
    document.getElementById('crp4').innerHTML = player4points;
}

function modal() {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
function random_points() {
    var i;
    for (i = 0; i < 3; i++) {
        var random = Math.floor((Math.random() * 2) + 0);
        if (random == 0) {
            if (i == 0) {
                player2points++;
                updateScore();
                updatebars(qQ);
                
            }
            else if (i == 1) {
                player3points++;
                updateScore();
                updatebars(qQ);
                
            }
            else if (i == 2) {
                player4points++;
                updateScore();
                updatebars(qQ);
                
            }
        }
    }  
}


