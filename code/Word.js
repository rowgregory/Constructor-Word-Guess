const Letter = require("./Letter.js");

let Word = function(word) {
    this.word = word,
    this.letters = []

    this.rtnStrg = function() {
        let wordArr = this.word.split('');

        for (var i=0; i < wordArr.length; i++) {
            let newlttr = new Letter (wordArr[i]);
            this.letters.push(newlttr);
        }
    }
    this.makeGuess = function(guess) {
        this.letters.forEach(letter => {
            letter.charCheck(guess);
        });
    }
}

module.exports = Word;