
    var questions;
    var qAnswerd = 0;
    var player1points = 0;
    var player2points = 0;
    var player3points = 0;
    var player4points = 0;
    var currentquestion;
    var loop;
    var loopstarted = false;



function start() {
    questions = DummyQuestions();
    nextQuestion();
   
}

function questionAsnsered(awnser) {
    if (awnser == questions[currentquestion].correctAnswer) {
        
        player1points++;
        update();
        move("Camelbar1", "img1");
        qAnswerd++;
        var x = document.getElementsByClassName('cquestion');
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].style.backgroundColor = "green";
        }
        setTimeout(function () {
            nextQuestion(currentquestion);
        }, 500);
        
    }
    else {
        qAnswerd++;
        var x = document.getElementsByClassName('cquestion');
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].style.backgroundColor = "red";
        }
        setTimeout(function () {
            nextQuestion(currentquestion);
        }, 500);
        
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
        update();
    }
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
                answers: ["Amsterdam", "Köln", "Wenen", "Berlijn"],
                correctAnswer: "Berlijn"
            },

            {
                question: "In welke provicie ligt Eindhoven?",
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

function update() {
    document.getElementById('crp1').innerHTML = player1points;
    document.getElementById('crp2').innerHTML = player2points;
    document.getElementById('crp3').innerHTML = player3points;
    document.getElementById('crp4').innerHTML = player4points;
}

function random_points() {
    var i;
    for (i = 0; i < 3; i++) {
        var random = Math.floor((Math.random() * 2) + 0);
        if (random == 0) {
            if (i == 0) {
                player2points++;
                update();
                move("Camelbar2", "img2");
                
            }
            else if (i == 1) {
                player3points++;
                update();
                move("Camelbar3", "img3");
                
            }
            else if (i == 2) {
                player4points++;
                update();
                move("Camelbar4", "img4");
                
            }
        }
    }  
}


