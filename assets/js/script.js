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
const infoState = document.getElementById('info-state');

let score = 0;
let secondsLeft = 60;

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
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeRemain.textContent = secondsLeft + "";
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

// setting next question
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
function selectAnswer(event) {
  var selectedButton = event.target;
  if (selectedButton.dataset.correct) {
    //   increment score, if else take off time

    score += 10;
    infoState.textContent = "Correct! The answer was "+ selectedButton.textContent; //check out setTimeout to make it disappear
  
  } else if (selectedButton.dataset.correct === false && secondsLeft < 10) {
    secondsLeft = 0; // timer does not go below 0 (only when I finish the quiz before it hits 0 sec) goes negative when too many wrong answers
  } else {
    secondsLeft -= 10;
    score -= 10;
    //you have to loop through shuffledQuestions[currentQuestionIndex] and check if the element is correct, get that element
    let correctAnswer;
    let correctAnswers = shuffledQuestions[currentQuestionIndex].answers;
    //look up foreach documentation
    correctAnswers.forEach(function(answer){
        if(answer.correct){
            correctAnswer = answer;
        }
    })
    infoState.textContent = "Wrong! The correct answer was "+ correctAnswer.text;
  }

  scoreEl.innerText = score;

  currentQuestionIndex++; //this is shorthand for var = var + 1

  if (currentQuestionIndex < questions.length) {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  } else {
    // console.log(nameEl.value);
    // clickSubmit()
    endGame();
  }
}

function endGame() {
  scoreEl.innerText = score;
  // make timer stopppp!!!
  console.log("game ended!!!");
  newCardEl.classList.add("hide");
  // add text, " All done! Your final score is (score)."
  formEl.classList.remove("hide");
  //collect the user's name and score
  //store it in local storage
  // direct user to highscores.html
}

// when click submit button
function clickSubmit() {
  console.log("clicked submit button!!");
  const storeName = document.getElementById('storeName');
  //   store info into local storage and display in highscores.html
  const submitMessage = document.getElementById("submit-msg");
  const playAgainButton = document.getElementById("play-btn");

  /**
   * Local storage is frustrating
   * 
   */
    if(storeName.value){
        let currentScores = localStorage.getItem("scores"); //scores = [{}, {}, {}]
        currentScores = JSON.parse(currentScores);
        if(!currentScores){
            currentScores = [];
        }
        let inputScore = {"name": storeName.value, "score": score};
        currentScores.push(inputScore)
        console.log(currentScores)
        localStorage.setItem("scores", JSON.stringify(currentScores));
        console.log(localStorage.getItem("scores"))
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

// what i need to do:
// 1. make "Your final score is (score). Go to View Highscores to view your recent highscores." pop up with submit form when answered all questions
// 2. make timer stop on the page when submit form pops up
// 3. when submit button clicked,
// 4. WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score


