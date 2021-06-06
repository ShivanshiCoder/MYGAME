

var ground, groundImage;
var man1, man2, man3, man;
var manAnimation;
var coin, coinImage, coinImage2;
var invisibleGround;
var coinCount = 0;
var coin2, coin2Group, coinGroup;
var gameLevel = 0;
var level1, level1Img;

function preload() {
  groundImage = loadImage("images/ground2.jpg");

  man1 = loadImage("images/man1.png");
  man2 = loadImage("images/man2.png");
  man3 = loadImage("images/man3.png");
  manAnimation = loadAnimation("images/man1.png", "images/man2.png");

  coinImage = loadImage("images/goldCoin.jpg");
  coinImage2 = loadImage("images/th.jpg");

  level1Img = loadImage("images/Level1.jpg");
}





function setup() {
  createCanvas(800, 400);

  ground = createSprite(400, 390, 800, 10);
  ground.addImage(groundImage);
  ground.scale = 0.2;
  ground.velocityX = -1;

  invisibleGround = createSprite(0, 395, 1200, 05);
  //invisibleGround.visible = false;

  man = createSprite(100, 300, 20, 50);
  man.addAnimation("walking", manAnimation);
  man.scale = 0.2;
  man.debug = true;
  man.setCollider("circle", 0, 80, 150);

  level1 = createSprite(400, 200);
  level1.addImage(level1Img);
  level1.visible = false;
  level1.scale=0.7;

  coinGroup = new Group();
  coin2Group = new Group();

}

function draw() {
  background("lightblue");

  camera.position.x = man.x;
  // camera.position.y=man.y;


  if (ground.x < 0) {
    ground.x = 300;
  }

  if (keyDown("space")) {
    man.velocityY = -10;

  }

  if (keyDown("left")) {
    man.x = man.x - 5;

  }


  if (keyDown("right")) {
    man.x = man.x + 5;

  }


  man.velocityY = man.velocityY + 0.8;
  spawnCoins();

  if (coinGroup.isTouching(man)) {
    coinGroup.destroyEach();
    coinCount = coinCount + 1;
  }

  if (coin2Group.isTouching(man)) {
    coin2Group.destroyEach();
    coinCount = coinCount + 1;
  }


  if (coinCount >= 10) {
    gameLevel = gameLevel + 1;
    level1.visible = true;
  }
  man.collide(invisibleGround);

  text("coins " + coinCount, camera.position.x + 300, 50);



  drawSprites();
}




function spawnCoins() {
  if (frameCount % 250 === 0) {
    coin = createSprite(800, 200, 30, 30);
    coin.debug = true;
    coin.velocityX = -4;
    coin.addImage(coinImage);
    coin.scale = 0.1;
    coin.y = Math.round(random(10, 200));
    coinGroup.add(coin);
  }

  if (frameCount % 300 === 0) {
    coin2 = createSprite(800, 200, 30, 30);
    coin2.debug = true;
    coin2.velocityX = -4;
    coin2.addImage(coinImage2);
    coin2.scale = 0.1;
    coin2.y = Math.round(random(10, 200));
    coin2Group.add(coin2);
  }
}