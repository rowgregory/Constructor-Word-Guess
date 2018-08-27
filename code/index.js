const Word = require("./Word.js");
const inq = require("inquirer");
const chalk = require('chalk');
const figlet = require('figlet');
const isLetter = require('is-letter');
const boxen = require('boxen');
const logSymbols = require('log-symbols');
const colors = require('colors');


let playerName = "";

const log = console.log;


// This varaible is used to hold letters that the user has already guessed in the word bank.
let guessedLttrs = "";
let guessedLttrsArr = [];

let blanksFilledIn = 0;

let wins = 0;
let losses = 0;
let chancesRemaining = 4;


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
    playerName = answers.playerName;
    if (answers.readyToPlay) {
      log(chalk.green.bold(`Great Job entering your information! Welcome to the start of the game, ${answers.playerName}`));
      startGame();
    } else {
      log(colors.zebra(`I'm sorry you don't want to play right now ${answers.playerName}, come back soon!`));
    }

  })

}

const startGame = () => {

  let chancesRemaining = 4;
  guessedLttrs = "";
  guessedLttrsArr = [];
  chooseRandGod();

}

const chooseRandGod = () => {
  const randGod = wordBank[Math.floor(Math.random() * wordBank.length)].toUpperCase();
  //log(randGod);

  // This variable sets the random God chosen from the wordBank to an otherGod
  otherGod = new Word(randGod);
  //log(otherGod);

  log(`The name you are guessing contains ${randGod.length} letters!`);
  log(`Name to guess: `);
  //log(otherGod);
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
      guess.letter;
      // log(`You have guessed: ${guess.letter.toUpperCase()}`)
      userGuessedCorrectly = false;

      if (guessedLttrs.indexOf(guess.letter) > -1) {
        log(`SORRY, you have already guessed that letter!`);
        log(`~~++~~      ~~++~~      ~~++~~      ~~++~~      `)
        guessLttr();
      }

      else if (guessedLttrsArr.indexOf(guess.letter) === -1) {
        guessedLttrs = guessedLttrs.concat(" " + guess.letter);
        guessedLttrsArr.push(guess.letter);

        log(boxen('Letters you have already guessed: ' + guessedLttrs, {
          padding: 1, margin: 1, borderStyle: 'round'
        }));


        for (i = 0; i < otherGod.letters.length; i++) {

          //log(otherGod.letters[i].character);

          // This section determines if the user guess equals one of the letters or characters in the name, as well as determines if the letters or characters in name equal lettersGuessedCorrectly, if not lettersGuessedCorrectly false and the user loses a guess.
          if (guess.letter.toUpperCase() === otherGod.letters[i].character && otherGod.letters[i].letterGuessed === false) {
            otherGod.letters[i].letterGuessed === true;
            userGuessedCorrectly = true;
            otherGod.underscores[i] = guess.letter;
            blanksFilledIn++;
          }
        }

        log(`Name to guess: `);
        log(otherGod.underscores.join(' '));
        // otherGod.splitName();
        // otherGod.genLtrs();

        if (userGuessedCorrectly) {
          log(`Correct!`);
          checkIfUserWon();
        }
        else {
          log(chalk.cyan.bold(logSymbols.error, `Incorrect`));
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
    log(chalk.magenta.bold(`Sorry, better luck next time!`));
    log(`The correct god was ${chalk.red.bold(otherGod.word.toUpperCase())}`);
    losses++;
    log(`Wins: ${wins}`);
    log(`Losses: ${losses}`);
    playAgain();
  }
  else if (blanksFilledIn === otherGod.letters.length) {
    log(`You Won!`);
    wins++;
    playAgain();
  }
  else {
    guessLttr("");
  }
}

const playAgain = () => {
  var readyToPlayAgain = [{

    type: 'confirm',
    name: 'readyToPlay',
    message: 'Are you ready to play Gregs Word Guess Game again?',
    default: true
  }
  ];

  inq.prompt(readyToPlayAgain).then(answers => {

    if (answers.readyToPlay) {
      startGame();

    }
    else {
      log(colors.zebra(`I'm sorry you don't want to play again ${answers.playerName}, come back soon!`));
    }
  })
}

