$(function(){
    generateSecretWord();
    let keyboardHeight = $("#visual-keyboard").height();
    let headerHeight = $("#girdleHeader ").height();
    $("#ui").css(`height`, `calc(100% - ${headerHeight}px - ${keyboardHeight}px)`);
    $("#weclomeText").click(function(){
        $("#weclomeText").toggle();
      });
});

var globalVars = {};

let words = ["apple", "charm", "plank", "sieve", "azure", "glued", "spoke", "yacht", "theme", "speak", "quack", "zilch",  "gizmo", "agile", "actor", "aunts", "awake", "award", "avoid", "babel", "berry", "bloke", "blues", "blond", "bogus", "boxer", "brain", "bribe", "bread", "bytes", "cater", "cheek", "chats", "chasm", "clams", "clown", "clues", "coach", "comic", "cooed", "coven", "cream", "decaf", "decor", "deeds", "denim", "digit", "diner", "doing", "dogma", "donut", "drama", "dried", "drink", "drawl", "drugs", "drums", "dryly", "eight", "elegy", "email", "embed", "ember", "empty", "ennui", "evict", "exact", "exams", "fancy", "fault", "fewer", "fever", "fiats", "fixer", "fixed", "fizzy", "flaky", "flick", "flirt", "flood", "floor", "flung", "flock", "fraud", "frats", "futon", "gaffe", "genes", "giddy", "gnome", "goats", "goals", "goths", "gravy", "grays", "greet", "guilt", "gummy", "gyros", "harms", "hatch", "hardy", "happy", "haste", "hasty", "heaps", "heave", "heavy", "hedge", "hears", "heard", "hello", "hence", "highs", "holds", "hires", "honks",  "hoped", "house", "hotel", "hound", "human", "humor", "hyped", "icier", "icons", "items", "joker", "jokes", "kiddo", "kilns", "knees", "knife", "laces", "lacks", "lawns", "lever", "levee", "limbo", "loony", "loopy", "lunch", "mafia", "magic", "magma", "masks", "mayor", "melon", "melts", "memes", 
"memos", "meaty", "mealy", "meter", "miner", "mined", "mints", "mends", "midst", "might", "missy", "mourn", "mummy", "mumps", "muses", "myths", "nails", "nerdy", "nerds", "nerve", "newts", "ninth", "noisy", "nukes", "nuked", "nubby", "oddly", "omega", "onion", "oozes", "opine", "onset", "organ", "overt", "ozone", "paces", "pages", "pails", "panic", "pants", "panel", "parks", "patch", "patio", "pawed", "peach", "peaks", "pears", "peeks", "pecks", "peril", "pesky", "phone", "piano", "picks", "piece", "pinky", "pivot", "plush", "poise", "polar", "poker", "poles", "polka", "poked", "ponds", "poofy", "poser", "prawn", "pride", "pried", "press", "prime", "primp", "prose", "psalm", "pulls", "pupil", "pushy", "quads", "quack", "quill", "quilt", "quick", "quits", "quirk", "quota", "rabbi", "raced", "rager", "rages", "rainy", "rains", "ranch", "rarer", "rates", "raves", "ready", "realm", "rears", "reams", "react", "rebut", "reeks", "reels", "relax", "reins", "relic", "renew", "repay", "remit", "resin", "retro", "retry", "reuse", "retch", "rifle", "right", "riffs", "rigid", "rigor", "riled", "ritzy", "roach", "roads", "robot", "rogue", "roots", "ruses", "salvo", "salty", "salts", "salad", "sated", "saucy", "sauce", "scale", "scald", "scams", "scans", "scant", "scars", "scare", "scarf", "scamp", "scary", "scent", "scold", "scowl", "shack", "shags", 
"shaky", "shall", "shank", "shear", "shirt", "shlep", "shoes", "shone", "shook", "shoos", "short", "shore", "shush", "shuts", "shuns", "sifts", "sight", "sighs", "sided", "siege", "since", "siren", "sixth", "sizes", "skill", "skirt", "skips", "skins", "slain", "slate", "slaps", "sleek", "sleep", "slept", "slier", "slide", "slime", "slews", "sleds", "slope", "slugs", "slump", "slurp", "slyly", "smell", "smear", "smock", "smoky", "snack", "snags", "snail", "snake", "snaps", "sneak", "smush", "snare", "snags", "snowy", "snubs", "soaps", "soapy", "socks", "sofas", "soups", "space", "spank", "spawn", "spent", "spree", "stake", "stark", "stern", "stiff", "stork", "stout", "straw", "strap", "strip", "stray", "strut", "stuns", "stunt", "style", "sways", "swift", "swims", "table", "taboo", "tacks", "tacky", "taffy", "tails", "taken", "taper", "tarts", "tasks", "taste", "teary", "teddy", "teeny", "tempt", "testy", "theft", "thick", "thing", "these", "thigh", "throw", "tidal", "tiles", "tiers", "timer", "tipsy", "toads", "today", "taffy", "tombs", "tomes", "tonal", "toned", "trail", "towns", "track", "toxic", "toyed", "toxin", "treat", "trial", "tribe", "truly", "tummy", "tuned", "tunes", "tusks", "twigs", "twerk", "twice", "twill", "typos", "tzars", "uncle", "unbox", "undid", "unity", "upper", "utero", "vases", "vegan", "vials", "vigil", "vigor", 
"villa", "viola", "wacko", "wacky", "waded", "wagon", "wails", "waits", "wakes", "warts", "waspy", "watch", "water", "wears", "whelp", "where", "whims", "whine", "while", "whisk", "whose", "wider", "wired", "wiped", "wizer", "wooed", "wooer", "world", "worse", "worth", "wrong", "wrote", "xerox", "years", "yearn", "yeast", "yelps", "yield", "young", "yowza", "zilch", "zines",  ];

