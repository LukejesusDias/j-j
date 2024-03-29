var city
var city1
var invisibleGround
var spidermanImg,spiderman
var ground
var droneimg,drone
var droneGroup
var spiderimg,spider
var spiderGroup
var boy,boyimg
var life=3
var score=0
var gameState="play"

function preload(){
city=loadImage("city picture.png");
ground_image=loadImage("ground.png")
spidermanImg=loadAnimation("spiderman.png","spiderman image 2.png","spiderman image 4.png","spiderman.png")
droneimg=loadImage("drone.png")
spiderimg=loadImage("spider image.png")
boyimg=loadImage("scared boy.png")
}

function setup() {
 createCanvas(windowWidth, windowHeight)

 
 invisibleGround = createSprite(width/2,height+6,width,1);  
 invisibleGround.addImage(ground_image)
 invisibleGround.x = width/2
 invisibleGround.velocityX=-3

 spiderman = createSprite(105,height-99,50)
spiderman.addAnimation("spiderman",spidermanImg)
spiderman.scale=0.3
spiderman.setCollider("circle",0,0,50)
spiderman.debug=true

ground=createSprite(width/2,height+20,width,50)
ground.visible=false

droneGroup=new Group()
spiderGroup=new Group()

}

function draw() 
{
 background(city);

 textSize(20)
fill("red")
 text("Life:  "+life,30,50)

 fill("blue")
text("Score:  "+score,30,74)

if(gameState ==="play"){


 if (invisibleGround.x < 0){
    invisibleGround.x = invisibleGround.width/2;
  }
spiderman.collide(ground)
if(keyDown("space")){
spiderman.velocityY=-5
}
spiderman.velocityY=spiderman.velocityY+0.8


spawnDrone()
spiderSymbol()

score=score+Math.round(getFrameRate()/60)
if(score===100){
boy=createSprite(width-100,height-200,20,30)
boy.addImage(boyimg)
boy.scale=0.1
boy.velocityX=-4

if(spiderman.isTouching(boy)){
  text("well done",30,30)
  }
}
if(spiderGroup.isTouching(spiderman)){
  life=life+1
 

}

if(droneGroup.isTouching(spiderman)){
  life=life-1
  if(life>0){
gameState="play"
  }
  else{

gameState="end"
  }
}
}
else if(gameState==="end"){
invisibleGround.velocityX=0
}
drawSprites();

}

function spawnDrone(){
  if(frameCount%150 === 0){
drone=createSprite(width+20,height-500,20,30)
drone.addImage(droneimg)
drone.velocityX=-2
drone.scale=0.2
drone.y=Math.round(random(100,600))
droneGroup.add(drone)
  }
}

function spiderSymbol(){
  if(frameCount%1000 === 0){
spider=createSprite(width+21,height-200,15,20)
spider.addImage(spiderimg)
spider.velocityX=-2
spider.scale=0.007
spider.y=Math.round(random(99,450))
spiderGroup.add(spider)
  }
}
