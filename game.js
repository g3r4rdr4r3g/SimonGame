var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var currentLevel = 0;
var started = true;

$(document).keypress(function (){
  if(started){
  nextSequence();
  started = false;
  }
});


$(".btn").click(function (){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(currentLevel);
  currentLevel++;
  if(currentLevel===level){
    setTimeout(function (){
      nextSequence();
    },1000);
  }

});

function nextSequence(){
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  $("#"+randomChosenColour).fadeOut().fadeIn();
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  level++;
  userClickedPattern = [];
  currentLevel = 0;
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    console.log("success");

  else{
    console.log("error");
    $("body").addClass("game-over");
    $("h1").text("Game Over!!! Press a Key to Restart");
    setTimeout(function (){
      $("body").removeClass("game-over");
    });
    playSound("error");
    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern=[];
  started = true;

}

function playSound(colour){
  switch (colour) {
    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;
    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;
    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;
    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;
    case "error":
      var error = new Audio("sounds/wrong.mp3");
      error.play();
      break;

  }
}

function animatePress(colour){
  $("#"+colour).addClass("pressed");
  setTimeout(function (){
    $("#"+colour).removeClass("pressed");
  },100);
}
