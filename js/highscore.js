const highScoreList = document.getElementById("highScoreList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

console.log(highScores);
// highScoreList.innerHTML = highScores;

highScoreList.innerHTML = highScores
  .map((score) => {
    return `<li class="highscore">${score.name} - ${score.score}</li>`;
  })
  .join("");
