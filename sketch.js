var PLAY =1;
var END =0;
var gameState=PLAY
var monkey , monkey_running,Back,Backimg;
var banana ,bananaImage,ground,invisibleGround ,obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  Backimg = loadImage("forest.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}
function setup() {
  createCanvas(600,300);

  Back = createSprite(300,150)
  Back.addImage(Backimg)
  
  monkey = createSprite(80,280,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(300,290,1200,20);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(80,290,1200,20);
  invisibleGround.visible = false;

  FoodGroup = createGroup();
  ObstacleGroup = createGroup();
}
function draw() {
  background("DARKGREEN");
  
  score=frameCount%600;
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
                    
  if(keyDown("space") && monkey.y>=239.3) {
        monkey.velocityY = -12;
        
    }
  
  monkey.velocityY = monkey.velocityY + 0.9
  

  monkey.collide(invisibleGround);
  spawnBanana();
  spawnObstacle();
  touch();
  drawSprites();
  fill("white")
  textSize(20)
  text("Survial Time :"+score,300,50);
}

function spawnBanana(){
  if(World.frameCount%80===0){
    banana = createSprite(Math.round(random(480,580)),100,20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.setLifetime=100;
    banana.y=Math.round(random(120,200));
    banana.velocityX=-7;
    FoodGroup.add(banana);
  }
}
  
function spawnObstacle(){
  if(World.frameCount%100===0){
    obstacle = createSprite(Math.round(random(480,580)),260,30,30);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-4;
    obstacle.setLifetime=100;
    ObstacleGroup.add(obstacle);
  }
}

function touch(){
  if(ObstacleGroup.isTouching(monkey)){
    monkey.setVelocityX=0;
    ObstacleGroup.setVelocityXEach(0);
    ground.setVelocityX=0;
    FoodGroup.setVelocityXEach(0);
    score=0;
  }
}


