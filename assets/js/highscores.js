var hsList = document.querySelector("#hsList");
var initialsAll = [];
var scoresAll = [];

function init() {
    var storedInitials = JSON.parse(localStorage.getItem("initials"));
    var storedScores = JSON.parse(localStorage.getItem("scores"));

    if (storedInitials !== null) {
        initialsAll = storedInitials;
    };

    if (storedScores !== null) {
        scoresAll = storedScores;
    };
};

function uploadHighscore() {
    for (var i = 0; i < scoresAll.length; i++) {
        var score = scoresAll[i];
        var init = initialsAll[i];

        var liInit = document.createElement("li");
        var liScore = document.createElement("li");

        liScore.textContent = score;
        liScore.setAttribute("data-index", i);
        liInit.textContent = init;
        liInit.setAttribute("data-index", i);

        hsList.append(liInit);
        hsList.append(liScore);
    }
};

init();