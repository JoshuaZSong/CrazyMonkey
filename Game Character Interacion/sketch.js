/*

The Game Project

Week 3

Game interaction

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;


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

	}
	else if(isRight)
	{
		// add your walking right code

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
		fill(139, 69, 19); // brown
	stroke(0);
	strokeWeight(3);
	ellipse(gameChar_x + 40, gameChar_y - 60, 80, 80); //body

	//arms and legs
	strokeWeight(4);
	line(gameChar_x + 20, gameChar_y - 30, gameChar_x + 20, gameChar_y - 10);//left arm
	line(gameChar_x + 60, gameChar_y - 30, gameChar_x + 60, gameChar_y - 10);//right arm
	line(gameChar_x + 50, gameChar_y - 20, gameChar_x + 50, gameChar_y + 5);//left leg 
	line(gameChar_x + 30, gameChar_y - 20, gameChar_x + 30, gameChar_y + 5);//right leg 

	strokeWeight(3);
	ellipse(gameChar_x + 40, gameChar_y - 70, 55, 48); //head
	fill(225,0,0); 
	strokeWeight(2);
	arc(gameChar_x + 16, gameChar_y - 63, 80, 50, radians(-2), radians(27))// mouth
	arc(gameChar_x + 40, gameChar_y - 70, 55, 48, radians(75) ,radians(167))// mouth
	noStroke();
	fill(139, 69, 19);
	triangle(gameChar_x + 40, gameChar_y - 71, 
			gameChar_x + 14, gameChar_y - 64, 
			gameChar_x + 43, gameChar_y - 64)
	stroke(0);
	strokeWeight(2);
	line(gameChar_x + 14, gameChar_y - 64, 
		gameChar_x + 56, gameChar_y - 65);	
	//teeth
	strokeWeight(1);
	fill(225,0,0); 
	beginShape();
	vertex(gameChar_x + 21, gameChar_y - 63);
	vertex(gameChar_x + 26, gameChar_y - 50);
	vertex(gameChar_x + 31, gameChar_y - 64);
	vertex(gameChar_x + 36, gameChar_y - 50);
	vertex(gameChar_x + 41, gameChar_y - 64);
	vertex(gameChar_x + 46, gameChar_y - 50);
	vertex(gameChar_x + 51, gameChar_y - 64);
	endShape();
	//eyes
	stroke(240, 125, 0);
	strokeWeight(5);
	point(gameChar_x + 50, gameChar_y - 75);
	point(gameChar_x + 30, gameChar_y - 75);
	//tail magic hand
	noFill();
	stroke(139, 69, 19);
	strokeWeight(7);
	line(gameChar_x, gameChar_y - 60, 
		gameChar_x - 5, gameChar_y - 20);	
	
	fill(255);
	stroke(0);
	strokeWeight(1);
	ellipse(gameChar_x - 5, gameChar_y - 13, 4, 8);
	ellipse(gameChar_x , gameChar_y - 15, 4, 8);
	ellipse(gameChar_x - 10, gameChar_y - 15, 4, 8);
	ellipse(gameChar_x - 5, gameChar_y - 20, 15, 10);


	}
	else
	{
		// add your standing front facing code
		// body
		fill(139, 69, 19); // brown
		stroke(0);
		strokeWeight(3);
		ellipse(gameChar_x + 40, gameChar_y - 50, 80, 80); //body

		//arms and legs
		strokeWeight(4);
		line(gameChar_x + 25, gameChar_y - 30, gameChar_x + 10, gameChar_y - 10);//left arm
		line(gameChar_x + 10, gameChar_y - 10, gameChar_x + 15, gameChar_y + 10);//left arm
		line(gameChar_x + 60, gameChar_y - 30, gameChar_x + 70, gameChar_y - 10);//right arm
		line(gameChar_x + 70, gameChar_y - 10, gameChar_x + 65, gameChar_y + 10);//right arm 
		line(gameChar_x + 50, gameChar_y - 10, gameChar_x + 50, gameChar_y + 10);//right leg 
		line(gameChar_x + 30, gameChar_y - 10, gameChar_x + 30, gameChar_y + 10);//right leg 

		// face
		strokeWeight(3);
		ellipse(gameChar_x + 40, gameChar_y - 70, 55, 48); //head
		fill(225,0,0); 
		strokeWeight(2);
		arc(gameChar_x + 16, gameChar_y - 63, 80, 50, radians(-2), radians(27))// mouth
		arc(gameChar_x + 40, gameChar_y - 70, 55, 48, radians(75) ,radians(167))// mouth
		noStroke();
		fill(139, 69, 19);
		triangle(gameChar_x + 40, gameChar_y - 71, 
				gameChar_x + 14, gameChar_y - 64, 
				gameChar_x + 43, gameChar_y - 64)
		stroke(0);
		strokeWeight(2);
		line(gameChar_x + 14, gameChar_y - 64, 
			gameChar_x + 56, gameChar_y - 65);	
		//teeth
		strokeWeight(1);
		fill(225,0,0); 
		beginShape();
		vertex(gameChar_x + 21, gameChar_y - 63);
		vertex(gameChar_x + 26, gameChar_y - 50);
		vertex(gameChar_x + 31, gameChar_y - 64);
		vertex(gameChar_x + 36, gameChar_y - 50);
		vertex(gameChar_x + 41, gameChar_y - 64);
		vertex(gameChar_x + 46, gameChar_y - 50);
		vertex(gameChar_x + 51, gameChar_y - 64);
		endShape();
		//eyes
		stroke(240, 125, 0);
		strokeWeight(5);
		point(gameChar_x + 50, gameChar_y - 75);
		point(gameChar_x + 30, gameChar_y - 75);

		//tail magic hand
		noFill();
		stroke(139, 69, 19);
		strokeWeight(7);
		line(gameChar_x, gameChar_y - 50, 
			gameChar_x - 15, gameChar_y - 45);	
		line(gameChar_x - 15, gameChar_y - 45, 
			gameChar_x - 25, gameChar_y - 80);
		fill(255);
		stroke(0);
		strokeWeight(1);
		ellipse(gameChar_x - 25, gameChar_y - 87, 4, 8);
		ellipse(gameChar_x - 20, gameChar_y - 85, 4, 8);
		ellipse(gameChar_x - 30, gameChar_y - 85, 4, 8);
		ellipse(gameChar_x - 25, gameChar_y - 80, 15, 10);
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
		isleft 
	}else if(key == 39){
		console.log("right arrow");
	}


}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
}
