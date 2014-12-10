$(function() {

	var grid = [["a", "i", "i", "o"],
			       ["d", "y", "e", "g"],
			       ["n", "r", "t", "t"],
			       ["a", "n", "e", "t"]];
	// possible_words from http://www.wordplays.com/boggle
	var possible_words = ["dieter", "entera", "gerent", "getter", "nereid", "netter", "tenter", "tetter", "antre", "arete", "enter", "entry", "nerdy", "netty","randy","rente","teiid","tenty","tenty","terne","tetra","ante","arty","diet","dreg","dyer","erne","etna","eyra","eyre","goer","nard","nary","nerd","nett","rand","rant","rent","rete","rynd","tent","tern","tret","trey","tyer","tyre","yett","aid","and","ane","ant","any","are","art","aye","day","die","dry","dye","ego","era","ere","ern","get","gey","gie","nan","net","ran","reg","rei","ret","rya","rye","teg","ten","tet","try","tye","yet","yid"];

	function createTable(tableData) {
	  var table = document.createElement('table');
	  var tableBody = document.createElement('tbody');
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

	  $('#board').append(table);
	}

	var board = new BoggleBoard(grid, possible_words);
	createTable(grid);
	$('td').click(function(){
			  var col = $(this).parent().children().index($(this));
			  var row = $(this).parent().parent().children().index($(this).parent());
			  board.selectLetter(row,col);
			  board.displayLetters();
	});

	$('#move-btn').click(function(){
			 board.displayWords();
	});

	$('#score-btn').click(function(){
			 board.displayScore();
	});

});