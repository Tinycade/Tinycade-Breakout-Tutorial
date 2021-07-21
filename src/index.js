const Beholder = window['beholder-detection'];

let playerMarkerNum = 1;
let gunMarkerNum = 2;

//create game elements
var gun = new Gun(200, 200, 20, 10, 10, 0);
var player = new PlayerController(100, 100, 20, 10, 0, false)
const bullets = [];
const enemies = [];
const asteroids = [];
const waypoints = Vec2[(50, 50), (50, 300), (400, 50), (400, 300)];
for(let i = 0; i < 8; i++){
  asteroids.push(new Asteroid(100, 100, Math.random() * 50));
}
//event listeners
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);

//init
let hasStarted = false;
function init() {

  Beholder.init('#beholder-root', { overlay_params: { present: true }, feed_params: { brightness: 0 }, camera_params: { rearCamera: true, torch: true, videoSize: 0 } });

  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");

  requestAnimationFrame(update);
}


function mouseMoveHandler(e) {
  if (player.mode) {
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
      player.position.x = relativeX;
    }
    var relativeY = e.clientY - canvas.offsetTop;
    if (relativeY > 0 && relativeY < canvas.height) {
      player.position.y = relativeY;
    }
    //console.log(player.position);
  }
}

function keyDownHandler(e) {
  //rotate player and gun
  if (e.key == "d") {
    gun.rotate(0.2);
  }
  if (e.key == "a") {
    gun.rotate(-0.2);
  }
  if (e.key == "l") {
    player.rotate(0.2);
  }
  if (e.key == "j") {
    player.rotate(-0.2);
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

function SpawnEnemy() {
  enemies.push(
    new Enemy(
      150,
      150,
      20, //radius
      1, //speed
      0,
      0
      //Math.floor(Math.random() * waypoints.length)
    )
  );
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
  ctx.moveTo(player.position.x, player.position.y);
  ctx.lineTo(gun.position.x, gun.position.y);
  ctx.strokeStyle = "grey";
  ctx.lineWidth = 1;
  ctx.stroke();
}

let prevTime = Date.now();

function update() {

  //checks if both markers are active
// if(!Beholder.getMarker(playerMarkerNum).present ||
//   !Beholder.getMarker(gunMarkerNum).present) {
//    console.log("Player or gun not present") 
//     return;
//   }

  //time stuff
  let currentTime = Date.now();
  let dt = currentTime - prevTime;
  prevTime = currentTime;

  //beholder marker variables
  Beholder.update();
  let playerPosition = Beholder.getMarker(playerMarkerNum).center;
  let playerRotation = Beholder.getMarker(playerMarkerNum).rotation;
  let gunPosition = Beholder.getMarker(gunMarkerNum).center;
  let gunRotation = Beholder.getMarker(gunMarkerNum).rotation;

  //update for game elements
  gun.update();
  enemies.forEach(e => e.move(dt))
  bullets.forEach(b => b.update(dt));
  asteroids.forEach(a => a.update(dt))

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
  
  let player1 = document.getElementById('player');
  ctx.drawImage(player1, player.position.x - 30, player.position.y - 30, 60, 60);
  //player.draw(ctx);
  
  //drawShield();
  drawLine();
  enemies.forEach(enemy => enemy.draw(ctx));
  asteroids.forEach(asteroid => asteroid.draw(ctx))
  gun.draw(ctx);
  bullets.forEach(b => b.draw(ctx));
}

function CircleCollision(posX, posY, rad, posX2, posY2, rad2)
{
  let radiusSum = rad + rad2;
  let xDiff = posX - posX2;
  let yDiff = posY - posY2;

  if(radiusSum > Math.sqrt((xDiff * xDiff) + (yDiff * yDiff))){
    return true;
  } else return false ;
}



window.onload = init;
