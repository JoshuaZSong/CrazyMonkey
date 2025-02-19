/*
Author: Joshua Song
The Game Project
Task 5
Multiple interactables
*/

//Background
var floorPos_y;
var floorPos_x = 0;
//nountain
var mountains_x;
var mountains_y;
//Canyon
var canyons;
//Trees
var trees_x;
var trees_y;
//Clouds
var cloud_x;
var cloud_y;
//Collectable
var collectables;
//Character
var gameChar_x;
var gameChar_world_x;
var gameChar_y;
var lives;

var isLeft = false;
var isRight = false;
var isFalling = false;
var isPlummeting = false;
var isJumping = false;
var jumpHeight = 100;
var isFrozen = false;
//Moving camera
var cameraPosX = 0;
//Game Scores
var gameScore = 0;
//Flagpole
var flagpole;

function setup() {
	createCanvas(1024, 576);
	floorPos_y = height * 3 / 4;
	gameChar_x = width / 6;
	gameChar_y = floorPos_y;
	lives = 3;

	canyons = [
		{
			x_pos: 500,
			y_pos: 432,
			width: 100
		},
		{
			x_pos: 900,
			y_pos: 432,
			width: 100
		},
		{
			x_pos: 1100,
			y_pos: 432,
			width: 100
		}
	]

	collectables = [
		{
			x_pos: 550,
			y_pos: 350,
			size: 50,
			isFound: false//collectable's visablity
		},
		{
			x_pos: 950,
			y_pos: 350,
			size: 50,
			isFound: false
		},
		{
			x_pos: 1150,
			y_pos: 350,
			size: 50,
			isFound: false
		}
	]

	//Trees in array
	trees_x = [100, 300, 700, 100, 1400];
	trees_y = height / 2;

	//Clouds in array
	cloud_x = [150, 600, 1450];
	cloud_y = 100;
	cloud_xSize = 180;
	cloud_ySize = 60;

	//Mountain in array
	mountains_x = [500, 1100, 1700];
	mountains_y = 250;

	//Flagpole
	flagpole = {
		isReached: true,
		x_pos: 100
	}
}

startGame();

startGame(){
	function draw() {
		//FIll the background with blue sky
		background(100, 155, 255);

		//Make the background "moving" following the camera
		push();
		translate(cameraPosX, 0);//set up the initial point

		//Draw green ground
		noStroke();
		fill(0, 155, 0);
		rect(floorPos_x, floorPos_y, width, height - floorPos_y);

		//Draw clouds
		drawCloud();

		//Draw muntains
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

		//Draw trees
		for (var i = 0; i < trees_x.length; i++) {
			noStroke();
			fill(100, 50, 40);
			rect(trees_x[i], trees_y, 82, 144);
			fill(80, 90, 30);
			ellipse(trees_x[i] + 40, trees_y + 20, 180, 60);
			ellipse(trees_x[i] + 40, trees_y - 20, 160, 50);
			ellipse(trees_x[i] + 40, trees_y - 50, 120, 40);
		}

		//Draw a canyon
		for (var i = 0; i < canyons.length; i++) {
			drawCanyon(canyons[i]);
			checkCanyon(canyons[i]);
		}

		//Draw flagpole;
		drawFlagpole();


		//Draw Collectable coin
		for (var i = 0; i < collectables.length; i++) {
			if (!collectables[i].isFound) {
				drawCollectable(collectables[i]);
				checkCollectable(collectables[i]);
			}
		}

		pop();

		//The game character
		drawGameChar();


		//Score Table at left-top corner.
		drawScoreTable(gameScore);

		checkPlayerDie();



		//The opposite position change(opposite to the background)
		if (isLeft == true && isFrozen == false) {//when going left
			cameraPosX += 5;
			floorPos_x -= 5
			//gameChar_x -=5;
		} else if (isRight == true && isFrozen == false) {//when going right
			cameraPosX -= 5;
			floorPos_x += 5;
			//gameChar_x +=5;
		} else if (isJumping == true && isFrozen == false) {//when jumping
			gameChar_y -= jumpHeight;
		}

		//Gravity
		if (gameChar_y < floorPos_y) {
			isFalling = true
			gameChar_y += 4;//character's fallign speed
		} else if (gameChar_y == floorPos_y) {
			isPlummeting = false;
			isFalling = false;
		} else {
			isPlummeting = false;
			isFalling = true;
			isFrozen = true;
		}

		//Avoid double jumping
		if (gameChar_y < (floorPos_y - jumpHeight)) {
			isJumping = false;
		}

		checkFlagpole();

		gameChar_world_x = gameChar_x - cameraPosX;



	}//End of draw function
}



/* Functions:
KeyPressed
KeyReleased
drawCloud
drawCollectable
checkCollectable
drawCanyon
checkCanyon
drawScoreTable
drawGameChar
*/

