const correctSound = document.getElementById("correct-sound");

const wrongSound = document.getElementById("wrong-sound");

const gameoverSound = document.getElementById("gameover-sound");

const streakElement = document.getElementById("streak");

const levelElement = document.getElementById("level");

let streak = 0;

let level = 1;

const difficultySelect = document.getElementById("difficulty");

let difficulty = "easy";

const gameOverRanking = document.getElementById("game-over-ranking");

const playerNameInput = document.getElementById("player-name");

const rankingList = document.getElementById("ranking-list");

let playerName = "";

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

  playerName = playerNameInput.value;

    difficulty = difficultySelect.value;

  if(playerName === ""){

    alert("Digite seu nickname!");

    return;

  }

  homeScreen.classList.add("hidden");

  gameScreen.classList.remove("hidden");

  score = 0;
  streak = 0;
  level = 1;
  time = 30;

  scoreElement.textContent = `Score: ${score}`;
  streakElement.textContent = `Streak: ${streak}`;
  levelElement.textContent = `Level: ${level}`;
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

  let num1;
  let num2;
  let operation;

  // EASY
  if(difficulty === "easy"){

    num1 = Math.floor(Math.random() * 10);
    num2 = Math.floor(Math.random() * 10);
    operation = Math.random() > 0.5 ? "+" : "-";

  }

  // MEDIUM
  else if(difficulty === "medium"){

    num1 = Math.floor(Math.random() * 20);
    num2 = Math.floor(Math.random() * 10);
    operation = "*";

  }

  // HARD
  else {

    num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = Math.floor(Math.random() * 10);
    num1 = correctAnswer * num2;
    operation = "/";

  }

  // CALCULATE ANSWER
  if(operation === "+"){

    correctAnswer = num1 + num2;

  }

  else if(operation === "-"){

    correctAnswer = num1 - num2;

  }

  else if(operation === "*"){

    correctAnswer = num1 * num2;

  }

  else if(operation === "/"){

    correctAnswer = num1 / num2;

  }

  // SHOW QUESTION
  questionElement.textContent =
    `${num1} ${operation} ${num2}`;

  // ANSWERS
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

    correctSound.currentTime = 0;
    correctSound.play();
    streak++;

    let points = 10 + (streak * 2);

    score += points;
    showFloatingPoints(points);

    // LEVEL SYSTEM
    level = Math.floor(score / 100) + 1;

    scoreElement.textContent = `Score: ${score}`;

    streakElement.textContent = `Streak: ${streak}`;
    if(streak >= 5){
      streakElement.classList.add("super-streak");
    } else {

    streakElement.classList.remove("super-streak");

  }

  levelElement.textContent = `Level: ${level}`;

  questionBox.classList.add("correct");

  setTimeout(() => {
    questionBox.classList.remove("correct");
  }, 400);

} else {

  wrongSound.currentTime = 0;
  wrongSound.play();
  document.body.classList.add("shake");

  setTimeout(() => {
    document.body.classList.remove("shake");
  }, 300);
  streak = 0;
  streakElement.classList.remove("super-streak");
  streakElement.textContent = `Streak: ${streak}`;
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
  gameoverSound.play();

  finalScore.textContent = `Your score: ${score}`;
    saveRanking();

    showRanking();
  gameOverScreen.classList.remove("hidden");

}

// RESTART
function restartGame() {

  gameOverScreen.classList.add("hidden");
  startGame();

}

// SAVE RANKING
function saveRanking() {

  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  ranking.push({
    name: playerName,
    score: score
  });

  ranking.sort((a, b) => b.score - a.score);

  ranking = ranking.slice(0, 5);

  localStorage.setItem("ranking", JSON.stringify(ranking));

}

// SHOW RANKING
function showRanking() {

  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  rankingList.innerHTML = "";

  gameOverRanking.innerHTML = "";

  ranking.forEach(player => {

    let liHome = document.createElement("li");

    liHome.textContent = `${player.name} - ${player.score} XP`;

    rankingList.appendChild(liHome);

    let liGameOver = document.createElement("li");

    liGameOver.textContent = `${player.name} - ${player.score} XP`;

    gameOverRanking.appendChild(liGameOver);

  });

}

showRanking();

function showFloatingPoints(points){

  const floatingText = document.createElement("div");

  floatingText.classList.add("floating-points");

  floatingText.textContent = `+${points} XP`;

  floatingText.style.left =
    Math.random() * 70 + 15 + "%";

  floatingText.style.top =
    "40%";

  document.body.appendChild(floatingText);

  setTimeout(() => {
    floatingText.remove();
  }, 1000);

}