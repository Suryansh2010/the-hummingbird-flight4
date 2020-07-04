var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bird, cloudsGroup;
var bird_img;
var score = 0;
var bg;
var gameOver, restart;
var song;

function preload(){
  bird_img = loadImage("Bird.png");

  song = loadSound("song.mp3");
  
  cloudImage = loadImage("cloud.png");

  bg = loadImage("Blue.png")
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(800,400);
  bird = createSprite(200,200,20,20);
  bird.addImage("bird", bird_img);
  bird.scale = 0.5;
  bird.setCollider("circle", 0, 0, 50);
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  cloudsGroup = new Group();
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
}

function draw() {
  background(bg);

  fill("black");
  text("Score: " + score, 700, 50);

  if (gameState === PLAY){

    score = score + Math.round(getFrameRate()/60);
    
    if((touches.length > 0 || keyDown("SPACE"))) {
      song.mp3.play( )
      bird.velocityY = -10;
       touches = [];
    }

    bird.velocityY = bird.velocityY + 1;
    spawnClouds();

    if(cloudsGroup.isTouching(bird)){
      gameState = END;
    }

    if(bird.y > 400){
      gameState = END;
    }
  }
  else if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    bird.velocityY = 0;
    cloudsGroup.setVelocityXEach(0);

    song.stop();
    
    //set lifetime of the game objects so that they are never destroyed
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
       reset();
    }
  }
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(40,360));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -(3 + score/100);
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = bird.depth;
    bird.depth = bird.depth + 1;
    gameOver.depth = cloud.depth + 1;
    restart.depth = cloud.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  cloudsGroup.destroyEach();
  
  score = 0;
  
  bird.y = 200;
}