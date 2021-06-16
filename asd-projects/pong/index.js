/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
      //starts game when space bar is clicked (to ensure players are ready)
      "SPACE" : 32,
      //player 1 keys
      "W-UP" : 87, 
      "S-DOWN" : 83,
      //player 2 keys
      "UP" : 38,
      "DOWN" : 40
  }
  
  //variables to keep ball from leaving board
  var boardWidth = $("#board").width();
  var boardHeight = $("#board").height();

  // Game Item Objects

  //players' paddles
  var leftPaddle = gameObject("#leftPaddle");
  var rightPaddle = gameObject("#rightPaddle");
  var leftPaddleHeight = $("#leftPaddle").height();
  var rightPaddleHeight = $("#rightPaddle").height();
  
  //pong ball
  var ball = gameObject("#ball");
  var ballStartingX = 707; 
  var ballStartingY = 340;

  //player scores
  var leftPlayerScore = gameObject("#leftPlayerScore");
  var rightPlayerScore = gameObject("#rightPlayerScore");
  var leftPaddleScore = 0;
  var rightPaddleScore = 0;
  $("#leftPlayerScore").text(leftPaddleScore);
  $("#rightPlayerScore").text(rightPaddleScore);

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    //updates left paddle position
    repositionLeftPaddle();
    redrawLeftPaddle();

    //updates right paddle position
    repositionRightPaddle();
    redrawRightPaddle();

    //updates ball position
    repositionBall();
    redrawBall();

    //stops and resets ball to original position, helps tally points
    ballStop();

    //prevents paddles from leaving board
    if (leftPaddle.y >= boardHeight - leftPaddleHeight){
        leftPaddle.speedY = -leftPaddle.speedY;
     } else  if (leftPaddle.y <= 0){
        leftPaddle.speedY = -leftPaddle.speedY;
  }
    
    if (rightPaddle.y >= boardHeight - rightPaddleHeight){
        rightPaddle.speedY = -rightPaddle.speedY;
     } else  if (rightPaddle.y <= 0){
        rightPaddle.speedY = -rightPaddle.speedY;
  }
    // uses collision function to bounce ball off of paddles
    if (doCollide(leftPaddle, ball)){
         ball.speedX = -ball.speedX;
    }
     if (doCollide(rightPaddle, ball)){
         ball.speedX = -ball.speedX;
     }

     // ends the game when either player has 11 points
    if (leftPaddleScore >= 11 || rightPaddleScore >= 11){
        endGame();
    }
  }

  /* 
  Called in response to keydown events.
  */
  
  function handleKeyDown(event){
    //starts game when the space bar is pressed to ensure both players are ready
      if (event.which === KEY.SPACE){
        randomStart(); 
        $("#alert").remove();
      }

      //handles key-down events for left player, allows left paddle to move
      if (event.which === KEY["S-DOWN"]){
          leftPaddle.speedY = 5;
      } else if (event.which === KEY["W-UP"]){
          leftPaddle.speedY = -5;
      }

      //handles key-down events for right player, allows right paddle to move
      if (event.which === KEY.DOWN){
          rightPaddle.speedY = 5;
      } else if (event.which === KEY.UP){
          rightPaddle.speedY = -5;
      }
  }

  /*
  Called in response to keyup events.
  */
  function handleKeyUp(event){
      //handes keyup events for left player, stops paddle movement when keys are not pressed
      if (event.which === KEY["S-DOWN"]){
          leftPaddle.speedY = 0;
      } else if (event.which === KEY["W-UP"]){
          leftPaddle.speedY = 0;
      }
      //handles keyup events for right player, stops paddle movement when keys are not pressed
      if (event.which === KEY.DOWN){
          rightPaddle.speedY = 0;
      } else if (event.which === KEY.UP){
          rightPaddle.speedY = 0;
      }
  }



  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  //factory function for our game objects to avoid repetition 
  function gameObject($id){
    var Object = {};
  
    Object.id = $id;
    Object.x = Number($($id).css('left').replace(/[^-\d\.]/g, ''));
    Object.y = Number($($id).css('top').replace(/[^-\d\.]/g, ''));
    Object.width = $($id).width();
    Object.height = $($id).height();
    Object.speedX = 0;
    Object.speedY = 0;

    return Object;
} 

