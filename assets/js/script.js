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
    // document.querySelector("#questionOne").style.display = "block";
    // document.querySelector("#welcomePage").style.display = "none";
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

    // document.querySelector("#welcomePage").style.display = "block";
    // document.querySelector("#questionOne").style.display = "none";
    // document.querySelector("#questionTwo").style.display = "none";
    // document.querySelector("#questionThree").style.display = "none";
    // document.querySelector("#questionFour").style.display = "none";
    // document.querySelector("#result-msg").style.display = "none";
    // document.querySelector("#inputPage").style.display = "none";
    // document.querySelector("#highScorePage").style.display = "none";
}

function endGame() {
    clearInterval(timer);
    finalScore = timerCount + currentScore;
    scoreInput.textContent = finalScore;

    document.querySelector("#result-msg").style.display = "none";
    document.querySelector("#questionFour").style.display = "none";
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
    console.log(initialsAll);
    console.log(scoresAll);

    storeAll();
};

function showWelcome() {
    document.querySelector("#welcomePage").style.display = "block";
    document.querySelector("#questionOne").style.display = "none";
    document.querySelector("#questionTwo").style.display = "none";
    document.querySelector("#questionThree").style.display = "none";
    document.querySelector("#questionFour").style.display = "none";
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

function showHighScore() {
    document.querySelector("#welcomePage").style.display = "none";
    document.querySelector("#questionOne").style.display = "none";
    document.querySelector("#questionTwo").style.display = "none";
    document.querySelector("#questionThree").style.display = "none";
    document.querySelector("#questionFour").style.display = "none";
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
// Make start button disabled false
        playAgain();
    };
});

document.addEventListener("click", function (event) {
    var test = event.target;

    if (test.matches("#highScoreButton")) {
        console.log("match working");

        clearInterval(timer);
        showHighScore();

        // document.querySelector("#welcomePage").style.display = "none";
        // document.querySelector("#questionOne").style.display = "none";
        // document.querySelector("#questionTwo").style.display = "none";
        // document.querySelector("#questionThree").style.display = "none";
        // document.querySelector("#questionFour").style.display = "none";
        // document.querySelector("#result-msg").style.display = "none";
        // document.querySelector("#inputPage").style.display = "none";
        // document.querySelector("#highScorePage").style.display = "block";
    };
});

inputPg.addEventListener("keydown", function () {
    submitButton.disabled = false;
});

submitButton.addEventListener("click", function (event) {

    submitButton.disabled = true;

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

        console.log("correct!");

        currentScore += 10;
        // console.log(currentScore);

        correctAnswer();

        showQ2();

        // document.querySelector("#questionOne").style.display = "none";
        // document.querySelector("#questionTwo").style.display = "block";
        // document.querySelector("#result-msg").style.display = "block";

    } else if (test.matches("#oneB") || test.matches("#oneC") || test.matches("#oneD")) {

        console.log("incorrect!");

        currentScore -= 10;

        wrongAnswer();

        showQ2();

        // document.querySelector("#questionOne").style.display = "none";
        // document.querySelector("#questionTwo").style.display = "block";
        // document.querySelector("#result-msg").style.display = "block";

    };

    if (test.matches("#twoB")) {

        console.log("correct!");

        correctAnswer();

        showQ3();

        currentScore += 10;
        // console.log(currentScore);

        // document.querySelector("#questionTwo").style.display = "none";
        // document.querySelector("#questionThree").style.display = "block";

    } else if (test.matches("#twoA") || test.matches("#twoC") || test.matches("#twoD")) {

        console.log("incorrect!");

        wrongAnswer();

        showQ3();

        currentScore -= 10;

        // document.querySelector("#questionTwo").style.display = "none";
        // document.querySelector("#questionThree").style.display = "block";
    };

    if (test.matches("#threeC")) {

        console.log("correct!");

        correctAnswer();

        showQ4();

        currentScore += 10;
        // console.log(currentScore);

        // document.querySelector("#questionThree").style.display = "none";
        // document.querySelector("#questionFour").style.display = "block";

    } else if (test.matches("#threeA") || test.matches("#threeB") || test.matches("#threeD")) {

        console.log("incorrect!");

        wrongAnswer();

        showQ4();

        currentScore -= 10;

        // document.querySelector("#questionThree").style.display = "none";
        // document.querySelector("#questionFour").style.display = "block";
    };

    if (test.matches("#fourD")) {

        console.log("correct!");

        currentScore += 10;
        // console.log(currentScore);

        endGame();

    } else if (test.matches("#fourA") || test.matches("#fourB") || test.matches("#fourC")) {

        console.log("incorrect!");

        currentScore -= 10;

        endGame();
    };
});

init();