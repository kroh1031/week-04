function getItems(){
    let userScores = localStorage.getItem("scores");
    let ul = document.createElement("ul");
    userScores = JSON.parse(userScores);

    for(let i = 0; i < userScores.length; i++){
        let li = document.createElement("li")
        console.log(userScores[i])
        li.textContent = "User: "+ userScores[i].name + " Scores: "+ userScores[i].score
        ul.appendChild(li);
    }

    document.getElementById("highscores-list").appendChild(ul);
}

getItems();