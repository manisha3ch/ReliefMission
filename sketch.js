/*
Author: Manisha R
Created On: 19 ‎November ‎2020
Modified On: 20 ‎November ‎2020
Purpose: Project  - Drop cargo for relief work in war affected area.
*/ 
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var canvasWidth = 800,canvasHeight = 600;
var helicopterIMG, helicopterSprite; 
var packageIMG,packageIMG0;
var packageSprite=[];
var packageBody = []; 
var cargoPieces = 3;
var ground;

var currLen,val;
function preload()
{
	backgroundIMG = loadImage("warImpact.jpg");
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
    //packageIMG0=loadImage("solider.png")

}

function setup() {
	createCanvas(canvasWidth, canvasHeight);

	engine = Engine.create(); // create your engine object 
	world = engine.world;     // create your world.

	rectMode(CENTER);
	
	for (var j= 0;j < cargoPieces; j++){
		packageSprite[j]=createSprite(width/2, 80, 10,10);
		packageSprite[j].addImage(packageIMG)
		packageSprite[j].scale=0.2
	}


	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.visible=false;


	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

 	boxPosition=canvasWidth/2-100
	boxY=canvasHeight-90;

	// Left side wall of the drop box
 	boxleftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );

	 // base of the drop box
 	boxBase=createSprite(boxPosition+100, boxY+40, 200,20);
 	boxBase.shapeColor=color(255,0,0);

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );

	// Right side wall of the drop box
	boxRightSprite=createSprite(boxPosition+200 , boxY, 20,100);
	boxRightSprite.shapeColor=color(255,0,0);

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );

	/// In one go add all the box walls of our world to the Matter.World
	 World.add(world,[boxLeftBody,boxBottomBody,boxRightBody])   

	for (var i=0;i<3;i++){
		packageBody[i] = Bodies.circle(width/2 , 200 , 5 , { isStatic:true,restitution:0.4});
		World.add(world, packageBody[i]);	
	}

	currLen = packageBody.length;
	val = 0;

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);


	Engine.run(engine);
  
}


function draw() {
  background(backgroundIMG);
  rectMode(CENTER);
 // Engine.update(engine);

 for (var i = 0; i < packageSprite.length; i++){
	packageSprite[i].x= packageBody[i].position.x 
	packageSprite[i].y= packageBody[i].position.y  
 }
  drawSprites();
}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {

		helicopterSprite.x=helicopterSprite.x-20;    
		translation={x:-20,y:0};
		Matter.Body.translate(packageBody, translation);

	  } else if (keyCode === RIGHT_ARROW) {
		helicopterSprite.x=helicopterSprite.x+20;
		translation={x:20,y:0};
		Matter.Body.translate(packageBody, translation);

	  } else if (keyCode === DOWN_ARROW) {
	   console.log(currLen + "  "+val)
	   console.log(packageBody.length);
	   Matter.Body.setStatic(packageBody[val],false);
	   currLen = currLen - 1;	   
	   val = val +1;
    }    
}



