let Letter = function (character) {
  this.character = character.toUpperCase(),
    this.letterGuessed = false,
    this.getChar = function () {
      if (this.letterGuessed) {
        console.log(this.character);
      } else {

      }
    };
  // this.charCheck = function (guess) {
  //   if (guess === this.letter) {
  //     this.letterGuessed = true;
  //   }
  // };
};

module.exports = Letter;

