var dog,dogimg,happyDog,database,foodS,foodStock;

function preload()
{
	dogimg=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(800, 700);
  database=firebase.database();
  dog= createSprite(200,300)
  dog.scale= 0.2;
  dog.addImage(dogimg);
  foodStock=database.ref("food")
  foodStock.on("value",readStock);

}


function draw() {  
 background("green");
 if(keyWentDown("UP_ARROW")){
   writeStock(foodS)
   dog.addImage(happyDog)
 }
  drawSprites();
  //add styles here
textSize(20);
fill("red")
text("FOOD REMAINING: "+ foodS,150,200);
text("PRESS UP ARROW TO FEED THE DOG",150,90);
}
function readStock(data){
  foodS= data.val();
}
 function writeStock(x){
   if(x<=0){
     x=0;
   }
   else{
     x= x-1;
   }
   database.ref('/').update({
     food:x
   })
 }


