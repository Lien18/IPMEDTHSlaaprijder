"use strict"; // new JS6 functionality makes this needed! for classes
/*
 *  File: player.js
 *  Version: 1.0
 *  Date created: 19-11-2015
 *  Author: W. van Vliet
 */
class Player{
  constructor(x){
    this.position = new Position(x,20); // Player position. Paddle start at the top of the screen
    this.points   = 0;                  // Scored points in the game
    this.size     = new Size(10,80);    // Size of the paddle
    this.speed    = 10;                 // The speed of the paddle in px
  }
  /*
   *  Move the player paddle up or down on the field
   *  direction: -1 means up and 1 means down, choosen because it makes the calculation so easy!
   */
  move(direction){
    if( direction == 1 || direction == -1 ){
      this.position.y += (direction*this.speed);
    }
  }
  /*
   *  Every class draws itself on the canvas. This is the default draw method of
   *  the class. I wish I could define an Interface for this ...
   *  canvas: The canvas to draw on
   */
  draw(canvas){
    canvas.fillStyle = "#FFF";
    canvas.fillRect(this.position.x, this.position.y,this.size.width,this.size.height);
  }
}
