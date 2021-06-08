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
      "DOWN" : 40
  }

  //variables to keep box from leaving board
  var boardWidth = $("#board").width();
  var boardHeight = $("#board").height();
  
  // Game Item Objects
  var positionX = 0;
  var positionY = 0;
  var speedX = 0;
  var speedY = 0;


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

  }
  
  /* 
  Called in response to keydown events.
  */
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
      console.log(event.which);

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

  function redrawGameItem(){
    //redraws box along x-axis
    $("#gameItem").css("left", positionX);
    //redraws box along y-axis
    $("#gameItem").css("top", positionY);
  }
  function endGame(){
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
