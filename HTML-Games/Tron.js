
let blockSize = 30;
let total_row = 71; //total row number
let total_col = 101; //total column number
let board;
let context;

//where tron starts
let snakeX = blockSize * 8;
let snakeY = blockSize * 36;

//the direction that tron is going
let speedX = 1;  //speed of tron in x coordinate.
let speedY = 0;  //speed of tron in Y coordinate.

//an array that has the cordinants for every body of the tron
let snakeBody = [];

//food is the place that tron was just at as a temporary placeholder to put his line down (its called food because it was going to be a snake game and i dont want to change the name of the variable everywhere it is called)
let foodX;
let foodY;

//where sark starts
let snakeX2 = blockSize * (total_col - 9);
let snakeY2 = blockSize * 36;

//the direction that the orange is going
let speedX2 = -1;  //speed of orange in x coordinate.
let speedY2 = 0;  //speed of orange in Y coordinate.

let snakeBody2 = [];

//food is the place that orange was just at as a temporary placeholder to put his line down
let foodX2;
let foodY2;
//to determine who wins
let sark;
let tron;

gameOver = false;

let boost = false;
let boost2 = false;

let lastInput = 68;
let lastInput2 = 37;

 window.onload = function() {
    // Set board height and width
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");
    context2 = board.getContext("2d");

    document.addEventListener("keydown", changeDirection);//for movements
    //for second snake
    document.addEventListener("keydown", changeDirection2);//for movements
    // Set update speed
    //this is my timer for reference
   setInterval(update, 80);
  }

function update() {
  if (gameOver) {
    return;
  }
  if (snakeX == snakeX2 && snakeY == snakeY2){
    this.tron = "winner";
    this.sark = "winner";
    gameOver = true;
  }
  //food is the place that tron was just at as a temporary placeholder to put his line down (the blue spot)(its called food because it was going to be a snake game and i dont want to change the name of the variable everywhere it is called)
  foodX = snakeX
  foodY = snakeY
  foodX2 = snakeX2
  foodY2 = snakeY2
  updateLastIn();
  //clears board
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  checkBoost()
  checkBoost2()
//this section makes the players bodies grow

  // body of snake will grow
  for (let i = snakeBody.length - 1; i > 0; i--) {
    // it will store previous part of snake to the current part
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }


  context.fillStyle = "#1b4f72";
  snakeX += speedX * blockSize; //updating Snake position in X coordinate.
  snakeY += speedY * blockSize;  //updating Snake position in Y coordinate.
  //makes the spot where you are going visible
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  //this makes trons line visible
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  //second player

  for (let i = snakeBody2.length - 1; i > 0; i--) {
    snakeBody2[i] = snakeBody2[i - 1];
  }
  if (snakeBody2.length) {
    snakeBody2[0] = [snakeX2, snakeY2];
  }

  context2.fillStyle = "#78281f";
  snakeX2 += speedX2 * blockSize; //updating Snake position in X coordinate.
  snakeY2 += speedY2 * blockSize;  //updating Snake position in Y coordinate.
  //this makes where he is going visible
  context2.fillRect(snakeX2, snakeY2, blockSize, blockSize);
  //this makes oranges line visible
  for (let i = 0; i < snakeBody2.length; i++) {
    context2.fillRect(snakeBody2[i][0], snakeBody2[i][1], blockSize, blockSize);
  }
//makes the head visible
  if (true) {
    context2.fillStyle = "#ec7063";
    context2.fillRect(snakeX2, snakeY2, blockSize, blockSize);
    //adds the spot he was just in to an array to keep track of his body
    snakeBody2.push(foodX2, foodY2)
  }
  if (true) {
    //makes trons head visible
    context.fillStyle = "#5dade2";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    snakeBody.push(foodX, foodY)
  }

  Death()

  //this code checks the results from the death function and if it is true then it will display the winner
  if(this.tron == "winner" && this.sark != "winner"){
    document.getElementById("body2").innerHTML = "TRON WINS!";
    alert("Game Over, Tron Wins!");
  }else if(this.sark == "winner" && this.tron != "winner"){
    document.getElementById("body2").innerHTML = "SARK WINS!";
    alert("Game Over, Sark Wins!");
  }else if(this.tron = "winner" && this.sark == "winner"){
    document.getElementById("body2").innerHTML = "TIE!";
    alert("Game Over, Tie");
  }
//end of update function
}

function updateLastIn() {
  if(speedX < 0) {
    lastInput = 65;
  }  else if(speedX > 0) {
    lastInput = 68;
  }  else if(speedY < 0) {
    lastInput = 87;
  }  else if(speedY > 0) {
    lastInput = 83;
  }

  if(speedX2 < 0) {
    lastInput2 = 37;
  }  else if(speedX2 > 0) {
    lastInput2 = 39;
  }  else if(speedY2 < 0) {
    lastInput2 = 38;
  }  else if(speedY2 > 0) {
    lastInput2 = 40;
  }
}