function generateSecretWord(){
    let secretWord = words[Math.floor(Math.random() * words.length)];
    secretWord = secretWord.toUpperCase();

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
    /* $("#transparency-overlay").addClass("fadeOutBackground");  
    return; */
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
        addAnimation("tile-shake");
        setTimeout(function() {
            removeAnimation("tile-shake");
        }, 200);
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
    moreTries = false;
    togglePopup(globalVars.secretWordPretty, "secretWord");
}


function winGame(){
    moreTries = false;
    for (let i = 0; i < 5; i++) {
        changeTileColor(i, "var(--cirdle_green)");  
    }
    doHappyDance();
    setTimeout(() => {togglePopup(globalVars.secretWordPretty, "secretWord")}, 2200
     );
    
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


function addAnimation(animationClassName){
    let selectorString = "";
    for (i = 0; i<5; i++) {
        selectorString = selectorString + "#"  + tileClasses[i] + ", ";
    }
    selectorString = selectorString.slice(0, -2) 
    $(selectorString).addClass(animationClassName);
}


function removeAnimation(animationClassName){
    let selectorString = "";
    for (i = 0; i<5; i++) {
        selectorString = selectorString + "#"  + tileClasses[i] + ", ";
    }
    selectorString = selectorString.slice(0, -2);
    $(selectorString).removeClass(animationClassName);
}



function togglePopup(popupText, containerId) {
    var popup = document.getElementById(containerId);
    $(popup).html(popupText);
    popup.classList.toggle("show");
  }


  function doHappyDance(){
    if(globalVars.firstTileShuffled == 5){
        globalVars.firstTileShuffled = 0;
    }
    startingIndex = globalVars.firstTileShuffled;
    let joyJumpLength = 500; // in milliseconds
    for (let i = 0; i < 5; i++){
        let index = startingIndex + i;
        if(index > 4){
            index = Math.abs(index - 5);
        }
        
        let selector = "#"  + tileClasses[index];
        let timeoutLength = ((i+1) * joyJumpLength / 2)
        let timeoutFunction = () => {
            return $(selector).addClass("joy-jump");
        };
        setTimeout(timeoutFunction, timeoutLength);
    }
  }
