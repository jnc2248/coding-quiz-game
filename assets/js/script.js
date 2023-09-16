var main = document.querySelector("main");
var inputPg = document.querySelector("#inputPage")
var timerElement = document.querySelector("#timerCount");
var startButton = document.querySelector("#startBtn");
var submitButton = document.querySelector("#submitBtn");
var initialsInput = document.querySelector("#hs-name");
var scoreInput = document.querySelector("#finalScore");
var highScorePage = document.querySelector("#highScorePage");
var resultMsg = document.querySelector("#result-msg");
var hsList = document.querySelector("#hsList");

var currentScore = 0;
var timerCount;
var timer;
var initialsAll = [];
var scoresAll = [];

function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;

        if (timerCount <= 0) {
            endGame();
        };
    }, 1000);
};

function startGame() {
    timerCount = 60;
    startButton.disabled = true;
    startTimer();
    showQ1();
};

function init() {
    var storedInitials = JSON.parse(localStorage.getItem("initials"));
    var storedScores = JSON.parse(localStorage.getItem("scores"));

    if (storedInitials !== null) {
        initialsAll = storedInitials;
    };
    if (storedScores !== null) {
        scoresAll = storedScores;
    };
    uploadHighscore();
    submitButton.disabled = true;
};

function playAgain() {
    startButton.disabled = false;
    showWelcome();
}

function endGame() {
    clearInterval(timer);
    finalScore = timerCount + currentScore;
    scoreInput.textContent = finalScore;

    document.querySelector("#result-msg").style.display = "none";
    document.querySelector("#questionFive").style.display = "none";
    document.querySelector("#inputPage").style.display = "block";
};

function storeAll() {
    localStorage.setItem('scores', JSON.stringify(scoresAll));
    localStorage.setItem('initials', JSON.stringify(initialsAll));

    uploadHighscore();
};

function uploadHighscore() {
    hsList.innerHTML = "";

    for (var i = 0; i < scoresAll.length; i++) {
        var score = scoresAll[i];
        var init = initialsAll[i];

        var newRow = document.createElement("tr")
        var liInit = document.createElement("td");
        var liScore = document.createElement("td");

        liScore.textContent = score;
        liInit.textContent = init;

        newRow.append(liInit, liScore);
        hsList.appendChild(newRow);
    };
};

function clearHighScores() {
    initialsAll = [];
    scoresAll = [];
    storeAll();
};

function showWelcome() {
    document.querySelector("#welcomePage").style.display = "block";
    document.querySelector("#questionOne").style.display = "none";
    document.querySelector("#questionTwo").style.display = "none";
    document.querySelector("#questionThree").style.display = "none";
    document.querySelector("#questionFour").style.display = "none";
    document.querySelector("#questionFive").style.display = "none";
    document.querySelector("#result-msg").style.display = "none";
    document.querySelector("#inputPage").style.display = "none";
    document.querySelector("#highScorePage").style.display = "none";
};

function showQ1() {
    document.querySelector("#welcomePage").style.display = "none";
    document.querySelector("#questionOne").style.display = "block";
};

function showQ2() {
    document.querySelector("#questionOne").style.display = "none";
    document.querySelector("#questionTwo").style.display = "block";
};

function showQ3() {
    document.querySelector("#questionTwo").style.display = "none";
    document.querySelector("#questionThree").style.display = "block";
};

function showQ4() {
    document.querySelector("#questionThree").style.display = "none";
    document.querySelector("#questionFour").style.display = "block";
};

function showQ5() {
    document.querySelector("#questionFour").style.display = "none";
    document.querySelector("#questionFive").style.display = "block";
};

function showHighScore() {
    document.querySelector("#welcomePage").style.display = "none";
    document.querySelector("#questionOne").style.display = "none";
    document.querySelector("#questionTwo").style.display = "none";
    document.querySelector("#questionThree").style.display = "none";
    document.querySelector("#questionFour").style.display = "none";
    document.querySelector("#questionFive").style.display = "none";
    document.querySelector("#result-msg").style.display = "none";
    document.querySelector("#inputPage").style.display = "none";
    document.querySelector("#highScorePage").style.display = "block";
};

function correctAnswer() {
    document.querySelector("#result-msg").style.display = "block";
    resultMsg.children[1].textContent = "Correct!"
};

function wrongAnswer() {
    document.querySelector("#result-msg").style.display = "block";
    resultMsg.children[1].textContent = "Incorrect!"
};

document.addEventListener("click", function (event) {
    var test = event.target;

    if (test.matches("#clearBtn")) {
        clearHighScores();
    };
});

document.addEventListener("click", function (event) {
    var test = event.target;

    if (test.matches("#goBackBtn")) {
        playAgain();
    };
});

document.addEventListener("click", function (event) {
    var test = event.target;

    if (test.matches("#highScoreButton")) {
        clearInterval(timer);
        showHighScore();
    };
});

inputPg.addEventListener("keydown", function () {
    submitButton.disabled = false;
});

submitButton.addEventListener("click", function (event) {
    var initials = initialsInput.value.trim();

    if (initials === "") {
        return;
    };

    initialsAll.push(initials);
    initialsInput.value = "";
    scoresAll.push(finalScore);
    storeAll();
});

main.addEventListener("click", function (event) {
    var start = event.target
    if (start.matches("#startBtn")) {
        currentScore = 0;
        startGame();
    }
});

main.addEventListener("click", function (event) {
    var replay = event.target
    if (replay.matches("#againBtn")) {
        playAgain();
    }
});

main.addEventListener("click", function (event) {
    var test = event.target

    if (test.matches("#oneA")) {
        currentScore += 10;
        correctAnswer();
        showQ2();
    } else if (test.matches("#oneB") || test.matches("#oneC") || test.matches("#oneD")) {
        currentScore -= 10;
        wrongAnswer();
        showQ2();
    };

    if (test.matches("#twoD")) {
        currentScore += 10;
        correctAnswer();
        showQ3();
    } else if (test.matches("#twoA") || test.matches("#twoB") || test.matches("#twoC")) {
        currentScore -= 10;
        wrongAnswer();
        showQ3();
    };

    if (test.matches("#threeB")) {
        currentScore += 10;
        correctAnswer();
        showQ4();
    } else if (test.matches("#threeA") || test.matches("#threeC") || test.matches("#threeD")) {
        currentScore -= 10;
        wrongAnswer();
        showQ4();
    };

    if (test.matches("#fourA")) {
        currentScore += 10;
        correctAnswer();
        showQ5();
    } else if (test.matches("#fourB") || test.matches("#fourC") || test.matches("#fourD")) {
        currentScore -= 10;
        wrongAnswer();
        showQ5();
    };

    if (test.matches("#fiveC")) {
        currentScore += 10;
        endGame();

    } else if (test.matches("#fiveA") || test.matches("#fiveB") || test.matches("#fiveD")) {
        currentScore -= 10;
        endGame();
    };
});

init();