const homeScreen = document.getElementById("home-screen");
const gameScreen = document.getElementById("game-screen");

const startButton = document.getElementById("start-game");

const questionElement = document.getElementById("question");

const answerButtons = document.querySelectorAll(".answer-btn");

const scoreElement = document.getElementById("score");

let score = 0;

let correctAnswer;

// START GAME
startButton.addEventListener("click", () => {

  homeScreen.classList.add("hidden");

  gameScreen.classList.remove("hidden");

  generateQuestion();

});

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

  }

  generateQuestion();

}