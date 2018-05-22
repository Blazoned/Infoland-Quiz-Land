var timer =
    {
        milliSeconds: 0,
        Start: function () {
            window.setInterval(IncreaseTimer, 1);
        },
        Reset: function () {
            window.clearInterval();
            timer.time = 0;
            window.setInterval(IncreaseTimer, 1);
        },
        Stop: function () {
            window.clearInterval(IncreaseTimer);
        },
        Clear: function () {
            timer.time = 0;
        }
    };

function IncreaseTimer()
{
    timer += 1;
}

function AnswerQuestion(authKey, quizId, questionId, answer)
{
    // Stop question timer
    timer.Stop();

    // Make an assynchronous request to answer the question
    $.ajax(
        {
            method: "POST",
            url: "https://quiz.iqualify.nl/api/learnmaterial/" + quizId + "/update/" + questionId,
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Bearer " + authKey);
            },
            contentType: "application/json",
            data: JSON.stringify(
                {
                    "confirmed": "true",
                    "time": timer.milliSeconds,
                    "answer": answer
                }
            ),
            complete: function (result, xhr) {
                // Reset and start the timer
                timer.Reset();

                // Return the response object
                return result;
            }
        }
    );
}

function GetQuizMaterials(authKey, quizId)
{
    // Make an assynchronous request to answer the question
    $.ajax(
        {
            method: "POST",
            url: "https://quiz.iqualify.nl/api/learnmaterial/" + quizId,
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Bearer " + authKey);
            },
            complete: function (result, xhr) {
                // Clear the timer and start it
                timer.Clear();
                timer.Start();

                // Return the response object
                return result;
            }
        }
    );
}