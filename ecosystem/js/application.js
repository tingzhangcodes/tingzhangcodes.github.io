$(function() {
  $('#game_info > input[type=button]').click(function(event) {
    deer = $('#deer').val();
    trees = $('#tree').val();
    if (deer > 100 || trees > 100) {
      $('#game_info')[0].reset();
      alert("Too many deer or trees! Try a number less than 100.");
    } else {
      game = new Game(deer, trees);
    }
  })
});

