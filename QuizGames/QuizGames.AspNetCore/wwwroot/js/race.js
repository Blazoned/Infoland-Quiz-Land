

    var questions;
    var qAnswerd = 0;
    var player1points = 0;
    var player2points = 0;
    var player3points = 0;
    var player4points = 0;
    var currentquestion



function start() {
    questions = DummyQuestions();
    nextQuestion();
    
}

function questionAsnsered(awnser) {
    if (awnser == questions[currentquestion].correctAnswer) {
        player1points++;
        move(Camelbar1, img1);
        qAnswerd++;
        nextQuestion(currentquestion);
        document.getElementById('crp1').innerHTML = player1points;

    }
    else {
        qAnswerd++;
        nextQuestion(currentquestion);
    }
}

function nextQuestion(lastquestion) {
    currentquestion = Math.floor((Math.random() * 5) + 0);

    while (currentquestion == lastquestion) {
        currentquestion = Math.floor((Math.random() * 5) + 0);
    }

    document.getElementById('qlbl').innerHTML = questions[currentquestion].question;
    document.getElementById('canswer1').innerHTML = questions[currentquestion].answers[0];
    document.getElementById('canswer2').innerHTML = questions[currentquestion].answers[1];
    document.getElementById('canswer3').innerHTML = questions[currentquestion].answers[2];
    document.getElementById('canswer4').innerHTML = questions[currentquestion].answers[3]; 
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
      player1points = 0;
      player2points = 0;
      player3points = 0;
      player4points = 0;
      document.getElementById('crp1').innerHTML = player1points;
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
                correctAwnser: "Haarlem"
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