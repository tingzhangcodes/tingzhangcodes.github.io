function Tree($world) {
  this.$world = $world;
  this.$html = $("<div class='tree'></div>");
  this.$world.append(this.$html);
  this.width = this.$html.width();
  this.height = this.$html.height();
  this.x = Math.floor( Math.random() * ($world.width() - this.$html.width() ) );
  this.y = Math.floor( Math.random() * ($world.height() - this.$html.height() ) );
  this.updatePosition();
}

Tree.prototype.updatePosition = function() {
  this.$html.css('left', this.x);
  this.$html.css('top', this.y);
}

Deer.prototype.updatePosition = Tree.prototype.updatePosition;
