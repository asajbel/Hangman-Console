module.exports = {
  Letter: function(letter) {
    this.letter = letter;
    this.hidden = true;

    if (!(/^[a-zA-Z]/.test(letter))) {
    	this.hidden = false;
    }
  },
}