var survivalTime = 0;
var monkey , monkey_running
var banana ,ground, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup, bananaGroup;
var score
var bananas = 0;
gameState = "play";

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600,500); 


  monkey = createSprite(50,450,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.15;
  
  ground = createSprite(300,500,width,20);
  ground.shapeColor = "green";
 // console.log(ground.x);

  
 // monkey.velocityY = 10;

 bananaGroup = new Group();
 obstacleGroup = new Group();
  
}


function draw() {
  background("lightBlue");

  monkey.velocityX = 10 + (survivalTime/200);
  
  ground.velocityX = monkey.velocityX;



  camera.position.x = camera.position.x + monkey.velocityX;

  
  monkey.collide(ground);
  
 
  monkey.velocityY = monkey.velocityY + 1;
  
  survivalTime = survivalTime + Math.round(camera.position.x/2000);
  
    stroke("black");
    textSize(20);
    fill("black");
    if(gameState === "play"){
      text("Survival Time: "+ survivalTime, camera.position.x,100);
      text("Bananas collected: "+ bananas, camera.position.x,200);
      if(keyDown("space")&&monkey.y>420){
        monkey.velocityY = -17;
     }
      if(bananaGroup.collide(monkey)){
        banana.visible = false;
        banana.lifeTime = 0;
        bananas = bananas + 1;
      }
    }

      if(gameState === "end"){
        text("GAME OVER!", camera.position.x,100);
        text("Press space to restart",camera.position.x,150);  
       // monkey.velocityX = 0;
       // camera.velocityX = 0;
        //ground.velocityX = 0;
        obstacle.visible = false;
        banana.visible = false;
        bananas = 0;
        survivalTime = 0;
        if(keyWentDown("space")){
          gameState = "play";
         // console.log("end is working");
        }
      }
    
      if(obstacleGroup.isTouching(monkey)){
        gameState = "end";  
        
      }

      console.log(monkey.velocityX);
    
    spawnObstacles();
    spawnBananas();

    
// console.log(camera.position.x);
  
  


  
  
   
  
  drawSprites();
}


 function spawnBananas(){
  if(World.frameCount % 100 === 0&&gameState === "play"){
    banana = createSprite(monkey.x + 500,265,20,20);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.15;
  //banana.velocityX = -6; 
    banana.y = Math.round(random(230,330))
    banana.lifetime = 50;
    bananaGroup.add(banana);
  }
  
 }
  
 
  


function spawnObstacles(){
 if(World.frameCount % 100 === 0&&gameState === "play"){
  obstacle = createSprite(monkey.x + 500,475,30,30);
  obstacle.addImage("obstacle",obstacleImage); 
 // obstacle.velocityX = -6;
  obstacle.scale = 0.2;
  obstacle.lifeTime = 50;
  obstacleGroup.add(obstacle);
  } 
}




