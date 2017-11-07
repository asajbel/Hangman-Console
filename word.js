var Letter = require("./letter.js").Letter;

module.exports = {
  Word: function(word) {
    this.correct = word;
    this.word = [];
    this.revealed = false;
    for (i = 0; i < word.length; i++) {
      this.word.push(new Letter(word[i]));
    }

    this.match = function(letter) {
      var matched = false;
      for (var i = 0; i < this.word.length; i++) {
        if (letter[0].toLowerCase() === this.word[i].letter.toLowerCase()) {
          this.word[i].hidden = false;
          matched = true;
        }
      }
      return matched;
    };

    this.print = function() {
      var dashes = '';
      var allRevealed = 0;
      for (var i = 0; i < this.word.length; i++) {
        if (this.word[i].hidden) {
          dashes += "_ ";
        } else {
          dashes += this.word[i].letter + " ";
          allRevealed++;
        }
      }
      console.log("\n" + dashes + "\n");
      if (allRevealed >= this.word.length) {
        this.revealed = true;
      }
    };
  },
}