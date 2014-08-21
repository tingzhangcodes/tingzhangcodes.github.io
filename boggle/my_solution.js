// U3.W8-9: Challenge you're converting


// I worked on this challenge by myself.

// 2. Pseudocode
// class BoggleBoard
// takes two args board and possible_words
// sets board to board
// sets dictionary to possible_words
// sets last_move to empty array
// sets words to empty array 
// sets coords to empty array 

// function selectLetter
// adds coordinates of a letter to coords array if it passes checkLetter

// function checkLetter
// checks whether the move is valid, including whether the coord exists on board, whether it has 
// already been added to the coords array, and that it's touching the previously selected coord

// function move
// creates word from coords array by calling createWord
// resets coords array and last_move array to empty arrays

// function score
// add word.length - 2 for all words in words array
// return res 

// function createWord
// add each letter corresponding to coord in coords array to a string
// return string


// 3. Initial Solution
// function BoggleBoard(board, possible_words) {
// 	this.board = board;
// 	this.dictionary = possible_words; 
// 	this.last_move = [];
// 	this.words = [];
// 	this.coordinates = []; 
// }

// BoggleBoard.prototype.selectLetter = function(x,y) {
// 	if(this.checkLetter(x,y)) {
// 		this.coordinates.push([x,y]);
// 		this.last_move = [x,y];
// 	}
// }

// BoggleBoard.prototype.checkLetter = function(x,y) {
// 	var check = false;
// 	if(this.first_move()) {
// 		check = true;
// 	} else if (this.not_on_board(x,y) || this.already_picked(x,y) || this.not_touching(x,y)) {
// 		check = false;
// 		//DISPLAY SOME MESSAGE TO BROWSER WINDOW
// 	} else {
// 		check = true;
// 	}
// 	return check;
// }

// BoggleBoard.prototype.not_touching = function(x,y) {
// 	return (x > this.last_move[0] + 1 || x < this.last_move[0] - 1 || y > this.last_move[1] + 1 || y < this.last_move[1] - 1);
// }

// BoggleBoard.prototype.first_move = function() {
// 	return this.last_move.length == 0;
// }


// BoggleBoard.prototype.not_on_board = function(x,y) {
// 	return this.board[x] == undefined || this.board[x][y] == undefined;
// }

// BoggleBoard.prototype.already_picked = function(x,y) {
// 	var check = false;
// 	for (i = 0; i < this.coordinates.length; i++) {
// 		if(this.coordinates[i][0] == x && this.coordinates[i][1] == y) {
// 			check = true;
// 		}
// 	}
// 	return check;
// }

// BoggleBoard.prototype.createWord = function() {
// 	var answer = "";
// 	for (i = 0; i < this.coordinates.length; i++) {
// 		var x = this.coordinates[i][0];
// 		var y = this.coordinates[i][1];
// 		answer = answer.concat(this.board[x][y]);
// 	}
// 	return answer;
// }

// BoggleBoard.prototype.move = function() {
// 	this.words.push(this.createWord());
// 	this.coordinates = [];
// 	this.last_move = [];
// }

// BoggleBoard.prototype.score = function() {
// 	var score = 0; 
// 	for(i in this.words) {
// 		for(j in this.dictionary) {
// 			if(this.words[i] == this.dictionary[j]) {
// 				score = score + this.words[i].length - 2;
// 			}
// 		}
// 	}
// 	return score; 
// }


// 4. Refactored Solution
function BoggleBoard(board, possible_words) {
	this.board = board;
	this.dictionary = possible_words; 
	this.last_move = [];
	this.words = [];
	this.coordinates = []; 
}

BoggleBoard.prototype.selectLetter = function(x,y) {
	if(this.checkLetter(x,y)) {
		this.coordinates.push([x,y]);
		this.last_move = [x,y];
	}
}

