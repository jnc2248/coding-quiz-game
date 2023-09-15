var main = document.querySelector("main");
var inputPg = document.querySelector("#inputPage")
var timerElement = document.querySelector("#timerCount");
var startButton = document.querySelector("#startBtn");
var submitButton = document.querySelector("#submitBtn");
var initialsInput = document.querySelector("#hs-name");
var hsList = document.querySelector("#hsList");

var timerCount;
var initialsAll = [];
var scoresAll = [];
var currentScore = 0;
var finalScore = document.querySelector("#finalScore");

function startTimer() {
    var timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;

        if (timerCount === 0) {
            clearInterval(timer);
            loseGame();
        };

        // How to clear timer between attempts?

    }, 1000);
};

function startGame() {
    timerCount = 75;
    startButton.disabled = true;
    submitButton.disabled = true;
    startTimer();

    document.querySelector("#questionOne").style.display = "block";
    document.querySelector("#welcomePage").style.display = "none";
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
};

function playAgain() {
    startButton.disabled = false;

    // Need to reset timer!

    document.querySelector("#welcomePage").style.display = "block";
    document.querySelector("#questionOne").style.display = "none";
    document.querySelector("#questionTwo").style.display = "none";
    document.querySelector("#questionThree").style.display = "none";
    document.querySelector("#questionFour").style.display = "none";
    document.querySelector("#result-msg").style.display = "none";
    document.querySelector("#inputPage").style.display = "none";
}

function loseGame() {
    document.querySelector("#welcomePage").style.display = "none";
    document.querySelector("#questionOne").style.display = "none";
    document.querySelector("#questionTwo").style.display = "none";
    document.querySelector("#questionThree").style.display = "none";
    document.querySelector("#questionFour").style.display = "none";
    document.querySelector("#result-msg").style.display = "none";
    document.querySelector("#inputPage").style.display = "block";
};

function storeAll() {
    localStorage.setItem('scores', JSON.stringify(scoresAll));
    localStorage.setItem('initials', JSON.stringify(initialsAll));

    // uploadHighscore();
}

// function uploadHighscore() {
//     for (var i = 0; i < scoresAll.length; i++) {
//         var score = scoresAll[i];
//         var init = initialsAll[i];

//         var liInit = document.createElement("li");
//         var liScore = document.createElement("li");

//         liScore.textContent = score;
//         liScore.setAttribute("data-index", i);
//         liInit.textContent = init;
//         liInit.setAttribute("data-index", i);

//         hsList.append(liInit);
//         hsList.append(liScore);
//     }
// };

inputPg.addEventListener("keydown", function() {
    submitButton.disabled = false;
});

submitButton.addEventListener("click", function (event) {

    var initials = initialsInput.value.trim();

    if (initials === "") {
        return;
    };

    initialsAll.push(initials);
    
    initialsInput.value = "";

    console.log(initialsAll);

    scoresAll.push(currentScore);

    console.log(scoresAll);

    storeAll();
})

main.addEventListener("click", function (event) {
    var start = event.target
    if (start.matches("#startBtn")) {
        currentScore = 0;
        startGame();
    }
})

main.addEventListener("click", function (event) {
    var replay = event.target
    if (replay.matches("#againBtn")) {
        playAgain();
    }
})

main.addEventListener("click", function (event) {
    var test = event.target

    if (test.matches("#oneA")) {

        console.log("correct!");

        currentScore += 10;
        console.log(currentScore);

        document.querySelector("#questionOne").style.display = "none";
        document.querySelector("#questionTwo").style.display = "block";
        document.querySelector("#result-msg").style.display = "block";

    } else if (test.matches("#oneB") || test.matches("#oneC") || test.matches("#oneD")) {

        console.log("incorrect!");

        if (currentScore > 0) {
            currentScore -= 10;
            console.log(currentScore);
        };

        document.querySelector("#questionOne").style.display = "none";
        document.querySelector("#questionTwo").style.display = "block";
        document.querySelector("#result-msg").style.display = "block";

    };

    if (test.matches("#twoB")) {

        console.log("correct!");

        currentScore += 10;
        console.log(currentScore);

        document.querySelector("#questionTwo").style.display = "none";
        document.querySelector("#questionThree").style.display = "block";

    } else if (test.matches("#twoA") || test.matches("#twoC") || test.matches("#twoD")) {

        console.log("incorrect!");

        if (currentScore > 0) {
            currentScore -= 10;
            console.log(currentScore);
        };

        document.querySelector("#questionTwo").style.display = "none";
        document.querySelector("#questionThree").style.display = "block";
    };

    if (test.matches("#threeC")) {

        console.log("correct!");

        currentScore += 10;
        console.log(currentScore);

        document.querySelector("#questionThree").style.display = "none";
        document.querySelector("#questionFour").style.display = "block";

    } else if (test.matches("#threeA") || test.matches("#threeB") || test.matches("#threeD")) {

        console.log("incorrect!");

        if (currentScore > 0) {
            currentScore -= 10;
            console.log(currentScore);
        };

        document.querySelector("#questionThree").style.display = "none";
        document.querySelector("#questionFour").style.display = "block";
    };

    if (test.matches("#fourD")) {

        console.log("correct!");

        currentScore += 10;
        console.log(currentScore);

        timerCount = 0;

        finalScore.textContent = currentScore;

        document.querySelector("#questionFour").style.display = "none";
        document.querySelector("#result-msg").style.display = "none";
        document.querySelector("#inputPage").style.display = "block";

    } else if (test.matches("#fourA") || test.matches("#fourB") || test.matches("#fourC")) {

        console.log("incorrect!");

        if (currentScore > 0) {
            currentScore -= 10;
            console.log(currentScore);
        };

        timerCount = 0;

        finalScore.textContent = currentScore;

        document.querySelector("#questionFour").style.display = "none";
        document.querySelector("#result-msg").style.display = "none";
        document.querySelector("#inputPage").style.display = "block";
    };
});

init();