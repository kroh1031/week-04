var secondsLeft = 60;

function startTimer() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeClock.textContent = secondsLeft + "";
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            return("Quiz Over");
        }



    }, 1000);
}