BoggleBoard.prototype.checkLetter = function(x,y) {
	var check = false;
	if(this.first_move()) {
		check = true;
	} else if (this.not_on_board(x,y) || this.already_picked(x,y) || this.not_touching(x,y)) {
		check = false;
		//DISPLAY SOME MESSAGE TO BROWSER WINDOW
	} else {
		check = true;
	}
	return check;
}

BoggleBoard.prototype.not_touching = function(x,y) {
	return (x > this.last_move[0] + 1 || x < this.last_move[0] - 1 || y > this.last_move[1] + 1 || y < this.last_move[1] - 1);
}

BoggleBoard.prototype.first_move = function() {
	return this.last_move.length == 0;
}


BoggleBoard.prototype.not_on_board = function(x,y) {
	return this.board[x] == undefined || this.board[x][y] == undefined;
}

BoggleBoard.prototype.already_picked = function(x,y) {
	var check = false;
	for (i = 0; i < this.coordinates.length; i++) {
		if(this.coordinates[i][0] == x && this.coordinates[i][1] == y) {
			check = true;
		}
	}
	return check;
}

BoggleBoard.prototype.createWord = function() {
	var answer = "";
	for (i = 0; i < this.coordinates.length; i++) {
		var x = this.coordinates[i][0];
		var y = this.coordinates[i][1];
		answer = answer.concat(this.board[x][y]);
	}
	return answer;
}

BoggleBoard.prototype.move = function() {
	var word = this.createWord();
	if(this.wordCheck(word)){
		this.words.push(word);
	}
	this.coordinates = [];
	this.last_move = [];
}

BoggleBoard.prototype.wordCheck = function(word) {
	var check = true;
	if(word=="") {
		check=false;
	}
	for (i = 0; i < this.words.length; i++) {
		if(this.words[i] == word) {
			check = false;
		}
	}
	return check;
}

BoggleBoard.prototype.score = function() {
	var score = 0; 
	for(i in this.words) {
		for(j in this.dictionary) {
			if(this.words[i] == this.dictionary[j]) {
				score = score + this.words[i].length - 2;
			}
		}
	}
	return score; 
}
BoggleBoard.prototype.displayScore = function() {
	score = this.score();
	document.getElementById("score").innerHTML = "You scored: " + score;
}
BoggleBoard.prototype.displayWords = function() {
	this.move();
	document.getElementById("words").innerHTML = "Your words: " + this.words.join(", ");
	document.getElementById("letters").innerHTML = "Current letters: ";
}

BoggleBoard.prototype.displayLetters = function() {
	document.getElementById("letters").innerHTML = "Current letters: "+this.createWord();
}





// 1. DRIVER TESTS/ASSERT STATEMENTS GO BELOW THIS LINE
grid = [["b", "r", "a", "e"],
       ["i", "o", "d", "t"],
       ["e", "c", "l", "r"],
       ["t", "a", "k", "e"]];

possible_words = ["code","locate","trek","take","cake","boca","date","lake"];

//modified from http://stackoverflow.com/questions/15164655/generate-html-table-from-2d-javascript-array
function createTable(tableData) {
  var table = document.createElement('table')
    , tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);

  // not working:
  // var container = document.getElementById("board-container");
  // container.parentNode.insertBefore(table, container);
  // container.appendChild(table);
  document.body.appendChild(table);
}

board = new BoggleBoard(grid, possible_words);
createTable(grid)



// TERMINAL DRIVER TESTS
// board = new BoggleBoard(grid, possible_words);
// board.selectLetter(0,0);
// board.selectLetter(1,1);
// board.selectLetter(3,3); // => won't be added to word bc not_touching
// console.log(board.not_touching(3,3)==true);
// board.selectLetter(4,4); // => won't be added to word bc not_on_board
// console.log(board.not_on_board(4,4)==true);
// console.log(board.not_on_board(-1,-1)==true);
// board.selectLetter(2,1);
// board.selectLetter(2,1); // => won't be added to word bc already_picked
// console.log(board.already_picked(2,1)==true);
// board.selectLetter(3,1);
// console.log(board.createWord()=="boca");
// board.move();
// console.log(board.score()==2);






// 5. Reflection 