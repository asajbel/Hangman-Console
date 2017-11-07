var randomWord = require("random-word");
var inquirer = require("inquirer");

function Word(word) {
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
}

function Letter(letter) {
  this.letter = letter;
  this.hidden = true;
}

function play() {
  var random = new Word(randomWord());
  var tries = 10;
  var guessed = [];
  random.print();

  function guess() {
    var askGuess = [{
      name: "guess",
      message: "Guess a letter!",
      type: "text"
    }];

    inquirer.prompt(askGuess).then(function(response) {
      var letter = response.guess[0].toLowerCase();
      if (guessed.indexOf(letter) === -1) {
        guessed.push(letter);
        if (random.match(letter)) {
          console.log("\nCorrect!!!");
        } else {
          tries--;
          console.log("\nWrong!!! Tries remaining: " + tries);
        }
      } else {
      	console.log("\nAlready Guessed");
      }
      random.print();
      if (tries > 0 && !random.revealed) {
        guess();
      } else {
        console.log("GAME OVER");
        console.log("\nCorrect answer: " + random.correct + "\n");
        restart();
      }

    });

  }
  guess();
}
play();

function restart() {
  var again = [{
    name: "newgame",
    message: "Play Again? ",
    type: "confirm",
    default: false
  }];
  inquirer.prompt(again).then(function(response) {
    if (response.newgame) {
      play();
    } else {
      console.log("\nGoodBye");
    }
  })
}