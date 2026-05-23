// =========================
// AUDIO
// =========================

const correctSound =
document.getElementById("correct-sound");

const wrongSound =
document.getElementById("wrong-sound");

const gameoverSound =
document.getElementById("gameover-sound");

// =========================
// UI ELEMENTS
// =========================

const homeScreen =
document.getElementById("home-screen");

const homeButton =
document.getElementById("home-button");

const gameScreen =
document.getElementById("game-screen");

const gameOverScreen =
document.getElementById("game-over");

const startButton =
document.getElementById("start-game");

const restartButton =
document.getElementById("restart-button");

const playerNameInput =
document.getElementById("player-name");

const difficultySelect =
document.getElementById("difficulty");

const questionElement =
document.getElementById("question");

const questionBox =
document.getElementById("question-box");

const answerButtons =
document.querySelectorAll(".answer-btn");

const scoreElement =
document.getElementById("score");

const streakElement =
document.getElementById("streak");

const levelElement =
document.getElementById("level");

const timerElement =
document.getElementById("timer");

const finalScore =
document.getElementById("final-score");

const rankingList =
document.getElementById("ranking-list");

const gameOverRanking =
document.getElementById("game-over-ranking");

// =========================
// GAME VARIABLES
// =========================

let playerName = "";

let score = 0;

let streak = 0;

let level = 1;

let bestStreak = 0;

let correctAnswer;

let time = 30;

let timer;

let difficulty = "easy";

// =========================
// EVENTS
// =========================

startButton.addEventListener(
  "click",
  startGame
);

restartButton.addEventListener(
  "click",
  restartGame
);

homeButton.addEventListener(
  "click",
  goHome
);

// =========================
// START GAME
// =========================

function startGame() {

  clearInterval(timer);

  playerName =
  playerNameInput.value.trim();

  difficulty =
  difficultySelect.value;

  questionBox.classList.remove(
  "easy-mode",
  "medium-mode",
  "hard-mode"
);

if(difficulty === "easy"){

  questionBox.classList.add(
    "easy-mode"
  );

}

else if(difficulty === "medium"){

  questionBox.classList.add(
    "medium-mode"
  );

}

else {

  questionBox.classList.add(
    "hard-mode"
  );

}

  if(playerName === ""){

    alert("Digite seu nickname!");

    return;

  }

  // RESET VALUES
  score = 0;

  streak = 0;

  level = 1;

  bestStreak = 0;

  time = 30;

  // UPDATE UI
  scoreElement.textContent =
  `Score: ${score}`;

  streakElement.textContent =
  `Streak: ${streak}`;

  levelElement.textContent =
  `Level: ${level}`;

  timerElement.textContent =
  `Time: ${time}`;

  // CHANGE SCREENS
  homeScreen.classList.add("hidden");

  gameScreen.classList.remove("hidden");

  gameOverScreen.classList.add("hidden");

  // START SYSTEMS
  generateQuestion();

  startTimer();

}

// =========================
// TIMER
// =========================

function startTimer() {

  timer = setInterval(() => {

    time--;

    timerElement.textContent =
    `Time: ${time}`;

    if(time <= 0){

      endGame();

    }

  }, 1000);

}

// =========================
// GENERATE QUESTION
// =========================

function generateQuestion() {

  let num1;

  let num2;

  let operation;

  // EASY
  if(difficulty === "easy"){

    num1 =
    Math.floor(Math.random() * 10);

    num2 =
    Math.floor(Math.random() * 10);

    operation =
    Math.random() > 0.5 ? "+" : "-";

  }

  // MEDIUM
  else if(difficulty === "medium"){

    num1 =
    Math.floor(Math.random() * 20);

    num2 =
    Math.floor(Math.random() * 10);

    operation = "*";

  }

  // HARD
  else {

    num2 =
    Math.floor(Math.random() * 10) + 1;

    correctAnswer =
    Math.floor(Math.random() * 10);

    num1 =
    correctAnswer * num2;

    operation = "/";

  }

  // CALCULATE ANSWER
  switch(operation){

    case "+":
      correctAnswer = num1 + num2;
      break;

    case "-":
      correctAnswer = num1 - num2;
      break;

    case "*":
      correctAnswer = num1 * num2;
      break;

    case "/":
      correctAnswer = num1 / num2;
      break;

  }

  // SHOW QUESTION
  let displayOperation = operation;

  if(operation === "*"){

  displayOperation = "x";

  }

  questionElement.textContent =
`${num1} ${displayOperation} ${num2}`;

  // CREATE ANSWERS
  let answers = [

    correctAnswer,

    correctAnswer + 1,

    correctAnswer - 1,

    correctAnswer + 2

  ];

  // SHUFFLE
  answers =
  answers.sort(() => Math.random() - 0.5);

  // UPDATE BUTTONS
  answerButtons.forEach((button, index) => {

    button.textContent =
    answers[index];

    button.onclick = () =>
    checkAnswer(answers[index]);

  });

}

