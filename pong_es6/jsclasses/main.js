/*
 *  File: main.js
 *  Version: 1.0
 *  Date created: 19-11-2015
 *  Author: W. van Vliet
 */
/*
 *  Every game has a startingpoint. main.js is the 'controller' between the
 *  model classes and the interface. The interface can't communicate with
 *  classes directly, so this javascript file is 'oldskool'. Normal functions
 *  and stuff like that.
 */

var playField;  // Link to the model classes. PlayField is the accespoint.
var component;  // The html canvas element
var drawCanvas; // The 2d context of the html canvas

/*
 *  Eventlisteners for the game. This is just one ... ain't it cute? It binds
 *  the keyboard input to a function.
 */
document.addEventListener('keydown',movePlayer);
/*
 *  the drawing of the game loop. This is endless and forever
 */
function loop(){
  // Draw and move only if the game is started.
  if( playField.status == STARTED ) {
    playField.moveBall();
    playField.draw(drawCanvas);
  }
  window.setTimeout('loop()',40);
}

/*
 *  if a key is pressed, the player has to move
 */
function movePlayer(e){
  playField.movePlayer(e.keyCode);
}

function startGame(){
  playField.startGame();
}

function stopGame(){
  playField.stopGame();
}
/*
 *  The start of the Javascript part of the game
 *  You got to start somewhere!
 *  This function is loaded by onload in the html file and kickstarts the game
 */
function main(){
  component  = document.getElementById("game");
  drawCanvas = component.getContext("2d");
  playField  = new PlayField( new Size (component.width, component.height) );

  loop();
}
