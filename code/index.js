const Word = require("./Word.js");
const inq = require("inquirer");
const chalk = require('chalk');
var figlet = require('figlet');
var isLetter = require('is-letter');
const boxen = require('boxen');
const logSymbols = require('log-symbols');
const colors = require('colors');




const log = console.log;


// This varaible is used to hold letters that the user has already guessed in the word bank.
var guessedLttrs = "";
var guessedLttrsArr = [];

var blanksFilledIn = 0;

var wins = 0;
var losses = 0;
var chancesRemaining = 4;


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

let counter = 0;
let userGuess = "";
let gameOver = false;

figlet('Word Guess Game', function (err, data) {

  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  log(data.rainbow);
  // log(cliSpinners.smiley);
  log(chalk.green.bold('Welcome to Gregs Hangman'));
  log(boxen('The theme is Greek Gods'));

  confStart();

});

const confStart = () => {
  var readyToStartGame = [{
    type: 'text',
    name: 'playerName',
    message: 'Hi :) What Is Your Name?'
  },
  {
    type: 'confirm',
    name: 'readyToPlay',
    message: 'Are you ready to play Gregs Word Guess Game?',
    default: true
  }
  ];

  inq.prompt(readyToStartGame).then(answers => {

    if (answers.readyToPlay) {
      log(chalk.green.bold(`Great Job entering your information! Welcome to the start of the game, ${answers.playerName}`));
      startGame();
    } else {
      log(`I'm sorry you don't want to play right now ${answers.playerName}, come back soon!`);
    }

  })

}

const startGame = () => {

  userGuesses = 10;
  guessedLttrs = "";
  guessedLttrsArr = [];
  chooseRandGod();

}

const chooseRandGod = () => {
  const randGod = wordBank[Math.floor(Math.random() * wordBank.length)].toUpperCase();

  // This variable sets the random God chosen from the wordBank to an otherGod
  otherGod = new Word(randGod);

  log(`The name you are guessing contains ${randGod.length} letters!`);
  log(`Name to guess: `);

  otherGod.splitName();
  otherGod.genLtrs();
  guessLttr();
}

const guessLttr = () => {
  if (blanksFilledIn < otherGod.letters.length || chancesRemaining > 0) {
    inq.prompt([
      {
        name: 'letter',
        message: 'Guess a letter',

        // this section checks if the value is a letter
        // npm isLetter
        validate: function (value) {
          if (isLetter(value)) {
            return true;
          } else {
            return false;
          }
        }
      }
    ]).then(function (guess) {
      guess.letter.toUpperCase();
      // log(`You have guessed: ${guess.letter.toUpperCase()}`)
      userGuessedCorrectly = false;

      if (guessedLttrs.indexOf(guess.letter.toUpperCase()) > -1) {
        log(`SORRY, you have already guessed that letter!`);
        log(`~~++~~      ~~++~~      ~~++~~      ~~++~~      `)
        guessLttr();
      }

      else if (guessedLttrsArr.indexOf(guess.letter.toUpperCase()) === -1) {
        guessedLttrs = guessedLttrs.concat(" " + guess.letter.toUpperCase());
        guessedLttrsArr.push(guess.letter.toUpperCase());

        log(boxen('Letters you have already guessed: ' + guessedLttrs, {
          padding: 1, margin: 1, borderStyle: 'round'
        }));

        for (i = 0; i < otherGod.letters.length; i++) {

          // This section determines if the user guess equals one of the letters or characters in the name, as well as determines if the letters or characters in name equal lettersGuessedCorrectly, if not lettersGuessedCorrectly false and the user loses a guess.
          if (guess.letter.toUpperCase() === otherGod.letters[i].character && otherGod.letters[i].letterGuessedCorrectly === false) {

            // This variable section sets letterGuessedCorrectly for that specific letter equal to true.
            otherGod.letters[i].letterGuessedCorrectly === true;


            userGuessedCorrectly = true;
            otherGod.underscores[i] = guess.letter.toUpperCase();




            blanksFilledIn++;

          }
        }

        log(`Name to guess: `);
        otherGod.splitName();
        otherGod.genLtrs();

        if (userGuessedCorrectly) {
          log(`Correct!`);
          checkIfUserWon();
        }
        else {
          log(logSymbols.error, `Incorrect`);
          log(`<^> | <^>`);
          chancesRemaining--;
          log(`You still have ${chancesRemaining} guesses left`);
          checkIfUserWon();
        }
      }
    });
  }
}
const checkIfUserWon = () => {
  if (chancesRemaining === 0) {
    log(`Sorry, better luck next time!`);
    log(`The correct god was ${otherGod.length}`);
    losses++;
    log(`Wins: ${wins}`);
    log(`Losses: ${losses}`);
  }
  else if (blanksFilledIn === otherGod.letters.length) {
    log(`You Won!`);
    wins++;
  }
  else {
    guessLttr("");
  }
}
