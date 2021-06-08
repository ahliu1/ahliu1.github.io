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
      "LEFT" : 37,
      "UP" : 38,
      "RIGHT" : 39,
      "DOWN" : 40,
      "A-LEFT" : 65,
      "W-UP" : 87,
      "D-RIGHT" : 68,
      "S-DOWN" : 83
  }

  //variables to keep box from leaving board
  var boardWidth = $("#board").width();
  var boardHeight = $("#board").height();
  
  // Game Item Objects

  //variables for player 1's box1
  var positionX = 0;
  var positionY = 0;
  var speedX = 0;
  var speedY = 0;

  //variables for player 2's box2
  var positionX2 = 0;
  var positionY2 = 0;
  var speedX2 = 0;
  var speedY2 = 0;


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                          // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    
    //prevents box from going outside the board
      if (positionX > boardWidth - 50){
         speedX = -speedX;
    } else if (positionX < 0){
         speedX = -speedX;
    } 
  
    if (positionY > boardHeight - 50){
        speedY = -speedY;
     } else  if (positionY < 0){
        speedY = -speedY;
  }

    redrawGameItem();

    repositionGameItem2();

    if (positionX2 > boardWidth - 50){
        speedX2 = -speedX2;
    } else if (positionX2 < 0){
         speedX2 = -speedX2;
    } 
  
    if (positionY2 > boardHeight - 50){
        speedY2 = -speedY2;
     } else  if (positionY2 < 0){
        speedY2 = -speedY2;
  }
    redrawGameItem2();
  }
  
  /* 
  Called in response to keydown events.
  */
 
  //reacts to player 1's arrow keys' keydown events
  function handleKeyDown(event) {
      if (event.which === KEY.LEFT){
          speedX = -5;
      } else if (event.which === KEY.UP){
          speedY = -5;
      } else if (event.which === KEY.RIGHT){
          speedX = 5;
      } else if (event.which === KEY.DOWN){
          speedY = 5;
      }

      if (event.which === KEY.A-LEFT){
          speedX2 = -5;
      } else if (event.which === KEY.W-UP){
          speedY2 = -5;
      } else if (event.which === KEY.D-RIGHT){
          speedX2 = 5;
      } else if (event.which === KEY.S-DOWN){
          speedY2 = 5;
      }
  }



  /* 
  Called in response to keyup events.
  */

  function handleKeyUp(event){
      if (event.which === KEY.LEFT){
          speedX = 0;
      } else if (event.which === KEY.UP){
          speedY = 0;
      } else if (event.which === KEY.RIGHT){
          speedX = 0;
      } else if (event.which === KEY.DOWN){
          speedY = 0;
      }

      if (event.which === KEY["A-LEFT"]){
          speedX2 = 0;
      } else if (event.which === KEY.W-UP){
          speedY2 = 0;
      } else if (event.which === KEY.S-RIGHT){
          speedX2 = 0;
      } else if (event.which === KEY.S-DOWN){
          speedY2 = 0;
      }
  }




  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem() {
    //moves box along x-axis
    positionX += speedX;
    //moves box along y-axis
    positionY += speedY;
  }

  function repositionGameItem2(){
      positionX2 += speedX2;
      positionY2 += speedY2;
  }

  function redrawGameItem(){
    //redraws box along x-axis
    $("#gameItem").css("left", positionX);
    //redraws box along y-axis
    $("#gameItem").css("top", positionY);
  }

  function redrawGameItem2(){
    $("#gameItem2").css("left", positionX2);
    //redraws box along y-axis
    $("#gameItem2").css("top", positionY2);
  }
  function endGame(){
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
