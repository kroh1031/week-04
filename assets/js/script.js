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

// steps need to take:
// 1. when click on start, question #1 comes up
// 2. when answered correctly, a msg at bottom comes up saying Correct! / when wrong, a msg pops up saying Wrong!
// 3. when times runs out, scoreboard comes up