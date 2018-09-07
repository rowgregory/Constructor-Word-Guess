const Word = require("./Word.js");
const inq = require("inquirer");
const chalk = require('chalk');
const figlet = require('figlet');
const isLetter = require('is-letter');
const boxen = require('boxen');
const colors = require('colors');


let playerName = "";

const log = console.log;


// This varaible is used to hold letters that the user has already guessed in the word bank.
let guessedLttrs = "";
let guessedLttrsArr = [];

let blanksFilledIn = 0;

let wins = 0;
let losses = 0;
let chancesRemaining = 10;


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


let userGuess = "";


figlet.text('Word Guess Game', {
  font: 'Lil Devil',
}, function (err, data) {

  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  log(data.white);

  log(colors.red.bold('Welcome to Gregs Word Guess'));
  log(chalk.yellow.bold('The theme is GREEK GOODS'));

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
    message: 'Are you ready to challenge the Gods?',
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

  let chancesRemaining = 10;
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
  log(`God to guess: `);
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
      // this finds out if the letter chosen was already guessed
      if (guessedLttrs.indexOf(guess.letter) > -1) {
        // this prompts the use to enter another letter if it has already been guessed
        log(figlet.textSync(`letter already guessed`, {
          font: 'Stick Letters',
        }));
        log(`~~++~~      ~~++~~      ~~++~~      ~~++~~      `);
        // fires guess letter prompt
        guessLttr();
      }
      //  this controls what happens if the user has pressed a letter that has not already been guessed
      else if (guessedLttrsArr.indexOf(guess.letter) === -1) {
        //adds a letter to the guessed letters
        guessedLttrs = guessedLttrs.concat(" " + guess.letter);
        guessedLttrsArr.push(guess.letter);
        // displays the already guessed leters
        log(boxen('Letters you have already guessed: ' + guessedLttrs, {
          padding: 1, margin: 1, borderStyle: 'round'
        }));

        // this determines whether or not the letter is in the word
        for (i = 0; i < otherGod.letters.length; i++) {

          // This section determines if the user guess equals one of the letters or characters in the name, as well as determines if the letters or characters in name equal lettersGuessed, if not lettersGuessed false and the user loses a guess.
          if (guess.letter.toUpperCase() === otherGod.letters[i].character && otherGod.letters[i].letterGuessed === false) {

            //sets letterGuessed for that specific letter equal to true
            otherGod.letters[i].letterGuessed === true;
            userGuessedCorrectly = true;
            otherGod.underscores[i] = guess.letter;
            blanksFilledIn++;
          }
        }

        log(`God to guess: `);
        log(boxen(otherGod.underscores.join(' '), {
          padding: 2,
        }));
        // otherGod.splitName();
        // otherGod.genLtrs();

        if (userGuessedCorrectly) {
          log(figlet.textSync(`Correct!`, {
            font: 'Dancing Font',
          }));
          checkIfUserWon();
        }
        else {
          log(figlet.textSync(`Incorrect`, {
            font: 'Poison',

          }));
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
    log(colors.rainbow(`Good Job! You sure know your greek gods!`));
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
    message: 'Would you like to try to guess another god?',
    default: true
  }];

  inq.prompt(readyToPlayAgain).then(answers => {

    if (answers.readyToPlay) {
      startGame();
    }
    else {
      log(colors.zebra(`I'm sorry you don't want to play again ${playerName}, come back soon!`));
    }
  })
}