function keyPressed() {
	//Open up the console to see how these press work
	console.log("keyPressed: " + key);

	//If statements to control the animation of the character when keys are pressed.
	if (keyCode == 37) {
		console.log("left arrow");
		isLeft = true;
	} else if (keyCode == 39) {
		console.log("right arrow");
		isRight = true;
	} else if ((keyCode == 38 || keyCode == 32) && isFalling == false) {
		console.log("up arrow");
		isJumping = true;
	} else if (isFalling == true) {//to avoid double jumping
		console.log("double jumps is prevented")
	}
}

function keyReleased() {
	//Open up the console to see how the release work
	console.log("keyReleased: " + key);

	//If statements to control the animation of the character when keys are released.
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

function drawCloud() {
	for (var i = 0; i < cloud_x.length; i++) {
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
	}
}

function drawCollectable(t_collectable) {
	if (t_collectable.isFound == false) {
		noStroke();
		fill(250, 250, 0);
		ellipse(t_collectable.x_pos, t_collectable.y_pos, 20, 40);
		fill(220, 220, 140);
		ellipse(t_collectable.x_pos + 5, t_collectable.y_pos, 10, 20);
	}
}

function checkCollectable(t_collectable) {
	//If the distance of the collectable and the character is closer than 45 the collectable will disappear
	if (dist(gameChar_x + 40, gameChar_y - 50, t_collectable.x_pos + cameraPosX, t_collectable.y_pos) < 45) {
		t_collectable.isFound = true;
		gameScore += 1;
	}
}

function drawCanyon(t_canyon) {
	fill(20);
	rect(t_canyon.x_pos, t_canyon.y_pos, t_canyon.width, width - floorPos_y);

}

function checkCanyon(t_canyon) {
	//falling into the canyon
	if (gameChar_x + 30 > t_canyon.x_pos + cameraPosX
		&& gameChar_x + 45 <= t_canyon.x_pos + t_canyon.width + cameraPosX) {
		if (isPlummeting == false) {
			gameChar_y += 4;
		}
	}
}

function drawScoreTable(score) {
	fill(255);
	noStroke();
	text("Score:" + score, 20, 20)
}

function checkFlagpole() {
	var d = abs(gameChar_world_x - flagpole.x_pos)
	console.log(d)
	if (d <= 55) {
		flagpole.isReached = false;
	} else {
		flagpole.isReached = true;
	}
}

function drawFlagpole() {
	push();
	strokeWeight(5);
	stroke(0);
	line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
	fill(255, 0, 255);
	noStroke();
	if (flagpole.isReached) {
		rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
	} else {
		rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
	}
	pop();
}

function checkPlayerDie() {
	if (gameChar_y < height) {
		lives--;
		if (lives > 0) {
			startGame();
		} else {
			text("Game Over!", width / 2, height / 2);
		}
	}
}

function drawGameChar() {
	push();//to make the character not moving
	if (isLeft && isFalling) {//the character jumping and facing the left side
		//Body
		fill(139, 69, 19); //brown
		stroke(0);
		strokeWeight(3);
		ellipse(gameChar_x + 40, gameChar_y - 50, 80, 80);
		//Arms and legs
		strokeWeight(4);
		line(gameChar_x + 50, gameChar_y - 40, gameChar_x + 60, gameChar_y);//left arm
		line(gameChar_x + 80, gameChar_y - 40, gameChar_x + 90, gameChar_y);//right arm
		line(gameChar_x + 24, gameChar_y - 40, gameChar_x + 32, gameChar_y);//right leg
		line(gameChar_x + 60, gameChar_y - 19, gameChar_x + 65, gameChar_y);//left leg  
		//Face
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
		//Teeth
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
		//Eyes
		stroke(240, 125, 0);
		strokeWeight(5);
		point(gameChar_x + 40, gameChar_y - 75);
		point(gameChar_x + 20, gameChar_y - 75);
		//Tail with a magic hand
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
	} else if (isRight && isFalling) {//the character jumping facing the right side
		//Body
		fill(139, 69, 19); // brown
		stroke(0);
		strokeWeight(3);
		ellipse(gameChar_x + 50, gameChar_y - 60, 80, 80);
		//Arms and legs
		strokeWeight(4);
		line(gameChar_x + 40, gameChar_y - 40, gameChar_x + 30, gameChar_y);//left arm
		line(gameChar_x + 70, gameChar_y - 40, gameChar_x + 60, gameChar_y);//right arm
		line(gameChar_x + 14, gameChar_y - 40, gameChar_x + 2, gameChar_y);//right leg
		line(gameChar_x + 50, gameChar_y - 19, gameChar_x + 45, gameChar_y);//left leg  
		//Face
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
		//Teeth
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
		//Eyes
		stroke(240, 125, 0);
		strokeWeight(5);
		point(gameChar_x + 75, gameChar_y - 75);
		point(gameChar_x + 55, gameChar_y - 75);
		//Tail with a magic hand
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
	} else if (isLeft) {//the character walking facing the left side
		//Body
		fill(139, 69, 19); // brown
		stroke(0);
		strokeWeight(3);
		ellipse(gameChar_x + 40, gameChar_y - 50, 80, 80);
		//Arms and legs
		strokeWeight(4);
		line(gameChar_x + 20, gameChar_y - 30, gameChar_x + 10, gameChar_y - 10);//right arm
		line(gameChar_x + 10, gameChar_y - 10, gameChar_x + 15, gameChar_y + 10);//right arm
		line(gameChar_x + 50, gameChar_y - 30, gameChar_x + 70, gameChar_y - 10);//left arm
		line(gameChar_x + 70, gameChar_y - 10, gameChar_x + 60, gameChar_y + 10);//left arm 
		line(gameChar_x + 75, gameChar_y - 30, gameChar_x + 94, gameChar_y - 15);//right leg
		line(gameChar_x + 94, gameChar_y - 15, gameChar_x + 85, gameChar_y + 10);//right leg
		line(gameChar_x + 30, gameChar_y - 10, gameChar_x + 35, gameChar_y + 10);//left leg 
		// Face
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
		//Teeth
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
		//Eyes
		stroke(240, 125, 0);
		strokeWeight(5);
		point(gameChar_x + 25, gameChar_y - 75);
		point(gameChar_x + 5, gameChar_y - 75);
		//Tail with a magic hand
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
	} else if (isRight) {//the character waling facing the right side
		//Body
		fill(139, 69, 19); //brown
		stroke(0);
		strokeWeight(3);
		ellipse(gameChar_x + 40, gameChar_y - 50, 80, 80);
		//Arms and legs
		strokeWeight(4);
		line(gameChar_x + 30, gameChar_y - 30, gameChar_x + 10, gameChar_y - 10);//left arm
		line(gameChar_x + 10, gameChar_y - 10, gameChar_x + 15, gameChar_y + 10);//left arm
		line(gameChar_x + 60, gameChar_y - 30, gameChar_x + 70, gameChar_y - 10);//right arm
		line(gameChar_x + 70, gameChar_y - 10, gameChar_x + 65, gameChar_y + 10);//right arm 
		line(gameChar_x + 4, gameChar_y - 30, gameChar_x - 15, gameChar_y - 15);//left leg
		line(gameChar_x - 15, gameChar_y - 15, gameChar_x - 10, gameChar_y + 10);//right leg  
		line(gameChar_x + 50, gameChar_y - 10, gameChar_x + 45, gameChar_y + 10);//right leg 
		// Face
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
		//Teeth
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
		//Eyes
		stroke(240, 125, 0);
		strokeWeight(5);
		point(gameChar_x + 75, gameChar_y - 75);
		point(gameChar_x + 55, gameChar_y - 75);
		//Tail with a magic hand
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
	} else if (isPlummeting || isFalling) {//the character jumping facing front
		//Body
		fill(139, 69, 19); // brown
		stroke(0);
		strokeWeight(3);
		ellipse(gameChar_x + 40, gameChar_y - 60, 80, 80);
		//Arms and legs
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
		//Teeth
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
		//Eyes
		stroke(240, 125, 0);
		strokeWeight(5);
		point(gameChar_x + 50, gameChar_y - 75);
		point(gameChar_x + 30, gameChar_y - 75);
		//Tail with a magic hand
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
	} else {//the character stand facing front
		// body
		fill(139, 69, 19); // brown
		stroke(0);
		strokeWeight(3);
		ellipse(gameChar_x + 40, gameChar_y - 50, 80, 80);
		//Arms and legs
		strokeWeight(4);
		line(gameChar_x + 25, gameChar_y - 30, gameChar_x + 10, gameChar_y - 10);//left arm
		line(gameChar_x + 10, gameChar_y - 10, gameChar_x + 15, gameChar_y + 10);//left arm
		line(gameChar_x + 60, gameChar_y - 30, gameChar_x + 70, gameChar_y - 10);//right arm
		line(gameChar_x + 70, gameChar_y - 10, gameChar_x + 65, gameChar_y + 10);//right arm 
		line(gameChar_x + 50, gameChar_y - 10, gameChar_x + 50, gameChar_y + 10);//right leg 
		line(gameChar_x + 30, gameChar_y - 10, gameChar_x + 30, gameChar_y + 10);//right leg 
		// Face
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
		//Teeth
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
		//Eyes
		stroke(240, 125, 0);
		strokeWeight(5);
		point(gameChar_x + 50, gameChar_y - 75);
		point(gameChar_x + 30, gameChar_y - 75);
		//Tail with a magic hand
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
	pop();
}
