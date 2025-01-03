/*
Author: Joshua Song
The Game Project
Week 4
Camera Moving
*/

//Background
var floorPos_y;
//nountain
var mountains_x;
var mountains_y;
//Canyon
var canyon;
//Trees
var trees_x;
var trees_y;
//Clouds
var cloud_x;
var cloud_y;
//Collectable
var collectable;
//Character
var gameChar_x;
var gameChar_y;
var isLeft = false;
var isRight = false;
var isFalling = false;
var isPlummeting = false;
var isJumping = false;
var jumpHeight = 100;
var isFrozen = false;




function setup() {
	createCanvas(1024, 576);
	floorPos_y = height * 3 / 4;
	gameChar_x = width / 6;
	gameChar_y = floorPos_y;

	canyon = {
		x_pos: width / 2 - 45,
		y_pos: 432,
		width: 100
	}

	collectable = {
		x_pos: width / 2,
		y_pos: 350,
		size: 50,
		isFound: false
	}


	//Trees in array
	trees_x = [100, 300, 700, 100, 1400];
	trees_y = height / 2;

	//Clouds in array
	cloud_x = [150, 600, 1450];
	cloud_y = 100;
	cloud_xSize = 180;
	cloud_ySize = 60;

	//mountain in array
	mountains_x = [500, 1100, 1700];
	mountains_y = 250;
}

