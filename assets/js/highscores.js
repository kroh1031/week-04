const clearButton = document.getElementById("clear");
const ol = document.createElement("ol");
let userScores = localStorage.getItem("scores");

function getItems() {
  userScores = JSON.parse(userScores);

  for (let i = 0; i < userScores.length; i++) {
    let li = document.createElement("li");
    console.log(userScores[i]);
    li.textContent =
      "Name: " + userScores[i].name + " Score: " + userScores[i].score;
    ol.appendChild(li);
  }

  document.getElementById("highscores-list").appendChild(ol);
}
function clearItems() {
  localStorage.clear();
  ol.innerHTML = "";
}

getItems();
clearButton.addEventListener("click", clearItems);
