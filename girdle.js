$(function(){
    generateSecretWord();
    alert(welcomeMessage);
});

var welcomeMessage = "Weclcome to Girdle, another Wordle knockoff!\n\n" +
"The secret word wraps clockwise in a circle.\n\n" + 
"The word can start at any point in the circle, but you must start entering letters from the top square.\n\n"
+ "Good luck!";
var globalVars = {};

let words = ["apple", "charm", "plank", "sieve", "azure", "glued", "spoke", "yacht", "theme", "speak"];
let ordinals = {1: "second", 2: "third", 3: "fourth", 4:"fifth", 5: "first"}

function generateSecretWord(){
    let secretWord = words[Math.floor(Math.random() * words.length)];
    secretWord = secretWord.toUpperCase()

    globalVars.startPos = Math.floor(1 + 5 * Math.random()) - 1;
    globalVars.firstTileShuffled = Math.abs(5 - globalVars.startPos);
    globalVars.secretWordPretty = secretWord;
    globalVars.secretWord = getScrambled(secretWord);  
    globalVars.secretWordCharsArray = globalVars.secretWord.split('');
}

let nthTry = 0;
let moreTries = true;
let wordGuess = "";
let tileIndex = 0;
let tileClasses = {0:"tile-1-1", 1:"tile-1-2", 2:"tile-1-3", 3:"tile-1-4", 4:"tile-1-5"};
let greenKeys = [];
let yellowKeys = [];
let greyKeys = [];

function keyOrButtonPressed(key) {
    if(moreTries == true){
        if (key == 'Backspace') {
            handleBackspace();
        } else if (key == 'Enter') {
            handleEnter(); 
        } else {
            handleLetterPress(key);
        }
    }
} 


function handleBackspace(){ 
    if (tileIndex > 0) {
        tileIndex = tileIndex - 1;
        $(`#${tileClasses[tileIndex]}`).css("border-color", "var(--cirdle_light_grey)");
    }
    if(wordGuess.length > 0) {
        wordGuess = wordGuess.slice(0, -1);
    }
    document.getElementById(tileClasses[tileIndex]).innerHTML = '';
}

function handleEnter(){
    if(wordGuess.length < 5){
        alert("too short");
        return;
    } else if (wordGuess == globalVars.secretWord){
        winGame();
    } else { // if wordGuess is the correct length but it's not equal to the secretWord:
        handleWrongGuess();
        if(nthTry < 8){
            newRound();
        } else {
            endGame();
        }
    } 
}


function handleLetterPress(key){ // what to do if user pushes a letter key
    if(tileIndex < 5){ 
        wordGuess += key;
        $(`#${tileClasses[tileIndex]}`).css("border-color", "var(--cirdle_grey)");  
        $(`#${tileClasses[tileIndex]}`).html(key);   
        tileIndex++;
    } 
}  


function newRound(){ //prepare game board for next round
    nthTry++;
    circleNum = nthTry +1;
    tileClasses = {0:"tile-" + circleNum + "-1", 1:"tile-" + circleNum + "-2", 2: "tile-" + circleNum + "-3", 3: "tile-" + circleNum + "-4", 4:"tile-" + circleNum + "-5"};
    wordGuess = "";
    tileIndex = 0;
}


function endGame(){
    $("#notifications").html(`${globalVars.secretWordPretty}`);
    moreTries = false;
}


function winGame(){
    moreTries = false;
    for (let i = 0; i < 5; i++) {
        changeTileColor(i, "var(--cirdle_green)");
    }
    alert("you got it!");
}


function getScrambled(secretWord){
    let startPos = globalVars.startPos;
    let scrambled = "";
    prettyIndex = startPos;
    for (let i = 0; i < 5; i++){
        if(prettyIndex > 4){
            prettyIndex = 0;
        } 
        scrambled = scrambled + secretWord[prettyIndex];
        prettyIndex = prettyIndex + 1;
    }
    return scrambled;
}

function handleWrongGuess() {
    let secretWord = globalVars.secretWord;
    let alreadyYellow = [];
    // for each tile in the circle:
    for (let i = 0; i < 5; i++) {
        // if user guess at this position is correct
        if (wordGuess[i] == secretWord[i]){
            changeTileColor(i, "var(--cirdle_green)");
            changeKeyColor(wordGuess[i], "correct"); 
        
        // if letter isn't at the position the user put it, 
        // but exists at least one other place in the secret word:  
        } else if(secretWord.includes(wordGuess[i])){ 
            let letter = wordGuess[i];
            // we don't want duplicate yellow tiles for the same letter in the same circle
            if(alreadyYellow.includes(letter)){
                changeTileColor(i, "var(--cirdle_dark_grey)");
            } else { // if we don't already have a yellow tile for this letter in this circle
                let letterIndexes = getAllIndexes(globalVars.secretWordCharsArray, letter);
                let numInstances = letterIndexes.length;
                // Iterate over all positions of this letter in the secret word.
                // If user missed any of them, turn the tile yellow. 
                 for(let ndex = 0;  ndex < numInstances; ndex++){
                    let letterIndex = letterIndexes[ndex];
                     if(wordGuess[letterIndex] !== secretWord[letterIndex]){ // if user guess is not a match at this position
                        changeTileColor(i, "var(--cirdle_yellow)");
                        changeKeyColor(wordGuess[i], "somewhere else");
                        alreadyYellow.push(letter);
                    } else { 
                        // if user correctly guessed all positions of the letter, turn tile grey.
                        changeTileColor(i, "var(--cirdle_dark_grey)");
                    }
                 }
            }
        } else { // if this particular letter isn't in the secret word:
            changeTileColor(i, "var(--cirdle_dark_grey)");
            changeKeyColor(wordGuess[i], "not in word");
        }
    }    
}


function changeKeyColor(letter, placement){
    if(!greenKeys.includes(letter)){ // don't change key if it's already green
        let regExPattern = new RegExp("^" + letter + "$");
        if(placement == "correct"){
            $('button')
            .filter(function() {
                return this.innerHTML.match(regExPattern);
            }).css({"background-color": "#6ca965", "color": "white"});
            greenKeys.push(letter);
            return;
        } else if(placement == "somewhere else"){
            if(!yellowKeys.includes(letter)){
                $('button')
            .filter(function() {
                return this.innerHTML.match(regExPattern);
            }).css({"background-color": "#c8b653", color: "white"});
            yellowKeys.push(letter);
            return;
            } 
        } else {
            $('button')
            .filter(function() {
                return this.innerHTML.match(regExPattern);
            }).css({"background-color": "#787c7f", color: "white"});
            greyKeys.push(letter);
            return;
        }
    }  
}

function changeTileColor(i, tileColor){
    $(`#${tileClasses[i]}`).css("color", "white");
    $(`#${tileClasses[i]}`).css("background-color", tileColor);
    $(`#${tileClasses[i]}`).css("border-style", "none");
} 

function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}





