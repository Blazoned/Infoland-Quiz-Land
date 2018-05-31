// Contain and maintain the timer
var timer =
    {
        milliSeconds: 0,
        Start: function () {
            // window.setInterval(IncreaseTimer, 1);
        },
        Reset: function () {
            window.clearInterval();
            timer.time = 0;
            // window.setInterval(IncreaseTimer, 1);
        },
        Stop: function () {
            window.clearInterval(IncreaseTimer);
        },
        Clear: function () {
            timer.time = 0;
        }
    };

// Increase the question timer each millisecond when the timer is active
function IncreaseTimer()
{
    timer += 1;
}

// Post answer to a question
function AnswerQuestion(quizId, questionId, answer)
{
    return new Promise(function (resolve, reject) {
        // Stop question timer
        timer.Stop();

        // Make an assynchronous request to answer the question
        $.ajax(
            {
                method: "POST",
                url: "https://quiz.iqualify.nl/api/learnmaterial/" + quizId + "/update/" + questionId,
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", "Bearer " + getCookie("AuthKey"));
                },
                contentType: "application/json",
                data: JSON.stringify(
                    {
                        "confirmed": true,
                        "time": timer.milliSeconds,
                        "answer": [answer]
                    }
                ),
                success: function (result, xhr) {
                    // Reset and start the timer
                    timer.Reset();

                    // Return the response object
                    resolve(result);
                },
                error: function (result, xhr) {
                    reject(result);
                }
            }
        );
    });
}

// Get quiz materials
function GetQuizMaterials(quizId)
{
    // Make an assynchronous request to get the question
    return new Promise(function (resolve, reject) {
        $.ajax(
            {
                method: "GET",
                url: "https://quiz.iqualify.nl/api/learnmaterial/" + quizId,
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", "Bearer " + getCookie("AuthKey"));
                },
                success: function (result, xhr) {
                    // Clear the timer and start it
                    timer.Clear();
                    timer.Start();

                    // Return the response object
                    resolve(result);
                },
                error: function (result, xhr) {
                    reject(result);
                }
            }
        );
    });
}

// Get quizes
function GetQuizes() {
    // Make an assynchronous request to get all available quizes
    return new Promise(function (resolve, reject) {
        $.ajax(
            {
                method: "GET",
                url: "https://quiz.iqualify.nl/api/userdata/mycoursesdata",
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", "Bearer " + getCookie("AuthKey"));
                },
                success: function (result, xhr) {
                    resolve(result);
                },
                error: function (result, xhr) {
                    reject(result);
                }
            }
        );
    });
}

// Start a quiz
function StartQuiz(quizId) {
    // Start the timer
    timer.Start();

    // Make an assynchronous request to get start a quiz
    return new Promise(function (resolve, reject) {
        $.ajax(
            {
                method: "POST",
                url: "https://quiz.iqualify.nl/api/learnmaterial/" + quizId + "/retake",
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", "Bearer " + getCookie("AuthKey"));
                },
                success: function (result, xhr) {
                    resolve(true);
                },
                error: function (result, xhr) {
                    resolve(false);
                }
            }
        );
    });
}

// Stop a quiz
function StopQuiz(quizId) {
    // Stop and clear the timer
    timer.Stop();
    timer.Clear();

    // Make an assynchronous request to get start a quiz
    return new Promise(function (resolve, reject) {
        $.ajax(
            {
                method: "POST",
                url: "https://quiz.iqualify.nl/api/learnmaterial/" + quizId + "/close",
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", "Bearer " + getCookie("AuthKey"));
                },
                success: function (result, xhr) {
                    resolve(true);
                },
                error: function (result, xhr) {
                    resolve(false);
                }
            }
        );
    });
}