//helper functions for updating left player's paddle
function repositionLeftPaddle(){
    leftPaddle.y += leftPaddle.speedY;
}

function redrawLeftPaddle(){
    $("#leftPaddle").css("top", leftPaddle.y);
}

//helper functions for updating right player's paddle
function repositionRightPaddle(){
    rightPaddle.y += rightPaddle.speedY;
}

function redrawRightPaddle(){
    $("#rightPaddle").css("top", rightPaddle.y);
}


//helper functions to help randomize the ball's starting process

// helper function to use later in randomStart(); ensures that probability is equal and start is randomized
function randomNumber(number) {	
    var num = Math.ceil(Math.random() * number);
    return num;
}	

function randomStart(){
    // determines ball's horizontal direction
    var startX = randomNumber(2); // picking a random number b/w 1 or 2 so probability is equal
    if (startX % 2 === 0){ // if randomNumber is 2, ball goes to left first
        ball.speedX = -10;
    }
    else if (startX % 2 === 1){ //if randomNumber is 1, ball goes to right first
        ball.speedX = 10;
    }

    // determines the ball's vertical direction
    var startY = randomNumber(2);
    if (startY % 2 === 0){
        ball.speedY = -10; //if randomNumber is 2, ball goes up first
    } else if (startY % 2 === 1){
        ball.speedY = 10; //if randomNumber is 1, ball goes down first
    }
}

//helper functions for updating ball's position
function repositionBall(){
    ball.y += ball.speedY;
    ball.x += ball.speedX;
}

function redrawBall(){
    $("#ball").css("top", ball.y);
    $("#ball").css("left", ball.x);
}

//helper function for stopping the ball, resetting its position, and tallying points

function ballStop(){
    // handles collisions for top and bottom walls, causes ball to bounce back
    if (ball.y >= boardHeight){
        ball.speedY = -ball.speedY;
    } else if (ball.y <= 0){
        ball.speedY = -ball.speedY;
    } 
    // handles collisions for left wall
    else if (ball.x <= 0){ 
        ball.speedY = 0; // stops ball movement
        ball.speedX = 0;
        ball.y = ballStartingY; // resets ball to starting position
        ball.x = ballStartingX;
        rightPaddleScore++; // increases and tallies right player's score
        $("#rightPlayerScore").text(rightPaddleScore);
    } 
    // handles collisions for right wall
    else if (ball.x >= boardWidth){ 
        ball.speedY = 0; // stops ball movement
        ball.speedX = 0;
        ball.y = ballStartingY; //resets ball to starting position
        ball.x = ballStartingX;
        leftPaddleScore++; // increases and tallies left player's score
        $("#leftPlayerScore").text(leftPaddleScore);
    }
}

function doCollide(paddle, ball) { // helps register ball-paddle collisions
    //sides of paddles
    paddle.leftX = paddle.x;
    paddle.topY = paddle.y;
    paddle.rightX = paddle.x + paddle.width;
    paddle.bottomY = paddle.y + paddle.height;

    //sides of ball
    ball.leftX = ball.x;
    ball.topY = ball.y
    ball.rightX = ball.x + ball.width;
    ball.bottomY = ball.y + ball.height;

    // conditional to register collision
    if (ball.leftX < paddle.rightX && 
        ball.rightX > paddle.leftX && 
        ball.topY < paddle.bottomY && 
        ball.bottomY > paddle.topY) {
            return true;
    } else {
        return false;
    }

}


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
    if (leftPaddleScore === 11){
        $("#endingScreen").text("PLAYER ONE  VICTORY");
    } else if (rightPaddleScore === 11){
        $("#endingScreen").text("PLAYER TWO  VICTORY");
    }
  }
  
}
