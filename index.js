const inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
resetBtn = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typing-input");

let word, maxGuesses, incorrects = [], corrects = [];

function randomWord() {
  //getting random object from wordlist
    let ranItem=  wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word; //getting word of random object
    maxGuesses =  word.length >= 5 ? 8 : 6;
    corrects = []; incorrects = [];

    hintTag.innerText = ranItem.hint;
    guessLeft.innerText = maxGuesses;
    

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
  }
randomWord();

function initGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes(key)) {
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] === key) {
                    corrects += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses --; //decrement maxGuesses by 1
            incorrects.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrects;
    }
    typingInput.value = "";

    setTimeout(() => {
        if(corrects.length === word.length) { //if user found all letters
            alert(`Congrats! You found the word ${word.toUpperCase()}`);
            return randomWord(); //calling randomWord func, so the game reset
        } else if(maxGuesses < 1) { // if user couldn't found all letters
            alert("Game over! You don't have remaining guesses");
            for( let i = 0; i < word.length; i++) {
              //show all letters in the input
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());