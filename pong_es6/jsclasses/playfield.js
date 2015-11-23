"use strict"; // new JS6 functionality makes this needed! for classes
/*
 *  File: playfield.js
 *  Version: 1.0
 *  Date created: 19-11-2015
 *  Author: W. van Vliet
 */
/*
 *  Status of the game defined as constants. Less likely to make typing errors
 *  with constants. You get real error in browser if you type this wrongly. This
 *  will not happen if you use string values.
 */
var STARTED = 0;
var STOPPED = 1;

class PlayField{
  constructor(size){
    this.size    = size;        // Size of the playfield in pixels
    this.ball    = new Ball();  // Instance of the ball
    this.players = new Array(); // Two players of the game
    this.status  = STOPPED;     // Current status of the game
    //this.startGame();
  }
  /*
   *  Start the game and position the ball in the middle of the field
   */
  startGame(){
    if(this.status == STOPPED ){
      this.players[0] = new Player(10); // left player
      this.players[1] = new Player(this.size.width-20); // right player
      this.ball.resetPosition(new Position(this.size.width/2, this.size.height/2));
      this.status = STARTED;
    }
  }
  /*
   *  Stop the game. Nothing more than this needed ;-)
   */
  stopGame(){
    if(this.status == STARTED){
      this.status = STOPPED;
    }
  }
  /*
   *  movePlayer gets the pressed key from the main.js and passes it to the
   *  correct player.
   *  keyCode: the pressed key of the document as char value
   */
  movePlayer(keyCode){
    switch(keyCode){
      case 38: // UP key right player
        this.players[1].move(-1);
        break;
      case 40: // DOWN key right player
        this.players[1].move(1);
        break;
      case 65: // A key (up) left player
        this.players[0].move(-1);
        break;
      case 90: // Z key (down) left player
        this.players[0].move(1);
        break;
    }
  }
  /*
   *  moveBall initiates the movement of the ball. First it tells the ball to
   *  move and then it determines its next move. The field is responsible for
   *  collision detection. Ball doesn't know its surrounding and PlayField does.
   */
  moveBall(){
    // First step: move sucker!
    this.ball.move();

    // Second step: What to do next? Change direction, start over or nothing?
    var nextPosition = this.ball.nextPosition();
    // falls of screen on the right side, so point for left player
    if( nextPosition.x + this.ball.size > this.size.width ){
      this.players[0].points++;
      this.ball.resetPosition(new Position(this.size.width/2, this.size.height/2));
    // falls of the screen on left side, so point for right player
    } else if( nextPosition.x < 0 ){
      this.players[1].points++;
      this.ball.resetPosition(new Position(this.size.width/2, this.size.height/2));
    // bounces on the bottom
    } else if( nextPosition.y + this.ball.size > this.size.height ){
      this.ball.bounce(BOTTOM,1);
    // bounces on the top
    } else if( nextPosition.y < 0 ){
      this.ball.bounce(TOP,1);
    // bounces on paddle of right player
    } else if(  nextPosition.x + this.ball.size > this.players[1].position.x &&
                nextPosition.y + this.ball.size > this.players[1].position.y &&
                nextPosition.y < this.players[1].position.y + this.players[1].size.height ) {
      var correction = (this.players[1].position.y + (this.players[1].size.height/2)); // half of height paddle
      correction     = (correction - this.ball.position.y) / (this.players[1].size.height/2); // relative between 0 and 1
      correction     = 1 + (correction/4.0);
      this.ball.bounce(RIGHT,correction);
    // bounces on paddle of left player
  } else if(  nextPosition.x < this.players[0].position.x + this.players[0].size.width &&
                nextPosition.y + this.ball.size > this.players[0].position.y &&
                nextPosition.y < this.players[0].position.y + this.players[0].size.height ) {
      var correction = (this.players[0].position.y + (this.players[0].size.height/2)); // half of height paddle
      correction     = (correction - this.ball.position.y) / (this.players[0].size.height/2); // relative between 0 and 1
      correction     = 1 + (correction/4.0);
      this.ball.bounce(LEFT, correction);
    }
  }
  /*
   *  Every class draws itself on the canvas. This is the default draw method of
   *  the class. I wish I could define an Interface for this ...
   *  canvas: The canvas to draw on
   */
  draw(canvas){
    // draw background
    this.buildBackgroundImage(canvas);
    this.buildPointsOnScreen(canvas);
    // draw the players
    this.players[0].draw(canvas);
    this.players[1].draw(canvas);
    // draw the ball
    this.ball.draw(canvas);
  }
  /*
   * helper method to show the points of the players
   *  canvas: The canvas to draw on
   */
   buildPointsOnScreen(canvas){
     canvas.font = "50px Share Tech Mono";
     canvas.fillText(this.players[0].points, (this.size.width/2)-55, 50 );
     canvas.fillText(this.players[1].points, (this.size.width/2)+29, 50 );
   }

  /*
   *  Helper method to create the iconic background image of pong
   *  canvas: The canvas to draw on
   */
  buildBackgroundImage(canvas){
    // black background
    canvas.fillStyle = "#000";
    canvas.fillRect(0,0,this.size.width, this.size.height);
    // white dotted line in the middle
    canvas.fillStyle = "#FFF";
    var x = this.size.width/2 - 3;
    for( var y=10; y < this.size.height; y+= 30 ){
      canvas.fillRect(x,y,6,15);
    }
  }
}
