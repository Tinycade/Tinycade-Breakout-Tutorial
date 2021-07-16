const Beholder = window['beholder-detection'];

//player stuff (put into class)
let playerX = 100;
let playerY = 100;
let playerRadius = 20;
let playerSpeed = 10;
let playerRotation = 0;
var changeMode = false;


//create gun
var gun = new Gun(200, 200, 20, 10, 10, 0);
const bullets = [];
const enemies = [];
const waypoints = Vec2[(50, 50), (50, 300), (400, 50), (400, 300)];

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
  if (changeMode) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      gun.position.x = relativeX;
    }
    var relativeY = e.clientY - canvas.offsetTop;
    if (relativeY > 0 && relativeY < canvas.height) {
      gun.position.y = relativeY;
    }
  }
  else {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      playerX = relativeX;
    }
    var relativeY = e.clientY - canvas.offsetTop;
    if (relativeY > 0 && relativeY < canvas.height) {
      playerY = relativeY;
    }
  }


}

function SpawnEnemy() {
  enemies.push(
    new Enemy(
      150,
      150,
      20, //radius
      10, //speed
      0,
      0
      //Math.floor(Math.random() * waypoints.length)
    )
  );
}

function keyDownHandler(e) {
  if (e.key == "d") {
    gun.rotate(0.2);
  }
  if (e.key == "a") {
    gun.rotate(-0.2);
  }
  if (e.key == "l") {
    playerRotation += 1;
  }
  if (e.key == "j") {
    playerRotation -= 1;
  }
  if (e.key == "g") {
    gun.shoot();
    //changeMode = !changeMode;
  }
  if (e.key == "k") {
    SpawnEnemy();
    //changeMode = !changeMode;
  }
}

// function LimitDistance(alphaX, aplhaY, betaX, betaY)
// {
//   var maxDistance = 50;
//   if()
// }

function drawEnemy() {
  ctx.beginPath();
  ctx.arc(enemyX, enemyY, enemyRadius, enemyRotation, Math.PI * 2 + enemyRotation, false);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function drawPlayer() {
  ctx.beginPath();
  ctx.arc(playerX, playerY, playerRadius, playerRotation, Math.PI * 2 + playerRotation, false);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}

function drawShield() {
  ctx.beginPath();
  ctx.arc(playerX, playerY, playerRadius + 10, playerRotation, Math.PI + playerRotation, false);
  ctx.strokeStyle = "#add8e6";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.closePath();
}

function drawLine(){
  ctx.beginPath();
  ctx.moveTo(playerX, playerY);
  ctx.lineTo(gun.position.x, gun.position.y);
  ctx.strokeStyle = "grey";
  ctx.lineWidth = 1;
  ctx.stroke();
}

let prevTime = Date.now();

function update() {
  let currentTime = Date.now();
  let dt = currentTime - prevTime;
  prevTime = currentTime;

  Beholder.update();
  //console.log(Beholder.getMarker(0).center.x); // 194 - 268
  gun.update();

  enemies.forEach(e => e.move())

  bullets.forEach(b => b.update(dt));

  // Filter out bullest
  for (let i = bullets.length - 1; i > -1; i--) {
    if (bullets[i].shouldRemove) bullets.splice(i, 1);
  }

  // WE DRAW LAST DYLION
  draw();

  requestAnimationFrame(update);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawShield();
  drawLine();
  enemies.forEach(enemy => enemy.draw(ctx));
  gun.draw(ctx);
  bullets.forEach(b => b.draw(ctx));
}



window.onload = init;
