const btnAddPlayerNames = document.querySelector("#btnAddPlayerNames");
const btnNewPlayers = document.querySelector("#btnNewPlayers");
const image = document.querySelector("#coinImage");
const rollCoinBtn = document.querySelector("#rollCoinBtn");
const rollResult = document.querySelectorAll(".rollResult");
const winningTicketOutput = document.querySelector("#winningTicket");
let isClicked = false; // spam hotfix

btnNewPlayers.addEventListener("click", function() {
    toggleHidden();
});

btnAddPlayerNames.addEventListener("click", function() {
    let playerNames = getPlayerNames();
    let displayPlayerNames = document.querySelectorAll(".displayPlayerNames");
    //Loops through the html input fields and where to output the text to the screen
    for (let i = 0; i <= 1; i++) {
        let inp = playerNames[i];
        let output = displayPlayerNames[i];
        let name = inp.value;
        output.textContent = name.toUpperCase();
    }
    toggleHidden();
});

function getPlayerNames() {
    let playerNames = document.querySelectorAll(".playerName");
    return playerNames;
}

// Call the neccesary functions when the user clicks the roll coin button.
// TODO: Note to self: If no other function calls needs to be made, change the addEventListener to ("click", rotateCoinImage())
rollCoinBtn.addEventListener("click", function() {
    if (isClicked === false) {
        rotateCoinImage();
        isClicked = true;
    } else {
        console.log("clicked too fast!");
    }
});

// Gets a random number
function getRandomNumber() {
    const number = Math.random() * 100;
    return number;
}

// Checks the random number, if n < 50 player one wins, and if n > 50 player two wins.
function getWinnerFromRandomNumber() {
    //Calls the random number function
    const number = getRandomNumber();

    //Prints the winning number to the user.
    winningTicketOutput.textContent = "Roll Number : " + number.toFixed(4) + "%";

    //Checks the number to decide the winner, puts in the appropriate parameter
    if (number < 50) {
        printWinner(1);
        logResults(1, number);
        addPointToOverallScore(1);
    } else {
        printWinner(2);
        logResults(2, number);
        addPointToOverallScore(2);
    }
}

// When getWinnerFromRandomNumber() has decided a winner, print the results to the user.
function printWinner(winner) {
    // TODO: Optimize all this classlist methods..
    if (winner === 1) {
        rollResult[0].textContent = "WINNER!";
        rollResult[0].classList.add("green");
        rollResult[0].classList.remove("red");
        image.src = "img/terrorist.png";
        rollResult[1].classList.add("red");
        rollResult[1].classList.remove("green");
        rollResult[1].textContent = "LOSER!";
    } else {
        rollResult[0].textContent = "LOSER!";
        rollResult[0].classList.add("red");
        rollResult[0].classList.remove("green");
        image.src = "img/counter-terrorist.png";
        rollResult[1].textContent = "WINNER!";
        rollResult[1].classList.add("green");
        rollResult[1].classList.remove("red");
    }
}

function logResults(winner, ticket) {
    let name = getPlayerNames();
    let output = document.querySelector("#gameLog"); //chosen div
    let p = document.createElement("p");
    let text;
    if (winner === 1) {
        text = document.createTextNode(name[0].value + " won with the ticket : " + ticket.toFixed(4));
        p.appendChild(text);
        output.insertBefore(p, output.firstChild);
    } else {
        text = document.createTextNode(name[1].value + " won with the ticket : " + ticket.toFixed(4));
        p.appendChild(text);
        output.insertBefore(p, output.firstChild);
    }
}

function addPointToOverallScore(winner) {
    let scores = document.querySelectorAll(".amountOfWins");
    // Changes the i based on which one won the roll
    let i;
    if (winner === 1) {i = 0;} else {i = 1}
    // Converts the current score in the P element to a number
    let currentScore = parseInt(scores[i].textContent);
    //Adds +1 to the score and prints out the result!
    currentScore++;
    scores[i].textContent = currentScore;
}

// Rotates the image for tension :-)
function rotateCoinImage() {
    image.src = "img/both.png";
    let rotationDegree = 0;

    // Real simple way of rotating the image. it have to update the function ever 1ms though.. (probably a more efficient way of doing this)
    let rotateImage = setInterval(function() {
        image.style.transform = "rotate(" + rotationDegree + "deg)";
        rotationDegree += 1;

        if (rotationDegree >= 360) {
            image.style.transform = "rotate(360deg)";
            //Calls the function which generates the winner
            clearInterval(rotateImage);
            getWinnerFromRandomNumber();
            isClicked = false;
        }
    }, 2);
}

function toggleHidden() {
    const gameMenus = document.querySelectorAll("div .gameMenu");

    for (let i = 0; i < gameMenus.length; i++) {
        gameMenus[i].classList.toggle("hidden");
    }
    resetGameScreen();
}

function resetGameScreen() {
    rollResult[0].textContent = " ";
    rollResult[1].textContent = " ";
    image.src = "img/both.png";
    winningTicketOutput.textContent = " ";
}
