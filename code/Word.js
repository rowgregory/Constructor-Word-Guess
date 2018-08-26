const Letter = require("./Letter.js");

let Word = function (word) {

  this.constructWord = function (word) {
    var temp = [];
    for (var i = 0; i < word.length; i++) {
      var currentChar = word[i];
      var currentLetter = new Letter(currentChar);
      temp.push(currentLetter);
    }
    return temp;
  }

  this.word = this.constructWord(word);

  this.display = function () {
    var displayWord = "";
    for (var i = 0; i < this.word.length; i++) {
      var currentLetter = this.word[i];
      displayWord += currentLetter.display() + " ";
    }
    //console.log(displayWord);
  }
  this.checkLetter = function (ltr) {

    for (var i = 0; i < this.word.length; i++) {
      var currentLetter = this.word[i];
      //console.log(currentLetter);
      currentLetter.checkGuess(ltr);
    }
    return this.display;
  }

}

module.exports = Word;
