function Letter(letter) {
    this.letter = letter,
    this.letterGuessed = false,
    this.getChar = function() {
        if (!this.letterGuessed) {
            return "_";   
        } else {
            return this.letter;
        }
        
    }
    this.charCheck = function(x) {
        if (x === this.letter) {
        this.letterGuessed = true;
        
        }
        
    }
}
Letter();
console.log(`Did we get here?`);
module.exports = Letter;
