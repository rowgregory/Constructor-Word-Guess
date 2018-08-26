const Word = require("./Word.js");
const inq = require("inquirer");
const chalk = require('chalk');

let input = process.argv[2];


const wordBank = [
  "zeus",
  "poseidon",
  "athena",
  "appollo",
  "artemis",
  "aphrodite",
  "hermes",
  "dionysus",
  "hades",
  "hypnos",
  "nemesis"
];


let userGuesses = 10;
let gameOver = false;

const user_prompt = () => {
  inq.prompt([
    {
      name: 'letter',
      type: 'confirm',
      message: 'Welcome to Word Guess Game'
    }
  ]).then((data) => {
    console.log(data);
    if (data.letter) get_word();
  });
}
user_prompt();

const letter_guess = (letter) => {
  let log = console.log;
  let guessedLetters = new Set();

  if (guessedLetters === 1) {
    if (guessedLetters.has(letter)) {
      log('Already used!');
    } else {
      guessedLetters.add(letter);
    }
  }
  if (userGuesses === 0) {
    log('\n')
  }
}

function get_word(letter) {
  let randIndx = Math.floor(Math.random() * wordBank.length);
  let randWord = wordBank[randIndx];
  let words = new Word(randWord);
  // console.log(words);
  // console.log(randWord);
  return randWord
}

// ======================================================================

// let letArr = "abcdefghijklmnopqrstuvwxyz"

// let randIndx = Math.floor(Math.random() * wordBank.length);
// let randWord = wordBank[randIndx];

// function startGame() {

//   var word = new Word("Warriors");
//   word.display();
//   userGuess(word);
// }

// function userGuess(word) {
//   inquirer.prompt([
//     {
//       name: "letter",
//       message: "Guess a letter: ",
//       type: "input",
//     }
//   ]).then(function (guess) {
//     console.log(guess.letter);
//     word.checkLetter(guess.letter);
//     word.display();
//     userGuess(word);


//   })
// }
// startGame();

// =============================================================================



// let guesses;              // amount of guesses per game
// let pickedWords;          // 
// let word;
// let pickedWord;

// function weInThis() {
//   console.log(chalk.magenta.bgWhiteBright.bold(`+_+-+_+-+_+-+Welcome to Word Guess Game+-+_+-+_+-+_+`));
//   console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
//   pickedWords = [];
//   playGame();
// }

// function playGame() {
//   pickedWord = "";
//   guesses = 15;
//   if (pickedWords.length < wordBank.length) {
//     pickedWord = getWord();
//   } else {
//     console.log(`You sure do know your Greek Gods!`);
//     continuePrompt();
//   }
// }

// function getWord() {
//   let rand = Math.floor(Math.random() + wordBank.length);
//   let randomWord = wordBank[rand];
//   console.log(`This should be the random word: ${randomWord}`);
//   if (pickedWords.indexOf(randomWord) === -1) {
//     pickedWords.push(randomWord);
//     return randomWord;
//   } else {
//     return getWord();
//   }
// }
// getWord();

// function continuePrompt() {
//   inquirer
//     .prompt([
//       {
//         name: "continue",
//         tyoe: "list",
//         message: "Would you like to play again?",
//         choices: ["Yes", "No"]
//       }
//     ])
//     .then(data => {
//       if (data.continue === "Yes") {
//         weInThis();
//       } else {
//         console.log(`Thanks for playing!`);
//       }
//     });
// }

// weInThis();
