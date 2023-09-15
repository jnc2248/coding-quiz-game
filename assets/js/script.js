var main = document.querySelector("main");
var timerElement = document.querySelector(".timerCount");
var timerCount;
var startButton = document.querySelector("#startBtn");
var submitButton = document.querySelector("#submitBtn");
var initialsInput = document.querySelector("#hs-name");
var hsTable = document.querySelector("#hs-table");

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
        // main.addEventListener("click", function (event) {
        //     var test = event.target
        //     if (test.matches("#fourD") || test.matches("#fourA") || test.matches("#fourB") || test.matches("#fourC")) {
        //         clearInterval(timer);
        //     }
        // });

    }, 1000);
};

function startGame() {
    timerCount = 30;
    startButton.disabled = true;
// Disable submit button until press down event in for input
//     submitButton.disabled = true;
    startTimer();

    document.querySelector("#questionOne").style.display = "block";
    document.querySelector("#welcomePage").style.display = "none";
};

function playAgain() {
    startButton.disabled = false;

// Need to reset score and timer!

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

// function storeInitials() {
//     localStorage.setItem('initials', JSON.stringify(initialsAll));
// };

// function storeScore() {
//     scoresAll.push(currentScore);
//     console.log(scoresAll);
//     // currentScore.value = "";
//     localStorage.setItem('scores', JSON.stringify(scoresAll));
// };

function storeAll() {
    scoresAll.push(currentScore);
    console.log(scoresAll);
    // currentScore.value = "";
    localStorage.setItem('scores', JSON.stringify(scoresAll));
    localStorage.setItem('initials', JSON.stringify(initialsAll));


}

function uploadHighscore() {
    for (var i = 0; i < scoresAll.length; i++) {
        var score = scoresAll[i];
        var init = initialsAll[i];

        var tr = document.createElement("tr");
        var tdInit = document.createElement("td");
        var tdScore = document.createElement("td");

        tdScore.textContent = score;
        tdScore.setAttribute("data-index", i);
        tdInit.textContent = init;
        tdInit.setAttribute("data-index", i);

        tr.appendChild(tdScore);
        hsTable.appendChild(tr);
        // Create tr, create td, add text content to td
    }

    // for (var i = 0; i < todos.length; i++) {
    //     var todo = todos[i];
    
    //     var li = document.createElement("li");
    //     li.textContent = todo;
    //     li.setAttribute("data-index", i);
    
    //     var button = document.createElement("button");
    //     button.textContent = "Complete ✔️";
    
    //     li.appendChild(button);
    //     todoList.appendChild(li);
    //   }
}

submitButton.addEventListener("click", function(event) {

    var initials = initialsInput.value.trim();

    if (initials === "") {
        return;
    };

    initialsAll.push(initials);
    initialsInput.value = "";

    console.log(initialsAll);

    storeInitials();
    storeScore();
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

        finalScore.textContent = currentScore;

        document.querySelector("#questionFour").style.display = "none";
        document.querySelector("#result-msg").style.display = "none";
        document.querySelector("#inputPage").style.display = "block";
    };
});

