let compNum = Math.round(Math.random()*100+1);
let userInput = document.querySelector(`#guessField`);
let submitButton = document.querySelector(`#subt`);
let guessRemaining = document.querySelector(`.lastResult`);
let guesses = document.querySelector(`.guesses`);
let message = document.querySelector(`.lowOrHi`);
let resultParas = document.querySelector(`.resultParas`);

let p = document.createElement('p');

let playGame = true;
let prevGuess = [];
let numGuess = 1;

if(playGame){
    submitButton.addEventListener('click', function(e){
        e.preventDefault();
        let guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess){
    if(isNaN(guess)){
        alert(`Please enter a valid number`);
    }else if(guess<1){
        alert(`Please enter number greater than 0`)
    }else if(guess>100){
        alert(`Please enter number less than 101`);
    }else{
        prevGuess.push(guess);
        if(numGuess===11){
            displayMessage(`Random number was ${compNum}`);
            endGame();
        }else{
            checkGuess(guess);
            displayGuess(guess);
        }
    }
}

function checkGuess(guess){
    if(guess===compNum){
        displayMessage(`You Guessed it right. Random number was ${compNum}`);
        endGame();
    }else if(guess<compNum){
        displayMessage(`Number is too low`);
    }else{
        displayMessage(`Number is too high`);
    }
}

function displayGuess(guess){
    userInput.value = '';
    guessRemaining.innerHTML = `${11-numGuess}`;
    numGuess++;
    guesses.innerHTML += `${guess}, `;
}

function displayMessage(messageInput){
    message.innerHTML = `<h2>${messageInput}</h2>`;
}


function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button') 
    p.innerHTML = `<h2 id="newGame">Start new game</h2>`
    resultParas.appendChild(p);
    playGame = false;
    newGame();
}

function newGame(){
    const newGameButton = document.querySelector(`#newGame`);
    newGameButton.addEventListener('click', function(e){
        compNum = Math.round(Math.random()*100+1);
        e.preventDefault()
        userInput.removeAttribute(`disabled`);
        prevGuess = [];
        numGuess = 1;
        guesses.innerHTML = '';
        guessRemaining.innerHTML = `${11-numGuess}`;
        resultParas.removeChild(p);
        playGame = true;
    });
}
