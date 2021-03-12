// DOM elements
const startButton = document.getElementById("start-btn");
const cardEl = document.getElementById("card-questions");
const newCardEl = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answerButtonsEl = document.getElementById("answer-buttons");
const formEl = document.getElementById("form1");
const timeRemain = document.getElementById("timer");
const scoreEl = document.getElementById("score");

let score = 0;

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);

// need to start game (when click start button)
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
  var secondsLeft = 60;
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeRemain.textContent = secondsLeft + "";
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      console.log("Quiz Over");
    }
  }, 1000);
}

// setting next question (what happens when click on next button)
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

// Removing answer buttons from page
function resetState() {
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild);
  }
}

// do something when select answer
//look up event delegation of event listeners
//null, empty strings, undefiends, etc are falsy values meaning they equal to false
function selectAnswer(e) {
  if (e.target.dataset.correct) {
    //   increment score, if else take off time
    score += 10;
  } else {
    score -= 10;
  }

  scoreEl.innerText = score;

  currentQuestionIndex++; //this is shorthand for var = var + 1

  if (currentQuestionIndex < questions.length) {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  } else {
    console.log("game ended!!!");
    newCardEl.classList.add("hide");
    formEl.classList.remove("hide");
    endGame();
  }
}

function endGame() {
  //collect the user's name and score
  //store it in local storage
  // direct user to highscores.html
}

function clickSubmit() {
  const initialEl = document.querySelector("#form1 input");

  console.log(initialEl.value);
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

// steps need to take:
// 1. when click on start, question #1 comes up
// 2. when answered correctly, a msg at bottom comes up saying Correct! / when wrong, a msg pops up saying Wrong!
// 3. when times runs out, scoreboard comes up