// =========================
// CHECK ANSWER
// =========================

function checkAnswer(answer) {

  // CORRECT ANSWER
  if(answer === correctAnswer){

    correctSound.currentTime = 0;

    correctSound.play();

    streak++;

    // BEST STREAK
    if(streak > bestStreak){

      bestStreak = streak;

    }

    // SCORE SYSTEM
    let points =
    10 + (streak * 2);

    score += points;

    // LEVEL SYSTEM
    level =
    Math.floor(score / 100) + 1;

    // UPDATE UI
    scoreElement.textContent =
    `Score: ${score}`;

    streakElement.textContent =
    `Streak: ${streak}`;

    levelElement.textContent =
    `Level: ${level}`;

    // FLOATING XP
    showFloatingPoints(points);

    // SUPER STREAK EFFECT
    if(streak >= 5){

      streakElement.classList.add(
        "super-streak"
      );

    } else {

      streakElement.classList.remove(
        "super-streak"
      );

    }

    // VISUAL FEEDBACK
    questionBox.classList.add("correct");

    setTimeout(() => {

      questionBox.classList.remove(
        "correct"
      );

    }, 400);

  }

  // WRONG ANSWER
  else {

    wrongSound.currentTime = 0;

    wrongSound.play();

    // SCREEN SHAKE
    document.body.classList.add("shake");

    setTimeout(() => {

      document.body.classList.remove(
        "shake"
      );

    }, 300);

    // RESET STREAK
    streak = 0;

    streakElement.textContent =
    `Streak: ${streak}`;

    streakElement.classList.remove(
      "super-streak"
    );

    // VISUAL FEEDBACK
    questionBox.classList.add("wrong");

    setTimeout(() => {

      questionBox.classList.remove(
        "wrong"
      );

    }, 400);

  }

  generateQuestion();

}

// =========================
// END GAME
// =========================

function endGame() {

  clearInterval(timer);

  gameoverSound.play();

  finalScore.textContent =
  `Your score: ${score}`;

  saveRanking();

  showRanking();

  gameScreen.classList.add("hidden");

  gameOverScreen.classList.remove(
    "hidden"
  );

}

// =========================
// RESTART GAME
// =========================

function restartGame() {

  gameOverScreen.classList.add(
    "hidden"
  );

  startGame();

}
function goHome() {

  clearInterval(timer);

  gameOverScreen.classList.add(
    "hidden"
  );

  gameScreen.classList.add(
    "hidden"
  );

  homeScreen.classList.remove(
    "hidden"
  );

}

// =========================
// SAVE RANKING
// =========================

function saveRanking() {

  let ranking =

  JSON.parse(
    localStorage.getItem("ranking")
  ) || [];

  ranking.push({

    name: playerName,

    score: score

  });

  // SORT
  ranking.sort((a, b) =>

    b.score - a.score

  );

  // TOP 5
  ranking = ranking.slice(0, 5);

  localStorage.setItem(

    "ranking",

    JSON.stringify(ranking)

  );

}

// =========================
// SHOW RANKING
// =========================

function showRanking() {

  let ranking =

  JSON.parse(
    localStorage.getItem("ranking")
  ) || [];

  rankingList.innerHTML = "";

  gameOverRanking.innerHTML = "";

  ranking.forEach((player, index) => {

    let medal = "";

    if(index === 0){

      medal = "🥇";

    }

    else if(index === 1){

      medal = "🥈";

    }

    else if(index === 2){

      medal = "🥉";

    }

    // HOME RANKING
    let liHome =
    document.createElement("li");

    liHome.textContent =
    `${medal} ${player.name} - ${player.score} XP`;

    rankingList.appendChild(liHome);

    // GAME OVER RANKING
    let liGameOver =
    document.createElement("li");

    liGameOver.textContent =
    `${medal} ${player.name} - ${player.score} XP`;

    gameOverRanking.appendChild(
      liGameOver
    );

  });

}

// =========================
// FLOATING XP
// =========================

function showFloatingPoints(points){

  const floatingText =
  document.createElement("div");

  floatingText.classList.add(
    "floating-points"
  );

  floatingText.textContent =
  `+${points} XP`;

  floatingText.style.left =
  Math.random() * 70 + 15 + "%";

  floatingText.style.top =
  "40%";

  document.body.appendChild(
    floatingText
  );

  setTimeout(() => {

    floatingText.remove();

  }, 1000);

}

// =========================
// INITIAL LOAD
// =========================

showRanking();