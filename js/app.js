(function () {
    // The player class used to generate the name and a score property.
    class Player {
        constructor(playerName, team) {
            this.name = playerName;
            this.team = team;
            this.points = 0;
        }
        get name() {
            return this._name;
        }
        set name(value) {
            this._name = value;
        }
        get score() {
            return this.points;
        }
        addScore() {
            this.points++;
        }
    }
    // The 'global' player objects
    let playerOne = new Player(CL.getInput('#playerOne'), 't');
    let playerTwo = new Player(CL.getInput('#playerTwo'), 'ct');
    // array of the player objects
    let players = [playerOne, playerTwo];
    // HOTFIX TODO: FIX
    let toSpinOrNotToSpin = true;
    // objects that contains the methods to display / change information on the screen
    const COINFLIP = {
        roll: 0,
        Create_New_Players: () => {
            // The 'global' player objects
            playerOne = new Player(CL.getInput('#playerOne'), 't');
            playerTwo = new Player(CL.getInput('#playerTwo'), 'ct');
            // array of the player objects
            players = [playerOne, playerTwo];
        },
        // Displays the player names on the game screen
        Display_Player_Names: () => {
            let i = 0;
            CL.selectAll('.displayPlayerName').forEach((name) => {
                name.textContent = players[i]._name;
                i++;
            });
        },
        // Hides the player inputs and the 'PLAY!' button and shows the 'new game' button instead
        Toggle_Player_Inputs: () => {
            CL.select('#newGameScreen').classList.toggle('hidden');
            CL.select('#newGameButtonScreen').classList.toggle('hidden');
        },
        // toggles the header text to display
        Toggle_header_text: () => {
            CL.selectAll("header h1").forEach(header => header.classList.toggle('hidden'));
        },
        // Displays the game container
        Toggle_Display_Game: () => {
            CL.select('#game').classList.toggle('hidden');
            CL.select('#resultDiv').classList.toggle('hidden');
        },
        // Clears the input fields
        Clear_Player_Inputs: () => {
            CL.selectAll('#newGameScreen input').forEach(input => input.value = '');
        },
        // Clears the player names in the game field
        Clear_Player_Names: () => {
            CL.selectAll('.displayPlayerName').forEach(span => span.textContent = '');
        },
        // adds a score point to the chosen player
        Add_Point_To_Winner: (player) => {
            if (player === 'terrorist') {
                playerOne.addScore();
            } else if (player === 'counterterrorist') {
                playerTwo.addScore();
            }
        },
        // Generates a random number between 0 and 1,000,000.
        Roll_Coin_Ticket: () => {
            COINFLIP.roll = Math.floor(Math.random() * 1000000);
        },
        // Spins the coin image
        Spin_Coin: () => {
            // Starts a timeout that will set the toSpinOrNotToSpin to the opposite of what it is
            // In this case it should always set it to True.
            if (toSpinOrNotToSpin) {
                setTimeout(function () {
                    toSpinOrNotToSpin = !toSpinOrNotToSpin;
                }, 2000);
            }
            // Calls teh rotateImage360 method from the CL Library
            if (toSpinOrNotToSpin) {
                CL.rotateImage360('#game #coin', 0.2, showResult);
                // Prevents the rotateImage360 method to be called again while the animation is still going.
                toSpinOrNotToSpin = false;
            }

        },
        // Generates the winner, if the number is below 499,999 then it's t side, else it's ct side.
        // This method will either return the string 'terrorist', or 'counterterrorist'.
        Get_Winner_Name: () => {
            if (COINFLIP.roll <= 499999) {
                return 'terrorist';
            } else {
                return 'counterterrorist';
            }
        },
        // Changes the image to either a coin showing 'both', one showing the 'terrorist' side, 
        // or the one showing the 'counterterrorist' side.
        Change_Coin_Image_To: (coin) => {
            // array of the coin images
            const coins = ['./img/both.png', './img/terrorist.png', './img/counter-terrorist.png'];
            const img = CL.select('#coin');
            if (coin === 'both') {
                img.src = coins[0];
            } else if (coin === 'terrorist') {
                img.src = coins[1];
            } else if (coin === 'counterterrorist') {
                img.src = coins[2];
            }
        },
        // Changes the textContent of the span elements to either Winner or Loser depending who won
        Display_Result_Text: (winner) => {
            const spans = CL.selectAll('.displayWinnerText');
            if (winner === 'terrorist') {
                spans[0].textContent = 'Winner';
                spans[1].textContent = 'Loser';
            } else if (winner === 'counterterrorist') {
                spans[0].textContent = 'Loser';
                spans[1].textContent = 'Winner';
            }
        },
        // Changes the colors of the spans to either green or red, depeding on who lost or won.
        Change_Winner_Color: (winner) => {
            const spans = CL.selectAll('.displayWinnerText');
            if (winner === 'terrorist') {
                spans[0].style.color = 'green';
                spans[1].style.color = 'red';
            } else if (winner === 'counterterrorist') {
                spans[0].style.color = 'red';
                spans[1].style.color = 'green';
            }
        },
        // Removes the textContent of the span elements displaying either 'winner' or 'loser'
        // When a new game is initialized
        Remove_Result_Text: () => {
            CL.selectAll('.displayWinnerText').forEach(span => span.textContent = '');
        },
        // Displays the current score of the two players
        Display_Current_Player_Score: () => {
            // Span elements
            const ele = CL.selectAll('.playerResults');
            // Counter
            let i = 0;
            players.forEach((player) => {
                ele[i].textContent = `Score: ${player.points}`
                i++;
            });
        },
        // Displays the recent result to the screen
        // TODO: Refactor and optimize this code if possible.
        Display_Recent_Result: (winner) => {
            const roll = `${COINFLIP.roll}`;
            const arr = roll.split('');
            arr.splice(2, 0, '.');
            const winningRoll = arr.join('');
            let winnerName;
            if(winner === 'terrorist'){
                winnerName = 'Terrorist';
            }else{
                winnerName = 'Counter Terrorist';
            }
            // createTextElement : Element to make - class - content
            CL.select('#resultLog').insertBefore(CL.createTextElement('p', 'lead', `${winnerName} won with the roll of ${winningRoll}%`), CL.select('#resultLog').firstChild);
        },
        Clear_Recent_Result: () => {
            CL.select('#resultLog').innerHTML = '';
        }
    }
    // Calls on all the methods in the gameInfo object to initialize the game
    const initializeGame = () => {
        // Checks if the input fields are empty
        if (CL.getInput('#playerOne') == '' || CL.getInput('#playerTwo') == '') {
            alert("Whoops! Seems like we didn't get one of the names!");
            // returns and does not execute the code below
            return
        }
        // Creates new player objects, completly rewrites old ones.
        COINFLIP.Create_New_Players();
        // Displays those player names in the 'game' div.
        COINFLIP.Display_Player_Names();
        // Hides the player inputs
        COINFLIP.Toggle_Player_Inputs();
        // Changes the header text
        COINFLIP.Toggle_header_text();
        // Displays the current score of both players.
        COINFLIP.Display_Current_Player_Score();
        // Displays the 'game' div.
        COINFLIP.Toggle_Display_Game();
    }
    // Calls on the methods that clears the game and prepares it for a new instance of the game
    const clearGame = () => {
        // Clears the value of the input elements
        COINFLIP.Clear_Player_Inputs();
        // Clears the text displaying the old player names
        COINFLIP.Clear_Player_Names();
        // Toggles the top header text
        COINFLIP.Toggle_header_text();
        // Shows the player inputs again
        COINFLIP.Toggle_Player_Inputs();
        // Hides the 'game' div
        COINFLIP.Toggle_Display_Game();
        // Removes the result text from the old game
        COINFLIP.Remove_Result_Text();
        // Changes the coin image to both.png
        COINFLIP.Change_Coin_Image_To('both');
        // Clears the result log
        COINFLIP.Clear_Recent_Result();
    }
    // Plays the game each time the play button is clicked
    const showResult = () => {
        // Generates the winning ticket. This method must be called before any Get_Winner methods is called.
        COINFLIP.Roll_Coin_Ticket();
        // #Get_Winner method returns a string with either 'terrorist', or 'counterterrorist'.#
        // Changes the coin image based on who won.
        COINFLIP.Change_Coin_Image_To(COINFLIP.Get_Winner_Name());
        // Displays a text with 'winner' or 'loser' depending who won.
        COINFLIP.Display_Result_Text(COINFLIP.Get_Winner_Name());
        // Changes the color of the result text
        COINFLIP.Change_Winner_Color(COINFLIP.Get_Winner_Name());
        // Adds a point to the correct player
        COINFLIP.Add_Point_To_Winner(COINFLIP.Get_Winner_Name());
        // Displays the result
        COINFLIP.Display_Recent_Result(COINFLIP.Get_Winner_Name());
        // Displays the current score of both players.
        COINFLIP.Display_Current_Player_Score();
    }
    // Spins the coin and changes the image also resets the player name colors
    const spinCoin = () => {
        // Changes the coin image to both.png
        COINFLIP.Change_Coin_Image_To('both');
        // Removes the text indicating who won
        COINFLIP.Remove_Result_Text();
        // Animates the coin in a spinning motion
        COINFLIP.Spin_Coin();
    }
    // Binds the click event on the 'PLAY!' button to the initialize function
    CL.select('#btnPlay').addEventListener('click', initializeGame);
    // Binds the click event on the new game button to the clearGame function
    CL.select('#btnNewGame').addEventListener('click', clearGame);
    // Binds the click event on the spin button tothe clearGame function
    CL.select('#btnSpin').addEventListener('click', spinCoin);
})();