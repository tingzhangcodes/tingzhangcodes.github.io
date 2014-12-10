function Game(deerNum, treeNum) {
  this.$world = $('#world');
  this.deer = this.createBeings(Deer, deerNum);
  this.trees = this.createBeings(Tree, treeNum);
  this.interval = setInterval(this.process.bind(this), 50);
  this.startTime = new Date();
}

Game.prototype.process = function() {
  this.playRound();

  if (this.checkGameover()) {
    clearInterval(this.interval);
    alert("Game over! You scored " + this.getScore() + ".");
    $('#game_info')[0].reset();
  }
}

Game.prototype.getScore = function() {
  return Math.round((new Date() - this.startTime) / 10)
}

Game.prototype.checkGameover = function() {
  return this.trees.length == 0 && this.deer.length == 0;
}

Game.prototype.removeTree = function(tree) {
  var trees = this.trees;
  tree.$html.css('display','none');
  treeIndex = trees.indexOf(tree);
  trees.splice(treeIndex, 1);
}

Game.prototype.removeDeer = function(deer) {
  var allDeer = this.deer;
  deer.$html.css('display','none');
  deerIndex = allDeer.indexOf(deer);
  allDeer.splice(deerIndex, 1);
}

Game.prototype.checkCollision = function(obj1, obj2) {
  var obj1Center = [(obj1.width - obj1.x) + ((obj1.width - obj1.x) / 2), (obj1.height - obj1.y) + ((obj1.height - obj1.y) / 2)];
  var obj2Center = [(obj2.width - obj2.x) + ((obj2.width - obj2.x)/ 2), (obj2.height - obj2.y) + ((obj2.height - obj2.y) / 2) ];
  return (  Math.abs(obj1Center[0] - obj2Center[0]) <= obj1.width / 2 + obj2.width / 2 &&
            Math.abs(obj1Center[1] - obj2Center[1]) <= obj1.height / 2 + obj2.height / 2
         )
}

Game.prototype.playRound = function() {
  var trees = this.trees;
  var game = this;
  this.deer.forEach(function(deer) {
    deer.move();
    deer.roundsSinceLastMeal += 1;
    trees.forEach(function(tree) {
      var collision = game.checkCollision(tree, deer);
      if (collision == true) {
        game.removeTree(tree);
        deer.eat();
      }
    })
    if (deer.starved() == true && trees.length == 0) {
      game.removeDeer(deer);
    }
  })
}

Game.prototype.createBeings = function(beingClass, beingNum, divName) {
  var beings = []
  for(var i = 0; i < beingNum; i++) {
      beings.push(new beingClass(this.$world, divName));
  }
  return beings;
}
