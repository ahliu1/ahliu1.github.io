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

  //variables for abstraction
  var leftPaddleHeight = $("#leftPaddle").height();
  var rightPaddleHeight = $("#rightPaddle").height();

  // Game Item Objects

  //players' paddles
  var leftPaddle = gameObject("#leftPaddle", 1, 325, 0, 0);
  var rightPaddle = gameObject("#rightPaddle", 1404, 325, 0, 0);
  
  //pong ball
  var ball = gameObject("#ball", 707, 340, Math.random() * 8, Math.random() * 8);

  //player scores
  var leftPlayerScore = gameObject("#leftPlayerScore", 0, 0, 0, 0);
  var rightPlayerScore = gameObject("#rightPlayerScore", 0, 0, 0, 0);

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

    //prevents paddle from leaving board
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
    //prevents ball from leaving board
    if (ball.y >= boardHeight){
        ball.speedY = -ball.speedY;
    } else if (ball.y <= 0){
        ball.speedY = -ball.speedY;
    }

  }


  /* 
  Called in response to keydown events.
  */
  
  function handleKeyDown(event){
      //handles key-down events for left player, allows paddle to move
      if (event.which === KEY["S-DOWN"]){
          leftPaddle.speedY = 5;
      } else if (event.which === KEY["W-UP"]){
          leftPaddle.speedY = -5;
      }
      //handles key-down events for right player, allows paddle to move
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
  function gameObject($id, x, y, speedX, speedY){
    var object = {};
    object.id = $id;
    object.x = x;
    object.y = y;
    object.speedX = speedX;
    object.speedY = speedY;
    return object;
} //function for abstraction of our game objects

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

//helper functions for updating ball's position
function repositionBall(){
    ball.y += ball.speedY;
    ball.x += ball.speedX;
}

function redrawBall(){
    $("#ball").css("top", ball.y);
    $("#ball").css("left", ball.x);
}
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
