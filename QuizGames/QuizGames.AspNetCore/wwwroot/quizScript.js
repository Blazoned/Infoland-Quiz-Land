// TODO: Validate question answer & add to incorrect questions if wrong (to ask the question again later)
var incorrectAnswers = new Array();

function AnswerQuestion(authKey, quizId, questionId, answer, time)
{
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
                    "time": time,
                    "answer": answer
                }
            ),
            complete: function (result, xhr) {
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
                // Return the response object
                return result;
            }
        }
    );
}