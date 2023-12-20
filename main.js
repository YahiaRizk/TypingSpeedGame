// Words Arrays
const words = [
  "Ability",
  "Backing",
  "Capital",
  "Benefit",
  "Already",
  "Decided",
  "Chapter",
  "Default",
  "Arrange",
  "Closure",
  "Economy",
  "Display",
  "Diamond",
  "Engaged",
  "Dynamic",
  "Connect",
  "Content",
  "Context",
  "Gateway",
  "Foreign",
  "Forward",
  "Healthy",
  "Justice",
  "Improve",
  "Inquiry",
  "Manager",
  "Massive",
  "Maximum",
  "Nervous",
  "Learned",
  "Loyalty",
  "Nuclear",
  "Pacific",
  "Optical",
  "Patient",
  "Summary",
  "Recover",
  "Teacher",
  "Speaker",
  "Running",
];

// Levles And Default Level
const lvls = {
  Easy: 6,
  Normal: 4,
  Hard: 2,
};

let defaultLvlName = "Normal";
let defaultLvlTime = lvls[defaultLvlName];
console.log(defaultLvlTime);

//Select Elements
let lvlNameSpan = document.querySelector(".message .lvl");
let lvlsecondsSpan = document.querySelector(".message .seconds");
let startButton = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upcomingWords = document.querySelector(".upcoming-word");
let timeLeft = document.querySelector(".control .time span");
let scoreGot = document.querySelector(".control .score .got");
let scoreTotal = document.querySelector(".control .score .total");
let finish = document.querySelector(".finish");

//Set Default Level and Seconds, Time Left, Score and Total score
lvlNameSpan.innerHTML = defaultLvlName;
lvlsecondsSpan.innerHTML = defaultLvlTime;
timeLeft.innerHTML = defaultLvlTime;
scoreGot.innerHTML = "0";
scoreTotal.innerHTML = words.length;

//Stop past option on input
input.onpaste = function () {
  return false;
};

//Handle Start Button Click to start the game
startButton.onclick = function () {
  //Remove Start Button, Focus on input and Call generateWord function
  startButton.remove();
  input.focus();
  generateWord();
};

//Generate Randome Word Function
function generateWord() {
  input.value = "";
  //Get random word form words array and its index
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let index = words.indexOf(randomWord);

  //Remove the word from the array
  words.splice(index, 1);

  //Call function that handle upcomming words
  genUpcoming();

  //Append the word to page
  appendWord(randomWord);

  //Handle Repeated function for play
  play();
}

//Generate Upcoming words functions
function genUpcoming() {
  //Empty upcoming div
  upcomingWords.innerHTML = "";

  //Append Words to the div
  words.forEach((word) => {
    let div = document.createElement("div");
    let divtext = document.createTextNode(word);
    div.append(divtext);
    upcomingWords.appendChild(div);
  });
}

//Function that Append word to the word div in the page
function appendWord(word) {
  theWord.innerHTML = "";
  let text = document.createTextNode(word);
  theWord.appendChild(text);
}

//Play Function
function play() {
  let start = setInterval(function () {
    timeLeft.innerHTML--;
    if (words.length >= 0) {
      //if the time is 0
      if (timeLeft.innerHTML == 0) {
        clearInterval(start);
        //if the input = the word
        if (input.value.toLowerCase() == theWord.innerHTML.toLowerCase()) {
          //increment score
          scoreGot.innerHTML++;
        }
        timeLeft.innerHTML = defaultLvlTime;
        generateWord();
      }
    } else {
      finish.innerHTML = `Game Ended you Got ${scoreGot.innerHTML} Points`;
      if (scoreGot.innerHTML > 20) {
        finish.classList.add("good");
      } else {
        finish.classList.add("bad");
      }
    }
  }, 1000);
}
