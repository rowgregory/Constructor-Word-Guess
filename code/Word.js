const Letter = require("./Letter.js");
const log = console.log;
const chalk = require('chalk');
const boxen = require('boxen');
let Word = function (word) {

  this.word = word;
  this.letters = [];
  this.underscores = [];
  this.splitName = function () {
    this.letters = this.word.split('');
    //log(this.letters);
    numberOfUnderscores = this.letters.length;
    for (i = 0; i < numberOfUnderscores; i++) {
      this.underscores.push('_');
    }
    log(boxen(this.underscores.join(' '), {
      padding: 2,
    }));
  };
  this.genLtrs = function () {
    for (i = 0; i < this.letters.length; i++) {
      this.letters[i] = new Letter(this.letters[i]);
      this.letters[i].getChar();
    }
  }
};


module.exports = Word;
