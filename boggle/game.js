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
	document.getElementById("score").innerHTML = "Current score: " + score;
}
BoggleBoard.prototype.displayWords = function() {
	this.move();
	document.getElementById("words").innerHTML = "Your words: " + this.words.join(", ");
	document.getElementById("letters").innerHTML = "Current letters: ";
}

BoggleBoard.prototype.displayLetters = function() {
	document.getElementById("letters").innerHTML = "Current letters: "+this.createWord();
}

