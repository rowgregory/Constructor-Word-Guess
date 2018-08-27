let Letter = function (character) {
  this.character = character.toUpperCase(),
    //console.log(this.character);
    this.letterGuessed = false,
    this.getChar = function () {
      if (this.letterGuessed) {
        console.log(this.character);
      }
    };
};

module.exports = Letter;

