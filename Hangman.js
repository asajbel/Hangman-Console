var randomWord = require("random-word");
var inquirer = require("inquirer");
var Word = require("./word.js").Word;

function play() {
  var random = new Word(randomWord());
  var tries = 10;
  var guessed = [];
  random.print();

  function guess() {
    var askGuess = [{
      name: "guess",
      message: "Guess a letter!",
      type: "text",
      validate: function (value) {
      	if (typeof value === "string" && value.length === 1 && /^[a-zA-Z]/.test(value)){
      		return true;
      	} else {
      		return "Enter a letter";
      	}
      }
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

    }).error;

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