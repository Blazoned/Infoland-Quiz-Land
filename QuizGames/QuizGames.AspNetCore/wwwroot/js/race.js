// When the document is loaded, loaded the first quiz in the system
$(document).ready(function () {
    // Hide the question container and disable start button
    $('.questioncontainer').hide();
    $('#gameplaybtn').prop('disabled', true);
    LoadQuiz();

    // Add a handler to the score updates
    scoreUpdated.handlers.push(function (playerId, score) {
        // Get player index
        var index = players.findIndex((player) => { return player.playerId === playerId; });

        // Update displayed player score
        update(index);
    });

    clientConnected.handlers.push(checkJoinState);

    // Add a handler to the player joins
    playerJoined.handlers.push(checkJoinState);

    // Add a handler to global game start
    gameStarted.handlers.push(function ()
    {
        $('#gameplaybtn').prop('disabled', true);
        $('#gameplaybtn').hide();
        startGameplay();
    });
});

const playerCountRequired = 4;
var quiz;
var questions;
var questionCount;
var curQuestion;
var loop;
var questionResults = Array();


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

function LoadQuiz() {
    // Load the first quiz in the system
    $.getScript("/js/quizScript.js", function () {
        GetQuizes()
            .then(function (data) {
                var id = data.courses.courses[0].learnmaterial[0].id;

                StartQuiz(id)
                    .then(function (quizData) {
                        GetQuizMaterials(id)
                            .then(function (quizData) {
                                quiz = quizData;
                                questions = quizData.pages;
                                questionCount = questions.length;
                            })
                            .then(function () {
                                nextQuestion();
                                for (let i = 0; i < players.length; i++)
                                    update(i);
                            })
                            .then(function () {
                                console.log(quiz);
                                console.log(questions);
                                console.log(quiz.pages.filter(function (data) {
                                    return !$.isEmptyObject(getArrayItemByValue(data.answers, "id", "ce83cc4e-8516-4fe3-ac0e-22add2ebe10d"));
                                }));
                            })
                            .catch(function (data) {
                                console.log("Quiz could not be loaded.");
                            });
                    })
                    .catch("Retake unsuccesfully executed.");
            });
    });
}

// question answered global var
var callResult;

// Validate answer to question
function questionAnswered(answer) {
    // Reset the result variable
    callResult = null;

    // Hide the answer buttons
    $(".answer").hide();
    
    // Get the answer id
    answer = answer.getAttribute("data-question");

    // Get the answer data
    $.getScript("/js/quizScript.js", function () {
        AnswerQuestion(quiz.id, questions[curQuestion].id, answer)
            .then(function (response) {
                // Save the response of the question in the quiz (for future reference)
                var pageIndex = quiz.pages.findIndex(page => page.id === response.question.id);
                quiz.pages[pageIndex] = response.question;
                questionResults[questionResults.length] = response.question;
                return response;
            })
            .then(function (response) {
                // Get the answer data
                response.question.answers.forEach(function (qAnswer) {
                    if (qAnswer.id === answer) {
                        answer = qAnswer;
                    }
                });

                callResult = answer;
            })
            .catch(function (xhr) {
                if (xhr.status === 403) {
                    // Save answer
                    questionResults[questionResults.length] = quiz.pages[curQuestion];
                    var userdata = getArrayItemByValue(quiz.pages[curQuestion].answers, "id", answer);
                    questionResults[questionResults.length - 1].userdata = userdata[0];

                    // Check answer
                    callResult = userdata[0];
                }
            });
    });

    checkAnswerTimeout();
}

// Wait until results have been found
function checkAnswerTimeout() {
    if (callResult !== null) {
        checkAnswer(callResult);
    }
    else {
        setTimeout(checkAnswerTimeout, 100);
    }
}

// Check if the answer is correct
function checkAnswer(qAnswer) {
    // Check if answer is correct
    if (qAnswer.correct) {

        // Increase points and broadcast them
        players[0].score++;
        connection.invoke("SendScore", players[0].score);

        // Update visuals
        update(0);

        // Notify the user they answered correctly
        let x = document.getElementsByClassName('cquestion');
        for (let i = 0; i < x.length; i++) {
            x[i].style.backgroundColor = "green";
        }

        // Removes the correctly answered question from the answers that still need to be answered
        questions.splice(curQuestion, 1);
    }
    else {
        // Notify the user they answered incorrectly
        let x = document.getElementsByClassName('cquestion');
        for (let i = 0; i < x.length; i++) {
            x[i].style.backgroundColor = "red";
        }
    }

    // Wait a second before fetching a new question
    setTimeout(nextQuestion, 800);
}

// Update visuals and check endgame
function update(itemIndex) {
    // Get elements
    var elem = document.getElementById("Camelbar" + (itemIndex + 1));
    var img = document.getElementById("img" + (itemIndex + 1));
    var label = document.getElementById("crp" + (itemIndex + 1));

    // Get new width
    var width = players[itemIndex].score / questionCount * 100;
    if (width < 6) width = 6;

    // Assign new values
    elem.style.width = width + '%';
    img.style.left = width + '%';
    label.innerHTML = players[itemIndex].score;

    // Check for game winner
    setTimeout(checkEndGame, 50);
}

// Check if a player has won
function checkEndGame() {
    var playerWon = false;

    // Loop through players and check each of them
    for (let i = 0; i < players.length; i++) {
        if (players[i].score === questionCount) {
            playerWon = true;

            // Show the winning player
            let playerName = players[i].playerId.toLowerCase();
            playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1);
            stopGameplay();
            alert(playerName + " heeft gewonnen!");
        }
    }

    // Redirect to the main menu after the game is over
    if (playerWon)
        location.href = "/menu/menu";
}

// Reset the game visuals
function resetGame() {
    stopGameplay();
    Camelbar1.style.width = 6 + '%';
    Camelbar2.style.width = 6 + '%';
    Camelbar3.style.width = 6 + '%';
    Camelbar4.style.width = 6 + '%';
    img1.style.left = 6 + '%';
    img2.style.left = 6 + '%';
    img3.style.left = 6 + '%';
    img4.style.left = 6 + '%';
    players.forEach(function (player) {
        player.score = 0;
    });
}

// Get a new question and display its data
function nextQuestion(lastquestion) {

    let x = document.getElementsByClassName('cquestion');
    for (let i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "#0168b3";
    }

    // Get a new question at random until a new question has been selected
    do {
        curQuestion = Math.floor(Math.random() * questions.length + 0);

        // Escape the loop if last question is undefined
        if (typeof lastquestion === "undefined") break;
    }
    while (questions[curQuestion].id === questions[lastquestion].id);

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

    // Show the answer buttons
    $(".answer").show();
}

// Start gameplay simulation
function startGameplay() {
    $('.answer').prop('disabled', false);

    $('#gameplaybtn').hide();
    $('.questioncontainer').show();
}

// Stop gameplay simulation
function stopGameplay() {
    $('.answer').prop('disabled', true);
    
    $('.questioncontainer').hide();
    $('#gameplaybtn').show();
}

// Attempt to start the game
function startGame() {
    connection.invoke("StartGame");
}

function checkJoinState(player) {
    // Check if the game can start
    if (players.length === playerCountRequired) {
        $('#gameplaybtn').prop('disabled', false);
        document.getElementById('gameplaybtn').innerHTML = "Start spel! (" + players.length + "/" + playerCountRequired + " players)";
    }
    else {
        $('#gameplaybtn').prop('disabled', true);
        document.getElementById('gameplaybtn').innerHTML = "Wachten op spelers... (" + players.length + "/" + playerCountRequired + " players)";
    }
}