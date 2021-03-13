// DOM elements
const startButton = document.getElementById("start-btn");
const cardEl = document.getElementById("card-questions");
const newCardEl = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answerButtonsEl = document.getElementById("answer-buttons");
const formEl = document.getElementById("form1");
const nameEl = document.querySelector("#form1 input");
const timeRemain = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const infoState = document.getElementById("info-state");
const finalScore = document.getElementById("final-score");

let score = 0;
let secondsLeft = 60;

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);

// Start game
function startGame() {
  countdown();
  console.log("Started");
  startButton.classList.add("hide");
  cardEl.classList.add("hide");
  cardEl.parentNode.replaceChild(newCardEl, cardEl);
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  newCardEl.classList.remove("hide");
  newCardEl.classList.add("new-card");
  setNextQuestion();
}

// Timer countdown
function countdown() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeRemain.textContent = secondsLeft + "";
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

// Setting next question
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionEl.innerText = question.question;
  let shuffledAnswers = question.answers.sort(() => Math.random() - 0.5);
  shuffledAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    answerButtonsEl.appendChild(button);
  });
}

answerButtonsEl.addEventListener("click", selectAnswer);

// Resetting state
function resetState() {
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild);
  }
}

// When select a button
function selectAnswer(event) {
  var selectedButton = event.target;
  if (selectedButton.dataset.correct) {
    //   increment score, if else take off time

    score += 10;
    infoState.textContent =
      "Correct! The answer was " + selectedButton.textContent;
  } else if (!selectedButton.dataset.correct && secondsLeft <= 10) {
    secondsLeft = 0;
  } else {
    secondsLeft -= 10;
    score -= 10;
    let correctAnswer;
    let correctAnswers = shuffledQuestions[currentQuestionIndex].answers;
    correctAnswers.forEach(function (answer) {
      if (answer.correct) {
        correctAnswer = answer;
      }
    });
    infoState.textContent =
      "Wrong! The correct answer was " + correctAnswer.text;
  }

  scoreEl.innerText = score;

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  } else {
    clickSubmit();
    endGame();
  }
}

function endGame() {
  scoreEl.innerText = score;
  newCardEl.classList.add("hide");
  if (secondsLeft < 0) {
    timeRemain.innerText = "0";
  }
  finalScore.textContent = score + ".";
  formEl.classList.remove("hide");
}

// When click submit button
function clickSubmit() {
  console.log("clicked submit button!!");
  const storeName = document.getElementById("storeName");
  const submitMessage = document.getElementById("submit-msg");
  const playAgainButton = document.getElementById("play-btn");

  if (storeName.value) {
    let currentScores = localStorage.getItem("scores"); //scores = [{}, {}, {}]
    currentScores = JSON.parse(currentScores);
    if (!currentScores) {
      currentScores = [];
    }
    let inputScore = { name: storeName.value, score: score };
    currentScores.push(inputScore);
    console.log(currentScores);
    localStorage.setItem("scores", JSON.stringify(currentScores));
    console.log(localStorage.getItem("scores"));
  }

  submitMessage.classList.remove("hide");
  playAgainButton.classList.remove("hide");
}

const questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<script>", correct: true },
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<scripting>", correct: false },
    ],
  },
  {
    question:
      "What is the correct JavaScript syntax to change the content of the HTML element below?",
    answers: [
      {
        text: 'document.getElementById("demo").innerHTML = "Hello World!";',
        correct: true,
      },
      { text: '#demo.innerHTML = "Hello World!";', correct: false },
      {
        text: 'document.getElementByName("p").innerHTML = "Hello World!";',
        correct: false,
      },
      {
        text: 'document.getElement("p").innerHTML = "Hello World!";',
        correct: false,
      },
    ],
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    answers: [
      { text: 'alert("Hello World");', correct: true },
      { text: 'alertBox("Hello World");', correct: false },
      { text: 'msgBox("Hello World");', correct: false },
      { text: 'msg("Hello World");', correct: false },
    ],
  },
  {
    question: "How does a FOR loop start?",
    answers: [
      { text: "for (i = 0; i <= 5; i++)", correct: true },
      { text: "for (i <= 5; i++)", correct: false },
      { text: "for i = 1 to 5", correct: false },
      { text: "for (i = 0; i <= 5)", correct: false },
    ],
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    answers: [
      { text: 'var colors = ["red", "green", "blue"]', correct: true },
      {
        text: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
        correct: false,
      },
      { text: 'var colors = "red", "green", "blue"', correct: false },
      { text: 'var colors = (1:"red", 2:"green", 3:"blue")', correct: false },
    ],
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    answers: [
      { text: "=", correct: true },
      { text: "-", correct: false },
      { text: "*", correct: false },
      { text: "x", correct: false },
    ],
  },
];
