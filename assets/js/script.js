// DOM elements
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const cardEl = document.getElementById('card-questions')
const newCardEl = document.getElementById('question-container')
const questionEl = document.getElementById('question')
const answerButtonsEl = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)


// need to start game (when click start button)
function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    cardEl.classList.add('hide')
    cardEl.parentNode.replaceChild(newCardEl, cardEl)
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    newCardEl.classList.remove('hide')
    newCardEl.classList.add('my-card')
    setNextQuestion()
}

// setting next question (what happens when click on next button)
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
    })

}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
        (answerButtonsEl.firstChild)
    }
}

// do something when select answer
function selectAnswer() {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
}

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false },
            { text: '56', correct: false },
            { text: '79', correct: false },
        ],
    },
    {
        question: 'What is 2 + 2',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false },
            { text: '56', correct: false },
            { text: '79', correct: false },
        ],
    },
    {
        question: 'What is 2 + 2',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false },
            { text: '56', correct: false },
            { text: '79', correct: false },
        ],
    },
    {
        question: 'What is 2 + 2',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false },
            { text: '56', correct: false },
            { text: '79', correct: false },
        ],
    },
    {
        question: 'What is 2 + 2',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false },
            { text: '56', correct: false },
            { text: '79', correct: false },
        ],
    },
    {
        question: 'What is 2 + 2',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false },
            { text: '56', correct: false },
            { text: '79', correct: false },
        ],
    },
];


// for timer (use if needed)
// var secondsLeft = 60;

// function startTimer() {
//     var timerInterval = setInterval(function() {
//         secondsLeft--;
//         timeClock.textContent = secondsLeft + "";
//         if (secondsLeft === 0) {
//             clearInterval(timerInterval);
//             return("Quiz Over");
//         }



//     }, 1000);
// }

// steps need to take:
// 1. when click on start, question #1 comes up
// 2. when answered correctly, a msg at bottom comes up saying Correct! / when wrong, a msg pops up saying Wrong!
// 3. when times runs out, scoreboard comes up