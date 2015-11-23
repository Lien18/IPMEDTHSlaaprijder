"use strict"; // new JS6 functionality makes this needed! for classes
/*
 *  File: ball.js
 *  Version: 1.0
 *  Date created: 19-11-2015
 *  Author: W. van Vliet
 */
 
/*
 *  Indicator of where the ball hits the wall, defined a constant. Less likely
 *  to make typing errors with constants. You get real error in browser if you
 *  type this wrongly. This will not happen if you use string values.
 */
var TOP    = 10;
var BOTTOM = 11;
var LEFT   = 12;
var RIGHT  = 13;

class Ball{
  constructor(){
    this.speed    = 5;                     // Speed of the ball in px per update
    this.angle    = 0;                     // Angle of the ball in radians
    this.resetPosition(new Position(0,0)); // Set default startposition of ball
    this.size     = 10;                    // Size of the ball in px;
  }
  /*
   *  Every class draws itself on the canvas. This is the default draw method of
   *  the class. I wish I could define an Interface for this ...
   *  canvas: The canvas to draw on
   */
  draw(canvas){
    canvas.fillStyle = "#FFF";
    canvas.fillRect(this.position.x, this.position.y,this.size,this.size);
  }
  /*
   *  If the ball is out of the screen it must be reset at the middle of the
   *  field. The ball gets a random direction in radians.
   *  position: The center position of the field; ball does not know this itself
   */
  resetPosition(position){
    this.position = position;
    this.angle    = Math.random()*(Math.PI*2);
  }
  /*
   *  The actual movement of the ball to a new position
   */
  move(){
    this.position = this.nextPosition();
  }
  /*
   * nextPosition determines where the ball will be the next step. This makes it
   * possible to forsee its future and react accordingly by bouncing in other
   * direction for example.
   */
  nextPosition(){
    var nextX = (Math.cos(this.angle)*this.speed) + this.position.x;
    var nextY = (Math.sin(this.angle)*this.speed) + this.position.y;
    return new Position(nextX, nextY);
  }
  /*
   *  bounce calculates the angle of the ball when it hits a surface
   *  direction: on which face does it bounce: top, bottom, right or left
   *  correction: percentage to enlarge outbound bounce of paddle default = 1
   */
  bounce(direction, correction){
    var difference = 0;
    // create default outbound angle of ball
    if( direction == RIGHT ){
      difference = (Math.PI*2) - this.angle;
      this.angle = Math.PI + difference;
    } else if( direction == LEFT ){
      difference = Math.PI - this.angle;
      this.angle = (Math.PI*2) + difference;
    } else if( direction == TOP ){
      difference = (Math.PI*1.5) - this.angle;
      this.angle = (Math.PI*0.5) + difference;
    } else if( direction == BOTTOM ){
      difference = (Math.PI*0.5) - this.angle;
      this.angle = (Math.PI*1.5) + difference;
    }
    // create effect on the default angle to surprise the player
    this.angle *= correction;
  }

}
