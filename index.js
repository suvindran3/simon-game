var wrongSound = new Audio('sounds/wrong.mp3');
var gameOn = false;
var currentState = 0;
var colors = ['red', 'green', 'blue', 'yellow'];
var gameState = [];


if(screen.height > screen.width){
  $('body').css('padding-top', '35vw');
}

function wrong() {
  gameOn = false;
  currentState = 0;
  gameState = [];
  $('body').css('background-color', 'red');
  wrongSound.play();
  setTimeout(function() {
    $('body').css('background-color', '#011F3F');
  }, 200);
  $('h1').text('Game Over, Press a Key to Restart');
}

function nextState() {

      gameState.push(colors[Math.floor(Math.random() * 4)]);
      gameOn = true;
      setTimeout(function(){
          buttonClick(gameState[gameState.length - 1]);
      }, 500);
      $('h1').text('level ' + gameState.length );
  
}

function buttonClick(button) {
  $('.' + button).css('background-color', 'grey');
  var audio = new Audio('sounds/' + button + '.mp3');
  audio.play();
  setTimeout(function() {
    $('.' + button).css('background-color', button);
  }, 200);
}


$('button').click(function(event) {
  if (gameOn) {
    buttonClick(event.target.className);
    if (gameState[currentState] == event.target.className) {
      if (currentState == gameState.length-1) {
        nextState();
        currentState = 0;
      } else {
        currentState++;
      }
    } else {
      wrong();
    }
  }
});

$('body').keypress(nextState);
$('body').click(function(){
  if (gameState.length == 0){
    nextState();
  }
});