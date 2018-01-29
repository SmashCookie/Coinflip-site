const btnAddPlayerNames = document.querySelector("#btnAddPlayerNames");
const rollCoinBtn = document.querySelector("#rollCoinBtn");

btnAddPlayerNames.addEventListener("click", function() {
    for (let i = 1; i <= 2; i++) {
        const inp = document.querySelector("#p" + i + "nameInp");
        const output = document.querySelector("#p" + i + "name");
        output.textContent = inp.value;
    }
});

// Call the neccesary functions when the user clicks the roll coin button.
rollCoinBtn.addEventListener("click", function() {
    getWinnerFromRandomNumber();
});

// Gets a random number
function getRandomNumber() {
    const number = Math.floor(Math.random() * 100) + 1;
    return number;
}

// Checks the random number, if n < 50 player one wins, and if n > 50 player two wins.
function getWinnerFromRandomNumber() {
    const number = getRandomNumber();
    if (number < 50) {
        console.log("tallet er under 50");
        console.log(number);
        printWinner(1);
    } else {
        console.log("Tallet er over 50");
        console.log(number);
        printWinner(2);
    }
}

// When getWinnerFromRandomNumber() has decided a winner, print the results to the user.
function printWinner(winner) {
    const p1roll = document.querySelector("#p1roll");
    const p2roll = document.querySelector("#p2roll");

    if (winner === 1) {
        p1roll.textContent = "WINNER!";
        p2roll.textContent = "LOSER!";
    } else {
        p1roll.textContent = "LOSER!";
        p2roll.textContent = "WINNER!";
    }
}
