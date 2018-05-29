// When the document is loaded, loaded the first quiz in the system
$(document).ready(function () {
        
});

    var quiz;
    var questions;
    var qAnswered = 0;
    var player1points = 0;
    var player2points = 0;
    var player3points = 0;
    var player4points = 0;
    var curQuestion;
    var loop;
    var loopstarted = false;


// Start game simulation
function getFirstQuestion() {
    // Display the first question if the quiz has been loaded
    if (typeof quiz !== "undefined") {
        nextQuestion();
    }
    else {
        // Try to start the game again
        setTimeout(start, 250);
    }
}

function start() {
    // Load the first quiz in the system
    $.getScript("/js/quizScript.js", function () {
        GetQuizes()
            .then(function (data) {
                GetQuizMaterials(data.courses.courses[0].learnmaterial[0].id)
                    .then(function (quizData) {
                        quiz = quizData;
                        questions = quizData.pages;
                        console.log(quiz);
                        console.log(questions);

                        return quizData;
                    })
                    .then(function (quizData) {
                        StopQuiz(quizData.id)
                            .catch("Quiz could not be closed.");
                        return quizData;
                    })
                    .then(function (quizData) {
                        StartQuiz(quizData.id)
                            .catch("Retake unsuccesfully executed.");
                    })
                    .then(function () {
                        nextQuestion();
                    })
                    .catch(function (data) {
                        console.log("Quiz could not be loaded.");
                    });
            });
    });
}

// Validate answer to question
function questionAnswered(answer) {
    // Increase the amount of answered questions
    qAnswered++;

    // Get the answer id
    answer = answer.getAttribute("data-question");

    // Get the answer data
    $.getScript("/js/quizScript.js", function () {
        AnswerQuestion(quiz.id, questions[curQuestion].id, answer)
            .then(function (response) {
                result.question.answers.forEach(function (qAnswer) {
                    if (qAnswer.id == answer) {
                        answer = qAnswer;
                        return qAnswer;
                    }
                });
            })
            .then(function (qAnswer) {
                // Check if answer is correct
                if (result.correct) {

                    // Increase points
                    player1points++;

                    // Update visuals
                    update();
                    move("Camelbar1", "img1");

                    // Notify the user they answered correctly
                    var x = document.getElementsByClassName('cquestion');
                    var i;
                    for (i = 0; i < x.length; i++) {
                        x[i].style.backgroundColor = "green";
                    }

                    // Removes the correctly answered question from the answers that still need to be answered
                    questions.splice(curQuestion, 1);

                    if (questions.length <= 0)
                        $.getScript("/js/quizScript.js", function () {
                            StopQuiz();
                        });
                }
                else {
                    // Notify the user they answered incorrectly
                    var x = document.getElementsByClassName('cquestion');
                    var i;
                    for (i = 0; i < x.length; i++) {
                        x[i].style.backgroundColor = "red";
                    }
                }
            })
            .then(function () {
                // Wait a second before fetching a new question
                setTimeout(function () {
                    nextQuestion(curQuestion);
                }, 800);
            })
            .catch(function (data) {
                console.log("Answer has not been correctly sent.");
            });
    });
}

// Increase a scorebar
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

// Get a new question and display its data
function nextQuestion(lastquestion) {
    
    var x = document.getElementsByClassName('cquestion');
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "#0168b3";
    }

    // Get a new question at random until a new question has been selected
    do {
        curQuestion = Math.floor((Math.random() * questions.length) + 0);
    }
    while (typeof(lastquestion) != "undefined" && curQuestion.id == lastquestion.id);

    // Shuffle the questions (randomise the location of the answers)
    var cqAnswers = shuffleArray(questions[curQuestion].answers);

    // Display the question and answers and set the answer values
    document.getElementById('qlbl').innerHTML = questions[curQuestion].questionBase;

    document.getElementById('canswer1').innerHTML = cqAnswers[0].text;
    $('#canswer1').attr("data-question", cqAnswers[0].id);

    document.getElementById('canswer2').innerHTML = cqAnswers[1].text;
    $('#canswer2').attr("data-question", cqAnswers[1].id);

    document.getElementById('canswer3').innerHTML = cqAnswers[2].text;
    $('#canswer3').attr("data-question", cqAnswers[2].id);

    document.getElementById('canswer4').innerHTML = cqAnswers[3].text;
    $('#canswer4').attr("data-question", cqAnswers[3].id);
}

// Toggle gameplay simulation
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

//// Get dummy questions
//function DummyQuestions(){
//    var q =
//        [
//            {
//                question: "Wat is de hooftstad van Duitsland?",
//                answers: ["Amsterdam", "Köln", "Wenen", "Berlijn"],
//                correctAnswer: "Berlijn"
//            },

//            {
//                question: "In welke provicie ligt Eindhoven?",
//                answers: ["Overijsel", "Drenthe", "Zeeland", "Noord-Brabant"],
//                correctAnswer: "Noord-Brabant"
//            },

//            {
//                question: "Wat is de hoofdstad van Noord-Holland",
//                answers: ["Den Haag", "Amsterdam", "Haarlem", "Alkmaar"],
//                correctAnswer: "Haarlem"
//            },

//            {
//                question: "Wat is het hoogste punt in Nederland?",
//                answers: ["Tankenberg", "Vaalserberg", "Signaal Imbosch", "Groot Valkenisse"],
//                correctAnswer: "Vaalserberg"
//            },

//            {
//                question: "Wat is de langste rivier van Europa?",
//                answers: ["Donau", "Oeral", "Wolga", "Dnjepr"],
//                correctAnswer: "Wolga"
//            }
//        ]
//    return q;
//}

// Update player score visuals
function update() {
    document.getElementById('crp1').innerHTML = player1points;
    document.getElementById('crp2').innerHTML = player2points;
    document.getElementById('crp3').innerHTML = player3points;
    document.getElementById('crp4').innerHTML = player4points;
}

// Increase player points at random (window interval)
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