function draw() {

	///////////DRAWING CODE//////////

	background(100, 155, 255); //fill the sky blue


	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground



	//Draw clouds
	for (var i = 0; i < cloud_x.length; i++) {
		push();
		noStroke();
		fill(0, 0, 0);
		ellipse(
			cloud_x[i], cloud_y,
			cloud_xSize, cloud_ySize);
		ellipse(
			cloud_x[i] - 90, cloud_y + 10,
			cloud_xSize - 40, cloud_ySize - 20);
		ellipse(
			cloud_x[i] + 120, cloud_y + 10,
			cloud_xSize - 40, cloud_ySize - 20);
		pop();
	}

	//Draw trees in for loop
	for (var i = 0; i < trees_x.length; i++) {
		noStroke();
		fill(100, 50, 40);
		rect(trees_x[i], trees_y, 82, 144);
		fill(80, 90, 30);
		ellipse(trees_x[i] + 40, trees_y + 20, 180, 60);
		ellipse(trees_x[i] + 40, trees_y - 20, 160, 50);
		ellipse(trees_x[i] + 40, trees_y - 50, 120, 40);

	}

	//Draw muntains in for loop
	for (var i = 0; i < mountains_x.length; i++) {
		fill(100, 100, 30, 100);
		triangle(
			mountains_x[i] - 200, mountains_y + 182,
			mountains_x[i], mountains_y,
			mountains_x[i] + 100, mountains_y + 182);
		fill(100, 100, 30, 100);
		triangle(
			mountains_x[i], mountains_y + 182,
			mountains_x[i] + 200, mountains_y,
			mountains_x[i] + 330, mountains_y + 182);
		fill(100, 100, 30);
		triangle(
			mountains_x[i] - 150, mountains_y + 182,
			mountains_x[i] + 100, mountains_y - 70,
			mountains_x[i] + 300, mountains_y + 182);
	}

	//draw the canyon
	fill(20);
	rect(canyon.x_pos, canyon.y_pos, canyon.width, width - floorPos_y);

	//draw collectable item 
	if (dist(gameChar_x + 40, gameChar_y - 50, collectable.x_pos, collectable.y_pos) < 45) {
		collectable.isFound = true;
	}

	//Collectable coin
	if (collectable.isFound == false) {
		noStroke();
		fill(250, 250, 0);
		ellipse(collectable.x_pos, collectable.y_pos, 20, 40);
		fill(220, 220, 140);
		ellipse(collectable.x_pos + 5, collectable.y_pos, 10, 20);
	}

	//the game character
	if (isLeft && isFalling) {
		// add your jumping-left code
		// body
		fill(139, 69, 19); // brown
		stroke(0);
		strokeWeight(3);
		ellipse(gameChar_x + 40, gameChar_y - 50, 80, 80); //body

		//arms and legs
		strokeWeight(4);
		line(gameChar_x + 50, gameChar_y - 40, gameChar_x + 60, gameChar_y);//left arm
		line(gameChar_x + 80, gameChar_y - 40, gameChar_x + 90, gameChar_y);//right arm
		line(gameChar_x + 24, gameChar_y - 40, gameChar_x + 32, gameChar_y);//right leg
		line(gameChar_x + 60, gameChar_y - 19, gameChar_x + 65, gameChar_y);//left leg  


		// face
		strokeWeight(3);
		ellipse(gameChar_x + 30, gameChar_y - 70, 55, 48); //head
		fill(225, 0, 0);
		strokeWeight(2);
		arc(gameChar_x + 6, gameChar_y - 63, 80, 50, radians(-2), radians(27))// mouth
		arc(gameChar_x + 30, gameChar_y - 70, 55, 48, radians(75), radians(167))// mouth
		noStroke();
		fill(139, 69, 19);
		triangle(gameChar_x + 30, gameChar_y - 71,
			gameChar_x + 4, gameChar_y - 64,
			gameChar_x + 33, gameChar_y - 64)
		stroke(0);
		strokeWeight(2);
		line(gameChar_x + 4, gameChar_y - 64,
			gameChar_x + 46, gameChar_y - 65);
		//teeth
		strokeWeight(1);
		fill(225, 0, 0);
		beginShape();
		vertex(gameChar_x + 11, gameChar_y - 63);
		vertex(gameChar_x + 16, gameChar_y - 50);
		vertex(gameChar_x + 21, gameChar_y - 64);
		vertex(gameChar_x + 26, gameChar_y - 50);
		vertex(gameChar_x + 31, gameChar_y - 64);
		vertex(gameChar_x + 36, gameChar_y - 50);
		vertex(gameChar_x + 41, gameChar_y - 64);
		endShape();
		//eyes
		stroke(240, 125, 0);
		strokeWeight(5);
		point(gameChar_x + 40, gameChar_y - 75);
		point(gameChar_x + 20, gameChar_y - 75);

		//tail magic hand
		noFill();
		stroke(139, 69, 19);
		strokeWeight(7);
		line(gameChar_x + 80, gameChar_y - 60,
			gameChar_x + 105, gameChar_y - 20);

		fill(255);
		stroke(0);
		strokeWeight(1);
		ellipse(gameChar_x + 105, gameChar_y - 13, 4, 8);
		ellipse(gameChar_x + 110, gameChar_y - 15, 4, 8);
		ellipse(gameChar_x + 100, gameChar_y - 15, 4, 8);
		ellipse(gameChar_x + 105, gameChar_y - 20, 15, 10);

	}

	else if (isRight && isFalling) {
		// add your jumping-right code
		fill(139, 69, 19); // brown
		stroke(0);
		strokeWeight(3);
		ellipse(gameChar_x + 50, gameChar_y - 60, 80, 80); //body

		//arms and legs
		strokeWeight(4);
		line(gameChar_x + 40, gameChar_y - 40, gameChar_x + 30, gameChar_y);//left arm
		line(gameChar_x + 70, gameChar_y - 40, gameChar_x + 60, gameChar_y);//right arm
		line(gameChar_x + 14, gameChar_y - 40, gameChar_x + 2, gameChar_y);//right leg
		line(gameChar_x + 50, gameChar_y - 19, gameChar_x + 45, gameChar_y);//left leg  


		// face
		strokeWeight(3);
		ellipse(gameChar_x + 65, gameChar_y - 70, 55, 48); //head
		fill(225, 0, 0);
		strokeWeight(2);
		arc(gameChar_x + 41, gameChar_y - 63, 80, 50, radians(-2), radians(27))// mouth
		arc(gameChar_x + 65, gameChar_y - 70, 55, 48, radians(75), radians(167))// mouth
		noStroke();
		fill(139, 69, 19);
		triangle(gameChar_x + 65, gameChar_y - 71,
			gameChar_x + 39, gameChar_y - 64,
			gameChar_x + 68, gameChar_y - 64)
		stroke(0);
		strokeWeight(2);
		line(gameChar_x + 39, gameChar_y - 64,
			gameChar_x + 81, gameChar_y - 65);
		//teeth
		strokeWeight(1);
		fill(225, 0, 0);
		beginShape();
		vertex(gameChar_x + 46, gameChar_y - 63);
		vertex(gameChar_x + 51, gameChar_y - 50);
		vertex(gameChar_x + 56, gameChar_y - 64);
		vertex(gameChar_x + 61, gameChar_y - 50);
		vertex(gameChar_x + 66, gameChar_y - 64);
		vertex(gameChar_x + 71, gameChar_y - 50);
		vertex(gameChar_x + 76, gameChar_y - 64);
		endShape();
		//eyes
		stroke(240, 125, 0);
		strokeWeight(5);
		point(gameChar_x + 75, gameChar_y - 75);
		point(gameChar_x + 55, gameChar_y - 75);

		//tail magic hand
		noFill();
		stroke(139, 69, 19);
		strokeWeight(7);
		line(gameChar_x + 10, gameChar_y - 60,
			gameChar_x - 5, gameChar_y - 20);

		fill(255);
		stroke(0);
		strokeWeight(1);
		ellipse(gameChar_x - 5, gameChar_y - 13, 4, 8);
		ellipse(gameChar_x, gameChar_y - 15, 4, 8);
		ellipse(gameChar_x - 10, gameChar_y - 15, 4, 8);
		ellipse(gameChar_x - 5, gameChar_y - 20, 15, 10);


	}

	else if (isLeft) {
		// add your walking left code
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
		ellipse(gameChar_x + 15, gameChar_y - 70, 55, 48); //head
		fill(225, 0, 0);
		strokeWeight(2);
		arc(gameChar_x - 9, gameChar_y - 63, 80, 50, radians(-2), radians(27))// mouth
		arc(gameChar_x + 15, gameChar_y - 70, 55, 48, radians(75), radians(167))// mouth
		noStroke();
		fill(139, 69, 19);
		triangle(gameChar_x + 15, gameChar_y - 71,
			gameChar_x - 11, gameChar_y - 64,
			gameChar_x + 18, gameChar_y - 64)
		stroke(0);
		strokeWeight(2);
		line(gameChar_x - 11, gameChar_y - 64,
			gameChar_x + 31, gameChar_y - 65);
		//teeth
		strokeWeight(1);
		fill(225, 0, 0);
		beginShape();
		vertex(gameChar_x - 4, gameChar_y - 63);
		vertex(gameChar_x + 1, gameChar_y - 50);
		vertex(gameChar_x + 6, gameChar_y - 64);
		vertex(gameChar_x + 11, gameChar_y - 50);
		vertex(gameChar_x + 16, gameChar_y - 64);
		vertex(gameChar_x + 21, gameChar_y - 50);
		vertex(gameChar_x + 26, gameChar_y - 64);
		endShape();
		//eyes
		stroke(240, 125, 0);
		strokeWeight(5);
		point(gameChar_x + 25, gameChar_y - 75);
		point(gameChar_x + 5, gameChar_y - 75);

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
	else if (isRight) {
		// add your walking right code
		fill(139, 69, 19); // brown
		stroke(0);
		strokeWeight(3);
		ellipse(gameChar_x + 40, gameChar_y - 50, 80, 80); //body

		//arms and legs
		strokeWeight(4);
		line(gameChar_x + 30, gameChar_y - 30, gameChar_x + 10, gameChar_y - 10);//left arm
		line(gameChar_x + 10, gameChar_y - 10, gameChar_x + 15, gameChar_y + 10);//left arm
		line(gameChar_x + 60, gameChar_y - 30, gameChar_x + 70, gameChar_y - 10);//right arm
		line(gameChar_x + 70, gameChar_y - 10, gameChar_x + 65, gameChar_y + 10);//right arm 
		line(gameChar_x + 4, gameChar_y - 30, gameChar_x - 15, gameChar_y - 15);//left leg
		line(gameChar_x - 15, gameChar_y - 15, gameChar_x - 10, gameChar_y + 10);//right leg  
		line(gameChar_x + 50, gameChar_y - 10, gameChar_x + 45, gameChar_y + 10);//right leg 

		// face
		strokeWeight(3);
		ellipse(gameChar_x + 65, gameChar_y - 70, 55, 48); //head
		fill(225, 0, 0);
		strokeWeight(2);
		arc(gameChar_x + 41, gameChar_y - 63, 80, 50, radians(-2), radians(27))// mouth
		arc(gameChar_x + 65, gameChar_y - 70, 55, 48, radians(75), radians(167))// mouth
		noStroke();
		fill(139, 69, 19);
		triangle(gameChar_x + 65, gameChar_y - 71,
			gameChar_x + 39, gameChar_y - 64,
			gameChar_x + 68, gameChar_y - 64)
		stroke(0);
		strokeWeight(2);
		line(gameChar_x + 39, gameChar_y - 64,
			gameChar_x + 81, gameChar_y - 65);
		//teeth
		strokeWeight(1);
		fill(225, 0, 0);
		beginShape();
		vertex(gameChar_x + 46, gameChar_y - 63);
		vertex(gameChar_x + 51, gameChar_y - 50);
		vertex(gameChar_x + 56, gameChar_y - 64);
		vertex(gameChar_x + 61, gameChar_y - 50);
		vertex(gameChar_x + 66, gameChar_y - 64);
		vertex(gameChar_x + 71, gameChar_y - 50);
		vertex(gameChar_x + 76, gameChar_y - 64);
		endShape();
		//eyes
		stroke(240, 125, 0);
		strokeWeight(5);
		point(gameChar_x + 75, gameChar_y - 75);
		point(gameChar_x + 55, gameChar_y - 75);

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
	else if (isPlummeting || isFalling) {
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
		fill(225, 0, 0);
		strokeWeight(2);
		arc(gameChar_x + 16, gameChar_y - 63, 80, 50, radians(-2), radians(27))// mouth
		arc(gameChar_x + 40, gameChar_y - 70, 55, 48, radians(75), radians(167))// mouth
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
		fill(225, 0, 0);
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
		ellipse(gameChar_x, gameChar_y - 15, 4, 8);
		ellipse(gameChar_x - 10, gameChar_y - 15, 4, 8);
		ellipse(gameChar_x - 5, gameChar_y - 20, 15, 10);


	}
	else {
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
		fill(225, 0, 0);
		strokeWeight(2);
		arc(gameChar_x + 16, gameChar_y - 63, 80, 50, radians(-2), radians(27))// mouth
		arc(gameChar_x + 40, gameChar_y - 70, 55, 48, radians(75), radians(167))// mouth
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
		fill(225, 0, 0);
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
	if (isLeft == true && isFrozen == false) {
		gameChar_x -= 5;
	} else if (isRight == true && isFrozen == false) {
		gameChar_x += 5;
	} else if (isJumping == true && isFrozen == false) {
		gameChar_y -= jumpHeight;
	}

	//add gravity
	if (gameChar_y < floorPos_y) {
		isFalling = true
		gameChar_y += 4;
	} else if (gameChar_y == floorPos_y) {
		isPlummeting = false;
		isFalling = false;
	} else {
		isPlummeting = false;
		isFalling = true;
		isFrozen = true;
	}

	if (gameChar_y < (floorPos_y - jumpHeight)) {
		isJumping = false;
	}

	//falling into the canyon
	if (gameChar_x + 30 > canyon.x_pos && gameChar_x + 60 < canyon.x_pos + canyon.width) {
		if (isPlummeting == false) {
			gameChar_y += 4;
		}
	}
}


function keyPressed() {
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);

	if (keyCode == 37) {
		console.log("left arrow");
		isLeft = true;
	} else if (keyCode == 39) {
		console.log("right arrow");
		isRight = true;
	} else if ((keyCode == 38 || keyCode == 32) && isFalling == false) {
		console.log("up arrow");
		isJumping = true;
	} else if (isFalling == true) {
		console.log("double jumps is prevented")
	}

}

function keyReleased() {
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);

	if (keyCode == 37) {
		isLeft = false;
		console.log("isLeft is " + isLeft);
	} else if (keyCode == 39) {
		isRight = false;
		console.log("isRight is " + isRight);
	} else if (keyCode == 38 || keyCode == 32) {
		isJumping = false;
		isPlummeting = false;
		console.log("isJumping is " + isJumping);
		console.log("isPlummeting is " + isPlummeting);
	}
}
