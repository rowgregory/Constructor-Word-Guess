//let input = process.argv[2];

let Letter = function (letter) {
  this.letter = letter,
    this.letterGuessed = false,
    this.getChar = function () {
      if (!this.letterGuessed) {
        return "_";
      } else {
        return this.letter;
      }
    };
  this.charCheck = function (guess) {
    if (guess === this.letter) {
      this.letterGuessed = true;
    }
  };
};

//let letterTest = new Letter(input);
//console.log(letterTest.getChar())

module.exports = Letter;

