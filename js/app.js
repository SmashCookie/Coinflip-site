(function () {
    // The player class used to generate the name and a score property. also checks the 
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
    const GAME = {
        roll: 0,
        winner: '',
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
        Add_Point: (player) => {
            if (player === playerOne) {
                playerOne.addScore();
            } else if (player === playerTwo) {
                playerTwo.addScore();
            } else {
                throw new Error('Unexpected error @Add_Point at GAME object');
            }
        },
        // Generates a random number between 0 and 1,000,000.
        Roll_Coin: () => {
            GAME.roll = Math.floor(Math.random() * 1000000);
        },
        // Spins the coin image
        Spin_Coin: () => {
            if (toSpinOrNotToSpin) {
                setTimeout(function () {
                    toSpinOrNotToSpin = !toSpinOrNotToSpin;
                }, 2000);
            }
            if (toSpinOrNotToSpin) {
                CL.rotateImage360('#game #coin', 0.2, showResult);
                toSpinOrNotToSpin = false;
            }

        },
        // Generates the winner, if the number is below 499,999 then it's t side, else it's ct side.
        Get_Winner: () => {
            if (GAME.roll >= 499999) {
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
        Display_Winner_Text: (winner) => {
            const spans = CL.selectAll('.displayWinnerText');
            if (winner === 'terrorist') {
                spans[0].textContent = 'Winner';
                spans[1].textContent = 'Loser';
            } else if (winner === 'counterterrorist') {
                spans[0].textContent = 'Loser';
                spans[1].textContent = 'Winner';
            }
        },
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
        Remove_Winner_Text: () => {
            CL.selectAll('.displayWinnerText').forEach(span => span.textContent = '');
        }
    }
    // Calls on all the methods in the gameInfo object to initialize the game
    const initializeGame = () => {
        GAME.Create_New_Players();
        GAME.Display_Player_Names();
        GAME.Toggle_Player_Inputs();
        GAME.Toggle_header_text();
        GAME.Toggle_Display_Game();
    }
    // Calls on the methods that clears the game and prepares it for a new instance of the game
    const clearGame = () => {
        GAME.Clear_Player_Inputs();
        GAME.Clear_Player_Names();
        GAME.Toggle_header_text();
        GAME.Toggle_Player_Inputs();
        GAME.Toggle_Display_Game();
        GAME.Remove_Winner_Text();
    }
    // Plays the game each time the play button is clicked
    const showResult = () => {
        // Rolls the coin -Must be above functions requireing the number-
        GAME.Roll_Coin();
        // Get_Winner method returns either 'terrorist', or 'counterterrorist'.
        GAME.Change_Coin_Image_To(GAME.Get_Winner());
        GAME.Display_Winner_Text(GAME.Get_Winner());
        GAME.Change_Winner_Color(GAME.Get_Winner());
    }
    // Spins the coin and changes the image also resets the player name colors
    const spinCoin = () => {
        GAME.Change_Coin_Image_To('both');
        GAME.Remove_Winner_Text();
        GAME.Spin_Coin();
    }
    // Binds the click event on the 'PLAY!' button to the initialize function
    CL.select('#btnPlay').addEventListener('click', initializeGame);
    // Binds the click event on the new game button to the clearGame function
    CL.select('#btnNewGame').addEventListener('click', clearGame);
    // Binds the click event on the spin button tothe clearGame function
    CL.select('#btnSpin').addEventListener('click', spinCoin);
})();