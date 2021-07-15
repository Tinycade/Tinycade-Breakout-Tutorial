const Beholder = window['beholder-detection'];


let playerX = 100;
let playerY = 100;
let playerRadius = 20;
let playerSpeed = 10;
let playerRotation = 0;

var mode = false;

var changeMode = false;

let gunX = 300;
let gunY = 100;
let gunRadius = 10;
let gunSpeed = 10;
let gunRotation = 0;

document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);


let hasStarted = false;
function init() {

  Beholder.init('#beholder-root', { overlay_params: { present: true }, feed_params: { brightness: 0 }, camera_params: { rearCamera: true, torch: true, videoSize: 0 } });

  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");

  requestAnimationFrame(update);
}


function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    playerX = relativeX;
  }
  var relativeY = e.clientY - canvas.offsetTop;
  if (relativeY > 0 && relativeY < canvas.height) {
    playerY = relativeY;
  }
}

function keyDownHandler(e) {
  if (e.key == "G") {
    changeMode = !changeMode;
    console.log(changeMode);
  }
  if(e.key == "A")
  {
    gunRotation += 10;
  }
}

// function LimitDistance(alphaX, aplhaY, betaX, betaY)
// {
//   var maxDistance = 50;
//   if()
// }

function drawPlayer() {
  ctx.beginPath();
  ctx.arc(playerX, playerY, playerRadius, 0, Math.PI * 2, false);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}

function drawShield(){
  ctx.beginPath();
  ctx.arc(playerX, playerY, playerRadius +5, 0, Math.PI, false);
  ctx.strokeStyle = "#add8e6";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.closePath();
}

function drawLine(a, b, c, d){
  ctx.beginPath();
  ctx.moveTo(playerX, playerY);
  ctx.lineTo(gunX, gunY);
  ctx.strokeStyle = "grey";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawGun() {
  ctx.beginPath();
  //xpos, ypos, radx, rady, rot, startangle, endeng
  ctx.ellipse(300, 100, 10, 20, gunRotation, 0, 2 * Math.PI);
  ctx.fillStyle = "gray";
  ctx.fill();
  ctx.closePath();
}

function lerp(a, b, c, d, t) {
  return (t - a) / (b - a) * (d - c);
}

function update() {
  Beholder.update();
  //console.log(Beholder.getMarker(0).center.x); // 194 - 268


  draw();

  requestAnimationFrame(update);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawShield();
  drawGun();
  drawLine();
}



window.onload = init;
