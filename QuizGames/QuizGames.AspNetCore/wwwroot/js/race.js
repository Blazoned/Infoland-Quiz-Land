@model QuizGames.AspNetCore.ViewModels.GameModeViewModel

    var question = DummyQuestions();
    var qAnswerd = 0;
    var player1points = 0;
    var player2points = 0;
    var player3points = 0;
    var player4points = 0;



function Answer_Question(outcome, playerbar, playerimg) {
    if (outcome == true) {
        move(Camelbar1, img1);
    }
    else {
        
    }
}


function move(id1, id2) {
  var elem = id1;
  var img = id2;
    var width= 1;
  var width = Number(elem.style.width.replace(/[^\d\.\-]/g, ''));
  var name = elem.name;
  if (width < 90){
  width+= 10; 
  elem.style.width = width + '%'; 
  img.style.left = width  + '%';
  }
  else {
  alert("Game over!");
  Camelbar1.style.width = 5 + '%';
  Camelbar2.style.width = 5 + '%';
  Camelbar3.style.width = 5 + '%';
  Camelbar4.style.width = 5 + '%';
  img1.style.left = 5 + '%';
  img2.style.left = 5 + '%';
  img3.style.left = 5 + '%';
  img4.style.left = 5 + '%';
  }
}

function DummyQuestions(){
    var questions =
        [
            {
                question: "Wat is de hooftstad van Duitsland?",
                answers: ["Amsterdam", "Köln", "Wenen", "Berlijn"],
                correctAnswer: 3
            },

            {
                question: "In welke provicie ligt Eindhoven?",
                answers: ["Overijsel", "Drenthe", "Zeeland", "Noord-Brabant"],
                correctAnswer: 3
            },

            {
                question: "Wat is de hoofdstad van Noord-Holland",
                answers: ["Den Haag", "Amsterdam", "Den Helder", "Alkmaar"],
                correctAwnser: 0
            },

            {
                question: "Wat is het hoogste punt in Nederland?",
                answers: ["Tankenberg", "Vaalserberg", "Signaal Imbosch", "Groot Valkenisse"],
                correctAnswer: 1
            },

            {
                question: "Wat is de langste rivier van Europa?",
                answers: ["Donau", "Oeral", "Wolga", "Dnjepr"],
                correctAnswer: 2
            }
        ]
    return questions;
}