//this function checks if the player is going to die
function Death(){
//if tron hits a wall then sark wins
  if (snakeX < -1
    || snakeX > (total_col * blockSize) - 1
    || snakeY < -1
    || snakeY > (total_row * blockSize) - 1){

    this.sark = "winner";
    gameOver = true;
  }

//if sark hits a wall then tron wins
if (snakeX2 < -1
  || snakeX2 > (total_col * blockSize) - 1
  || snakeY2 < -1
  || snakeY2 > (total_row * blockSize) - 1){

  this.tron = "winner";
  gameOver = true;
}

  //if either player hit themselves or the other player, the game ends

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {

      // tron hits his own body
      gameOver = true;
      this.sark = "winner";
    }
  }
  for (let i = 0; i < snakeBody2.length; i++) {
    if (snakeX == snakeBody2[i][0] && snakeY == snakeBody2[i][1]) {

      // tron hits the orange line
      gameOver = true;
      this.sark = "winner";
   }
  }
  for (let i = 0; i < snakeBody2.length; i++) {
    if (snakeX2 == snakeBody2[i][0] && snakeY2 == snakeBody2[i][1]) {

      // orange hits his own body
      gameOver = true;
      this.tron = "winner";
    }
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX2 == snakeBody[i][0] && snakeY2 == snakeBody[i][1]) {

      // orange hits the tron line
      gameOver = true;
      this.tron = "winner";
    }
  }
  //end of update function
}

// Movement of the blue character - We are using addEventListener
function changeDirection(e) {
  if (e.keyCode == 87 && speedY != 1  && speedY != 2 && lastInput != 83) {
    // If w key pressed with this condition
    // snake will not move in the opposite direction
    speedX = 0;
    speedY = -1;
  }
  else if (e.keyCode == 83 && speedY != -1 && speedY != -2 && lastInput != 87) {
    //If s pressed
    speedX = 0;
    speedY = 1;
  }
  else if (e.keyCode == 65 && speedX != 1  && speedX != 2 && lastInput != 68) {
    //If a pressed
    speedX = -1;
    speedY = 0;
  }
  else if ((e.keyCode == 68) && speedX != -1 && speedX != -2 && lastInput != 65) {
    //If d pressed
    speedX = 1;
    speedY = 0;
  }
  if ((e.keyCode == 32) && boost) {
    boost = false;
  } else if ((e.keyCode == 32) && !boost) {
    boost = true;
  }
}

// Movement of the orange character - We are using addEventListener
function changeDirection2(e) {
  if (e.keyCode == 38 && speedY2 != 1 && speedY2 != 2 && lastInput2 != 40) {
    // If up arrow key pressed with this condition...
    // snake will not move in the opposite direction
    speedX2 = 0;
    speedY2 = -1;
  }
  else if (e.keyCode == 40 && speedY2 != -1 && speedY2 != -2 && lastInput2 != 38) {
    //If down arrow key pressed
    speedX2 = 0;
    speedY2 = 1;
  }
  else if (e.keyCode == 37 && speedX2 != 1  && speedX2 != 2 && lastInput2 != 39) {
    //If left arrow key pressed
    speedX2 = -1;
    speedY2 = 0;
  }
  else if (e.keyCode == 39 && speedX2 != -1 && speedX2 != -2 && lastInput2 != 37) {
    //If right arrow key pressed
    speedX2 = 1;
    speedY2 = 0;
  }
  if ((e.keyCode == 16) && boost2) {
    boost2 = false;
  } else if ((e.keyCode == 16) && !boost2) {
    boost2 = true;
  }

  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
  }
}

//this function checks if the player is going to boost
function checkBoost(){
  if (boost == true){
    if (speedX == 0 && speedY == -1) {
      // If w key pressed with this condition
      speedX = 0;
      speedY = -2;
    }else if(speedX == 0 && speedY == 1){
      //if s pressed
      speedX = 0;
      speedY = 2;
    }else if(speedX == -1 && speedY == 0){
      //if a pressed
    speedX = -2;
    speedY = 0;
    }else if(speedX == 1 && speedY == 0){
      //if d pressed
    speedX = 2;
    speedY = 0;
    }
  }else{
    if (speedX == 0 && speedY == -2) {
      // If w key pressed with this condition
      speedX = 0;
      speedY = -1;
    }else if(speedX == 0 && speedY == 2){
      //if s pressed
      speedX = 0;
      speedY = 1;
    }else if(speedX == -2 && speedY == 0){
      //if a pressed
    speedX = -1;
    speedY = 0;
    }else if(speedX == 2 && speedY == 0){
      //if d pressed
    speedX = 1;
    speedY = 0;
    }
  }
}
//this function checks if the second player is going to boost
function checkBoost2(){
  if (boost2 == true){
    if (speedX2 == 0 && speedY2 == -1) {
      // If w key pressed with this condition
      speedX2 = 0;
      speedY2 = -2;
    }else if(speedX2 == 0 && speedY2 == 1){
      //if s pressed
      speedX2 = 0;
      speedY2 = 2;
    }else if(speedX2 == -1 && speedY2 == 0){
      //if a pressed
    speedX2 = -2;
    speedY2 = 0;
    }else if(speedX2 == 1 && speedY2 == 0){
      //if d pressed
    speedX2 = 2;
    speedY2 = 0;
    }
  }else{
    if (speedX2 == 0 && speedY2 == -2) {
      // If w key pressed with this condition
      speedX2 = 0;
      speedY2 = -1;
    }else if(speedX2 == 0 && speedY2 == 2){
      //if s pressed
      speedX2 = 0;
      speedY2 = 1;
    }else if(speedX2 == -2 && speedY2 == 0){
      //if a pressed
    speedX2 = -1;
    speedY2 = 0;
    }else if(speedX2 == 2 && speedY2 == 0){
      //if d pressed
    speedX2 = 1;
    speedY2 = 0;
    }
  }
}