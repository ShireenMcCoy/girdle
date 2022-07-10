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
    globalVars.startPos = Math.floor(1 + 5 * Math.random()) - 1;
    globalVars.firstTileShuffled = Math.abs(5 - globalVars.startPos);
    secretWord = secretWord.toUpperCase()
    globalVars.secretWordPretty = secretWord;
    globalVars.secretWord = getScrambled(secretWord);   
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
            submitWord(); 
        } else {
            handleLetterPress(key);
        }
    }
} 


function handleBackspace(){ // what to do if user pushes backspace key
    if (tileIndex > 0) {
        tileIndex = tileIndex - 1;
        $(`#${tileClasses[tileIndex]}`).css("border-color", "var(--cirdle_light_grey)");
    }
    if(wordGuess.length > 0) {
        wordGuess = wordGuess.slice(0, -1);
    }
    document.getElementById(tileClasses[tileIndex]).innerHTML = '';
}

function submitWord(){
    if(wordGuess.length < 5){
        alert("too short");
        return;
    } else if (wordGuess == globalVars.secretWord){
        winGame();
        //moreTries = false;
    } else { // if wordGuess is the correct length but it's not equal to the secretWord:
        let secretWord = globalVars.secretWord;
        for (let i = 0; i < 5; i++) {
            if (wordGuess[i] == secretWord[i]){
                $(`#${tileClasses[i]}`).css("color", "white");
                $(`#${tileClasses[i]}`).css("background-color", "var(--cirdle_green)");
                $(`#${tileClasses[i]}`).css("border-style", "none");
                changeKeyColor(wordGuess[i], "correct");
            } else if(secretWord.includes(wordGuess[i])){
                $(`#${tileClasses[i]}`).css("color", "white");
                $(`#${tileClasses[i]}`).css("background-color", "var(--cirdle_yellow)").css("border", "none");
                changeKeyColor(wordGuess[i], "somewhere else");
            } else { // if this particular letter isn't in the secret word:
                $(`#${tileClasses[i]}`).css("color", "white");
                $(`#${tileClasses[i]}`).css("background-color", "var(--cirdle_dark_grey)").css("border", "none");
                changeKeyColor(wordGuess[i], "not in word");
            }
        }

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


function newRound(){ //prepare game board for next round
    nthTry++;
    circleNum = nthTry +1;
    tileClasses = {0:"tile-" + circleNum + "-1", 1:"tile-" + circleNum + "-2", 2: "tile-" + circleNum + "-3", 3: "tile-" + circleNum + "-4", 4:"tile-" + circleNum + "-5"};
    wordGuess = "";
    tileIndex = 0;
    //resetTiles();
    //$("#notifications").html("");
}


function endGame(){
    //("out of turns");
   /*  $("#notifications").html(`The secret word is: ${globalVars.secretWordPretty}<br>starting at the ${ordinals[globalVars.firstTileShuffled]} square`
    ); */
    $("#notifications").html(`The secret word is: ${globalVars.secretWordPretty}`);
    moreTries = false;
}


    function winGame(){
    moreTries = false;
    for (let i = 0; i < 5; i++) {
        $(`#${tileClasses[i]}`).css("color", "white");
        $(`#${tileClasses[i]}`).css("background-color", "var(--cirdle_green)");
        $(`#${tileClasses[i]}`).css("border-style", "none");
    }
    $("#notifications").html("you got it!");
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





