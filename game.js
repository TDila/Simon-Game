let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let started = false;
let level = 0;

function nextSequence() {
    userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $('#'+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100,function(){
    playSound(randomChosenColour);
  });

  level++;
  $('#level-title').text('Level '+level);
}

$('.btn').on('click',function(evt){
    let userChosenColour = evt.target.id;
    // let userChosenColour = $(evt.target).attr('id');
    // let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
    let audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $('#'+currentColour).addClass('pressed');
    setTimeout(function(){
        $('#'+currentColour).removeClass('pressed');
    },100);
}

$(document).keydown(function(){
    if(!started){
        $('#level-title').text('Level '+level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        wrongAnswer();
    }
}

function wrongAnswer(){
    playSound('wrong');
    $('body').addClass('game-over');
    $('#level-title').text('Game Over, Press Any Key to Restart');
    setTimeout(function(){
        $('body').removeClass('game-over');
    },200);
    startOver();
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

