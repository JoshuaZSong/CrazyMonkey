/*

The Game Project

Week 3

Game interaction

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
}

function draw()
{

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	//draw the canyon


	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code

	}
	else if(isLeft)
	{
		// add your walking left code
		var moveLeft = -50;
	//Add your code here ...
	fill(139, 69, 19); // brown
	stroke(0);
	strokeWeight(3);
	ellipse(gameChar_x + 40, gameChar_y - 50, 80, 80); //body

	//arms and legs
	strokeWeight(4);
	line(gameChar_x + 20, gameChar_y - 30, gameChar_x + 10, gameChar_y - 10);//right arm
	line(gameChar_x + 10, gameChar_y - 10, gameChar_x + 15, gameChar_y + 10);//right arm
	line(gameChar_x + 50, gameChar_y - 30, gameChar_x + 70, gameChar_y - 10);//left arm
	line(gameChar_x + 70, gameChar_y - 10, gameChar_x + 60, gameChar_y + 10);//left arm 
	line(gameChar_x + 75, gameChar_y - 30, gameChar_x + 94, gameChar_y - 15);//right leg
	line(gameChar_x + 94, gameChar_y - 15, gameChar_x + 85, gameChar_y + 10);//right leg
	line(gameChar_x + 30, gameChar_y - 10, gameChar_x + 35, gameChar_y + 10);//left leg 

	// face
	strokeWeight(3);
	ellipse(gameChar_x + 65 + moveLeft, gameChar_y - 70, 55, 48); //head
	fill(225,0,0); 
	strokeWeight(2);
	arc(gameChar_x + 41 + moveLeft, gameChar_y - 63, 80, 50, radians(-2), radians(27))// mouth
	arc(gameChar_x + 65 + moveLeft, gameChar_y - 70, 55, 48, radians(75) ,radians(167))// mouth
	noStroke();
	fill(139, 69, 19);
	triangle(gameChar_x + 65 + moveLeft, gameChar_y - 71, 
			gameChar_x + 39 + moveLeft, gameChar_y - 64, 
			gameChar_x + 68 + moveLeft, gameChar_y - 64)
	stroke(0);
	strokeWeight(2);
	line(gameChar_x + 39 + moveLeft, gameChar_y - 64, 
		gameChar_x + 81 + moveLeft, gameChar_y - 65);	
	//teeth
	strokeWeight(1);
	fill(225,0,0); 
	beginShape();
	vertex(gameChar_x + 46 + moveLeft, gameChar_y - 63);
	vertex(gameChar_x + 51 + moveLeft, gameChar_y - 50);
	vertex(gameChar_x + 56 + moveLeft, gameChar_y - 64);
	vertex(gameChar_x + 61 + moveLeft, gameChar_y - 50);
	vertex(gameChar_x + 66 + moveLeft, gameChar_y - 64);
	vertex(gameChar_x + 71 + moveLeft, gameChar_y - 50);
	vertex(gameChar_x + 76 + moveLeft, gameChar_y - 64);
	endShape();
	//eyes
	stroke(240, 125, 0);
	strokeWeight(5);
	point(gameChar_x + 75 + moveLeft, gameChar_y - 75);
	point(gameChar_x + 55 + moveLeft, gameChar_y - 75);

	//tail magic hand
	noFill();
	stroke(139, 69, 19);
	strokeWeight(7);
	line(gameChar_x + 80, gameChar_y - 50, 
		gameChar_x + 95, gameChar_y - 45);	
	line(gameChar_x + 95, gameChar_y - 45, 
		gameChar_x + 105, gameChar_y - 80);

	fill(255);
	stroke(0);
	strokeWeight(1);
	ellipse(gameChar_x + 105, gameChar_y - 87, 4, 8);
	ellipse(gameChar_x + 110, gameChar_y - 85, 4, 8);
	ellipse(gameChar_x + 100, gameChar_y - 85, 4, 8);
	ellipse(gameChar_x + 105, gameChar_y - 80, 15, 10);


	}
	else if(isRight)
	{
		// add your walking right code

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code

	}
	else
	{
		// add your standing front facing code

	}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here

}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);

	if(key == 37){
		console.log("left arrow");
		isLeft = true;
	}else if(key == 39){
		console.log("right arrow");
		isRight = true;
	}


}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);

	if(key == 37){
		console.log("left arrow");
		isLeft = false;
	}else if(key == 39){
		console.log("right arrow");
		isRight = false;
	}
}
