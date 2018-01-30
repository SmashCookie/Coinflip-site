// TODO: Learn more about closures
const btnAddPlayerNames = document.querySelector("#btnAddPlayerNames");
const btnNewPlayers = document.querySelector("#btnNewPlayers");
const rollCoinBtn = document.querySelector("#rollCoinBtn");
const image = document.querySelector("#coinImage");
const p1roll = document.querySelector("#p1roll");
const p2roll = document.querySelector("#p2roll");
const winningTicketOutput = document.querySelector("#winningTicket");

btnNewPlayers.addEventListener("click", function(){
    toggleHidden();
});

btnAddPlayerNames.addEventListener("click", function() {
    //Loops through the html input fields and where to output the text to the screen
    for (let i = 1; i <= 2; i++) {
        const inp = document.querySelector("#p" + i + "nameInp");
        const output = document.querySelector("#p" + i + "name");
        output.textContent = inp.value;
    }
    toggleHidden();
});

// Call the neccesary functions when the user clicks the roll coin button.
// TODO: Note to self: If no other function calls needs to be made, change the addEventListener to ("click", rotateCoinImage())
rollCoinBtn.addEventListener("click", function() {
    rotateCoinImage();
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
    } else {
        printWinner(2);
    }
}

// When getWinnerFromRandomNumber() has decided a winner, print the results to the user.
function printWinner(winner) {
    // TODO: Optimize all this classlist methods..
    if (winner === 1) {
        p1roll.textContent = "WINNER!";
        p1roll.classList.add("green");
        p1roll.classList.remove("red");
        image.src = "img/terrorist.png";
        p2roll.classList.add("red");
        p2roll.classList.remove("green");
        p2roll.textContent = "LOSER!";
    } else {
        p1roll.textContent = "LOSER!";
        p1roll.classList.add("red");
        p1roll.classList.remove("green");
        image.src = "img/counter-terrorist.png";
        p2roll.textContent = "WINNER!";
        p2roll.classList.add("green");
        p2roll.classList.remove("red");
    }
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
        }
    }, 2);
}

// TODO: Create a querySelectorAll arr for the game menu toggles :-)
function toggleHidden() {
    const addNewPlayersMenu = document.querySelector("#addNewPlayersMenu"); // Users havent put in a name yet.
    const addNewPlayersButton = document.querySelector("#addNewPlayersButton"); // Users have put in name.
    const gameScreen = document.querySelector("#gameScreen");
    const headingEYN = document.querySelector("#headingEnterYourNames");
    const headingYLD = document.querySelector("#headingLuckyDay");
    const gameMenus = document.querySelectorAll("div .gameMenu");
    for(let i = 0; i < gameMenus.length; i++) {
        gameMenus[i].classList.toggle("hidden");
    }
    resetGameScreen();
}

function resetGameScreen() {
    p1roll.textContent = " ";
    p2roll.textContent = " ";
    image.src = "img/both.png";
    winningTicketOutput.textContent = " ";
}
