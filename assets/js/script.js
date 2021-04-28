//declaring variables
var timer;
var visibleQuestion = -1;
var timeRemaining = 0;
var score = 0;

//variable for the questions, constructed as an array
var quizQuestions = [
  {
    title: "What is the index of the fourth item within an array?",
    choices: ["0( )", "3( )", "4( )", "5( )"],
    answer: "3( )",
  },
  {
    title: "What is 1 + 1?",
    choices: ["1( )", "2( )", "3( )", "4( )"],
    answer: "2( )",
  },
  {
    title:
      " How much wood could a woodchuck chuck if a woodchuck could chuck wood?",
    choices: ["0( )", "alot( )", "a little( )", "Woodchucks aren't real"],
    answer: "alot( )",
  },
  {
    title: "How difficult was this assignment?",
    choices: ["Easy( )", "Very( )", "Impossible( )", "SuperImpossible( )"],
    answer: "Very( )",
  },
];

//function that will begin the timer when the game is started
function startGame() {
  timeRemaining = 30;
  document.getElementById("timeRemaining").innerHTML = timeRemaining;

  timer = setInterval(function () {
    timeRemaining--;
    document.getElementById("timeRemaining").innerHTML = timeRemaining;
    //this if statement is to end the game if the timer reaches 0
    if (timeRemaining <= 0) {
      clearInterval(timer);
      //calls gameOver function
      gameOver();
    }
  }, 1000); //ticks down by 1 second (1000ms)
  //calls the next function to display the next question
  nextQuestion();
}

//this function will store the highscore and name in local storage
function saveScore() {
  localStorage.setItem("highscore", score);
  localStorage.setItem("highscoreName", document.getElementById("name").value);
  // console.log(score)
  recallScore();
}

//this function will display the next question in the array
function nextQuestion() {
  visibleQuestion++;

  if (visibleQuestion > quizQuestions.length - 1) {
    //calling gameOver function when there are no more questions in the array
    gameOver();
    return;
  }

  var quizMain = "<h3>" + quizQuestions[visibleQuestion].title + "</h3>";

  //this creates a loop for the questions
  for (
    var questionLoop = 0;
    questionLoop < quizQuestions[visibleQuestion].choices.length;
    questionLoop++
  ) {
    var buttonReplace = '<button onclick="[ANS]">[CHOICE]</button>';
    buttonReplace = buttonReplace.replace(
      "[CHOICE]",
      quizQuestions[visibleQuestion].choices[questionLoop]
    );
    if (
      quizQuestions[visibleQuestion].choices[questionLoop] ==
      quizQuestions[visibleQuestion].answer
    ) {
      buttonReplace = buttonReplace.replace("[ANS]", "correctAnswer()"); //replaces the correct answer with the correctAnswer function
    } else {
      buttonReplace = buttonReplace.replace("[ANS]", "incorrectAnswer()"); //replaces the incorrect answers with the incorrectAnswer function
    }
    quizMain += buttonReplace;
  }

  document.getElementById("quizMain").innerHTML = quizMain;
}

//this function increases the score by 25 points per question answered correctly (4 questions total)
function correctAnswer() {
  score += 25;
  nextQuestion(); //call the nextQuestion function
}

//this function will subtract 5 seconds from the timer if a question is answered incorrectly
function incorrectAnswer() {
  timeRemaining -= 5;
  nextQuestion(); //call the nextQuestion function
}

//this function resets the game so the user can play again
function reset() {
  clearInterval(timer);
  visibleQuestion = -1;
  timeRemaining = 0;
  timer = null;
  score = 0;

  document.getElementById("timeRemaining").innerHTML = timeRemaining;

  var quizMain = `
<h1>
    Kind of a Code Quiz!
</h1>
<h3>
    Click to begin!   
</h3>
<button onclick="startGame()">Start!</button>`;

  document.getElementById("quizMain").innerHTML = quizMain;
}

//this function calls on the stored data to display the current highscore
function recallScore() {
  var quizMain =
    `
<h3>Congrats! ` +
    localStorage.getItem("highscoreName") +
    `'s highscore is:</h3>
<h2>` +
    localStorage.getItem("highscore") +
    `</h2><br> 

<button onclick="clearHighscore()">Clear score!</button><button onclick="reset()">Play Again!</button> `;

  document.getElementById("quizMain").innerHTML = quizMain;
}

//ends the timer when the game ends
function gameOver() {
  clearInterval(timer);
  //switches variable value to display the results of the quiz when it has ended
  var quizMain =
    `
<h3>The quiz has ended!</h3>
<h4>Your score is ` +
    score +
    ` out of 100!</h4>
<h5>You answered ` +
    score / 25 +
    ` questions correct!</h5>
<input type="text" id="name" placeholder="First name"> 
<button onclick="saveScore()">Submit!</button>`;

  document.getElementById("quizMain").innerHTML = quizMain;
}

//this function will remove the data from local storage when the clear score button is clicked, then calls the reset function
function clearHighscore() {
  localStorage.setItem("highscore", "");
  localStorage.setItem("highscoreName", "");
  reset();
}
