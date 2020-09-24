/* FLOW:
Pick a random letter
Wait for user to type a key on keyboard
CHeck that letter against computer chosen random letter
Let user know if right or wrong
    If wrong, deduct from # of guesses, show wrong guess, render wrong guess on screen
    If wrong and no guesses left, show lose msg, update losses, reset/re-initialize gane
    If right, show win msg, update wins total, reset/re-initialize game
*/


// Game Vars
let wins = 0;
let losses = 0;
let guessesLeft = 10;

let userGuesses = []; // keep track of a list of letters user has chosen
let randomLetter;
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');




// UI Functions
// Use functions to store code that will manipulate the DOM
// set the value of the span with id win in front end to the value of the UI Var at the time we call the function
const winsElement = () => (document.getElementById('wins').innerHTML = wins);
const lossesElement = () => (document.getElementById('losses').innerHTML = losses);
const guessesLeftElement = () => (document.getElementById('guesses-left').innerHTML = guessesLeft);
const userGuessesElement = () => (document.getElementById('user-guess').innerHTML = userGuesses)






// Utility Function
const computerChoice = () => {
    randomLetter = letters[Math.floor(Math.random() * letters.length)];
}

const displayMessage = message => alert(message);






// Initialize game function
const initializeGame = () => {
// A - on first load
//      show initial data: wins, losses, guess left
//      show user guesses array w no letters

// B - after a win/loss game condition is met/after game has finished
//      clear old guesses, show user guesses array w no letters
//      show guesses left from a new game

// check if user has already played and is resetting
if(userGuesses.length > 0 && guessesLeft !== 10) {
    userGuesses = [];
    guessesLeft = 10;
}

winsElement(); // no matter what the value is for win/losses, it will always update the right amount
lossesElement();
guessesLeftElement();
userGuessesElement();
computerChoice();
}





// Event Listeners

document.addEventListener('keypress', function(event) {
    /* listen for user to type key in keyboard
    */
   const userChoice = event.key.toLowerCase();

// exclude numbers
// exclude special chars
   if(!letters.includes(userChoice)) {
//      show error msg
    displayMessage("Only letters allowed");
    } else if(userGuesses.includes(userChoice)) {
//      show error msg
    displayMessage(`Already guessed '${userChoice}'`);
    } else {
        // only alpha chars
        // decrement # of guesses
        guessesLeft -= 1;
        userGuesses.push(userChoice);
        userGuessesElement();   
        guessesLeftElement();
    };
    // check against random letter chosen by PC
    if(randomLetter === userChoice) {
        //      if right -> win, then increment wins, show win msg
        wins += 1;
        displayMessage('Congrats');
        initializeGame();
        
    } else if(guessesLeft === 0) {
        //      check if # guess !0
        //          if no guesses left, losses +1 to a loss based on game end
        losses += 1;
        displayMessage(":(")
        initializeGame();
    }
    //              a: ['a', 'b', ... 10th element] <- at the time of the loss condition
});

// Initiialize Application
initializeGame();