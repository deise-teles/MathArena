const homeScreen = document.getElementById("home-screen");

const gameScreen = document.getElementById("game-screen");

const startButton = document.getElementById("start-game");

const questionElement = document.getElementById("question");

const answerButtons = document.querySelectorAll(".answer-btn");

const scoreElement = document.getElementById("score");

const timerElement = document.getElementById("timer");

const questionBox = document.getElementById("question-box");

const gameOverScreen = document.getElementById("game-over");

const finalScore = document.getElementById("final-score");

const restartButton = document.getElementById("restart-button");

let score = 0;

let correctAnswer;

let time = 30;

let timer;

// START GAME
startButton.addEventListener("click", startGame);

// RESTART GAME
restartButton.addEventListener("click", restartGame);

function startGame() {

    clearInterval(timer);

  homeScreen.classList.add("hidden");

  gameScreen.classList.remove("hidden");

  score = 0;

  time = 30;

  scoreElement.textContent = `Score: ${score}`;

  timerElement.textContent = `Time: ${time}`;

  generateQuestion();

  startTimer();

}

// TIMER
function startTimer() {

  timer = setInterval(() => {

    time--;

    timerElement.textContent = `Time: ${time}`;

    if(time <= 0){

      endGame();

    }

  }, 1000);

}

// GENERATE QUESTION
function generateQuestion() {

  let num1 = Math.floor(Math.random() * 10);

  let num2 = Math.floor(Math.random() * 10);

  correctAnswer = num1 + num2;

  questionElement.textContent = `${num1} + ${num2}`;

  let answers = [
    correctAnswer,
    correctAnswer + 1,
    correctAnswer - 1,
    correctAnswer + 2
  ];

  answers = answers.sort(() => Math.random() - 0.5);

  answerButtons.forEach((button, index) => {

    button.textContent = answers[index];

    button.onclick = () => checkAnswer(answers[index]);

  });

}

// CHECK ANSWER
function checkAnswer(answer) {

  if(answer === correctAnswer){

    score += 10;

    scoreElement.textContent = `Score: ${score}`;

    questionBox.classList.add("correct");

    setTimeout(() => {
      questionBox.classList.remove("correct");
    }, 400);

  } else {

    questionBox.classList.add("wrong");

    setTimeout(() => {
      questionBox.classList.remove("wrong");
    }, 400);

  }

  generateQuestion();

}

// END GAME
function endGame() {

  clearInterval(timer);

  finalScore.textContent = `Your score: ${score}`;

  gameOverScreen.classList.remove("hidden");

}

// RESTART
function restartGame() {

  gameOverScreen.classList.add("hidden");

  startGame();

}