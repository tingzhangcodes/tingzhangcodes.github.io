function Deer($world) {
  this.$world = $world;
  this.$html = $("<div class='deer'></div>");
  this.$world.append(this.$html);
  this.width = this.$html.width();
  this.height = this.$html.height();
  this.x = Math.floor( Math.random() * ($world.width() - this.$html.width() ) );
  this.y = Math.floor( Math.random() * ($world.height() - this.$html.height() ) );
  this.updatePosition();
  this.dir = this.setDirection();
  this.speed = 8;
  this.roundsSinceLastMeal = 0;
}

Deer.eat = function() {
  this.roundsSinceLastMeal = 0;
}

Deer.prototype.starved = function() {
  return this.roundsSinceLastMeal >= 100; // where round is 50 milliseconds
}

Deer.prototype.setDirection = function() {
  return Math.floor( Math.random() * 360 + 1 );
}

Deer.prototype.move = function() {
  var oldX = this.x;
  var oldY = this.y;
  // convert degrees to radians
  var xSpeed = Math.cos( (this.dir / 180) * Math.PI ) * this.speed;
  var ySpeed = Math.sin( (this.dir / 180) * Math.PI ) * this.speed;
  this.x += xSpeed;
  this.y += ySpeed;

  if (this.inBounds()) {
    this.updatePosition();
    // change direction slightly for natural movement
    this.dir += (Math.random() * 20 - 10);
  } else {
    this.x = oldX;
    this.y = oldY;
    if (this.dir > 180 ) {
      this.dir -= 180;
    } else {
      this.dir += 180;
    }
  }
}

Deer.prototype.inBounds = function() {
  return (this.x > 0 &&
          this.x < (this.$world.width() - this.$html.width()) &&
          this.y > 0 &&
          this.y < (this.$world.height() - this.$html.height())
         )
}
