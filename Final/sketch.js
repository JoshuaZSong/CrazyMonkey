/*
Author: Zihao Song
The Game Project
Final
Multiple interactables
*/

//import { drawGameChar } from './character.js';
//Background mountain Canyon Trees
let floorPos_y, floorPos_x;
let mountains, canyons, trees_x, clouds;
//Collectable
let collectables;
//Character
let gameChar_x, gameChar_y, gameChar_world_x, lives, jumpSpeed, jumpHeight;
//Charactoer status
let isLeft, isRight, isFalling, isPlummeting, isJumping, isFrozen;
//Game status 
let cameraPosX, gameScore, flagpole;

function setup() {
	createCanvas(1024, 576);
	floorPos_y = height * 3 / 4;
	gameScore = 0;
	lives = 3;

	collectables = [{ x_pos: 100, y_pos: 350, size: 50, isFound: false },
	{ x_pos: 950, y_pos: 350, size: 50, isFound: false },
	{ x_pos: 1150, y_pos: 350, size: 50, isFound: false }]

	startGame();
}

function draw() {
	//FIll the background with blue sky
	background(100, 155, 255);
	//Draw green ground
	drawGround();

	//Make the background "moving" following the camera
	push();
	translate(cameraPosX, 0);//set up the initial point

	//Draw clouds
	drawCloud();

	//Draw muntains
	drawMountain();

	//Draw trees
	drawTree();

	//Draw a canyon
	drawCanyon();

	//Draw flagpole;
	drawFlagpole();

	//Draw Collectable coin
	drawCollectable()
	pop();

	//The game character
	drawGameChar();

	//Score Table at left-top corner.
	drawScoreTable(gameScore);
	drawlife(lives)

	checkPlayerDie();

	checkFlagpole();

	//The opposite position change(opposite to the background)
	if (isFrozen == false) {
		if (isLeft == true) {//when going left
			cameraPosX += 5;
		} else if (isRight == true) {//when going right
			cameraPosX -= 5;
		}

		if (isJumping == true) {//when jumping
			gameChar_y -= jumpSpeed;
			isPlummeting = false;
		}
	}

	//Gravity
	if (gameChar_y < floorPos_y) {
		isFalling = true
		gameChar_y += 4;//character's fallign speed
		if (gameChar_y < (floorPos_y - jumpHeight)) {//Avoid double jumping
			isJumping = false;
		}
	} else if (gameChar_y == floorPos_y) {
		isPlummeting = false;
		isFalling = false;
	} else {
		isPlummeting = true;
		isFalling = false;
		if (!isJumping) {
			isFrozen = true;
		}
	}

	gameChar_world_x = gameChar_x - cameraPosX;
}//End of draw function


function keyPressed() {
	//If statements to control the animation of the character when keys are pressed.
	if (isFrozen == false) {
		if ((keyCode == 38 || keyCode == 32) && !isFalling) {
			isJumping = true;
		}

		if (keyCode == 37) {
			isLeft = true;
		} else if (keyCode == 39) {
			isRight = true;
		}
	}
}

function keyReleased() {
	//If statements to control the animation of the character when keys are released.
	if (keyCode == 37) {
		isLeft = false;
	} else if (keyCode == 39) {
		isRight = false;
	} else if (keyCode == 38 || keyCode == 32) {
		isJumping = false;
	}
}

//Background functions:

function drawGround() {
	noStroke();
	fill(0, 155, 0);
	rect(floorPos_x, floorPos_y, width, height - floorPos_y);
}
function drawCloud() {
	for (let i = 0; i < clouds.length; i++) {
		noStroke();
		fill(0, 0, 0);
		let x = clouds[i].x_pos
		let y = clouds[i].y_pos
		let xs = clouds[i].x_size
		let ys = clouds[i].y_size
		ellipse(x, y, xs, ys);
		ellipse(x - 90, y + 10, xs - 40, ys - 20);
		ellipse(x + 120, y + 10, xs - 40, ys - 20);
	}
}

function drawMountain() {
	for (let i = 0; i < mountains.length; i++) {
		fill(100, 100, 30, 100);
		let x = mountains[i].x_pos;
		let y = mountains[i].y_pos;
		triangle(
			x - 200, y + 182,
			x, y,
			x + 100, y + 182);
		fill(100, 100, 30, 100);
		triangle(
			x, y + 182,
			x + 200, y,
			x + 330, y + 182);
		fill(100, 100, 30);
		triangle(
			x - 150, y + 182,
			x + 100, y - 70,
			x + 300, y + 182);
	}
}

function drawCanyon() {
	for (let i = 0; i < canyons.length; i++) {
		fill(20);
		rect(canyons[i].x_pos, canyons[i].y_pos, canyons[i].width, width - floorPos_y);
		checkCanyon(canyons[i]);
	}
}

function drawTree() {
	for (let i = 0; i < trees_x.length; i++) {
		noStroke();
		fill(100, 50, 40);
		rect(trees_x[i], height / 2, 82, 144);
		fill(80, 90, 30);
		ellipse(trees_x[i] + 40, height / 2 + 20, 180, 60);
		ellipse(trees_x[i] + 40, height / 2 - 20, 160, 50);
		ellipse(trees_x[i] + 40, height / 2 - 50, 120, 40);
	}
}

function drawCollectable() {
	for (let i = 0; i < collectables.length; i++) {
		if (!collectables[i].isFound) {
			if (collectables[i].isFound == false) {
				noStroke();
				fill(250, 250, 0);
				ellipse(collectables[i].x_pos, collectables[i].y_pos, 20, 40);
				fill(220, 220, 140);
				ellipse(collectables[i].x_pos + 5, collectables[i].y_pos, 10, 20);
			}
			checkCollectable(collectables[i]);
		}
	}


}

function drawFlagpole() {
	push();
	strokeWeight(5);
	stroke(0);
	line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
	fill(255, 0, 255);
	noStroke();
	pop();
	noStroke();
	fill(255, 0, 255);
	if (flagpole.isReached) {
		rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
		text("Level Completed!", width / 2 - cameraPosX, height / 2);
	} else {

		rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
	}
}

//Game status:
function drawScoreTable(score) {
	fill(255);
	noStroke();
	text("Score:" + score, 20, 20)
}

function drawlife(lives) {
	for (let i = 0; i < lives; i++) {
		fill(255, 0, 0);
		ellipse(30 + i * 30, 40, 20, 20);
	}
}

//Character reactions:
function checkCollectable(t_collectable) {
	//If the distance of the collectable and the character is closer than 45 the collectable will disappear
	if (dist(gameChar_x + 40, gameChar_y - 50, t_collectable.x_pos + cameraPosX, t_collectable.y_pos) < t_collectable.size) {
		t_collectable.isFound = true;
		gameScore += 1;
	}
}

function checkCanyon(t_canyon) {
	//falling into the canyon
	if (gameChar_x + 35 >= t_canyon.x_pos + cameraPosX
		&& gameChar_x + 40 <= t_canyon.x_pos + t_canyon.width + cameraPosX) {
		if (!isFalling) {
			gameChar_y += 4;
		}
	}
}

function checkFlagpole() {
	let d = abs(gameChar_world_x - flagpole.x_pos)
	if (d <= 55) {
		flagpole.isReached = true;
		isFrozen = true
	} else {
		flagpole.isReached = false;
	}
}

function checkPlayerDie() {
	if (gameChar_y > height) {
		if (lives > 1) {
			lives--;
			startGame();
		} else {
			lives--;
			text("Game Over!", width / 2, height / 2);
		}
	}
}

//Start/replay of the game
function startGame() {
	floorPos_x = 0
	//Character status
	gameChar_x = width / 2;
	gameChar_y = floorPos_y;
	//Character set to default
	isLeft, isRight, isFalling, isPlummeting, isJumping = false;
	jumpSpeed = 10;
	jumpHeight = 100;
	isFrozen = false;
	//Game Camera
	cameraPosX = 0;

	//Back ground set up
	//Canyons in array
	canyons = [{ x_pos: 200, y_pos: floorPos_y, width: 100 },
	{ x_pos: 900, y_pos: floorPos_y, width: 100 },
	{ x_pos: 1100, y_pos: floorPos_y, width: 100 }]

	//Trees in array
	trees_x = [100, 300, 700, 100, 1400];

	//Clouds in array
	clouds = [{ x_pos: 150, y_pos: 100, x_size: 180, y_size: 60 },
	{ x_pos: 600, y_pos: 100, x_size: 180, y_size: 60 },
	{ x_pos: 1450, y_pos: 100, x_size: 180, y_size: 60 }];

	//Mountain in array
	mountains = [{ x_pos: 500, y_pos: 250 },
	{ x_pos: 500, y_pos: 250 },
	{ x_pos: 500, y_pos: 250 }];

	//Flagpole
	flagpole = {
		isReached: false,
		x_pos: 1500
	}
}


function drawGameChar() {
	if (isLeft && (isFalling || isPlummeting)) {//the character jumping and facing the left side
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
	} else if (isRight && (isFalling || isPlummeting)) {//the character jumping facing the right side
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
	} else if (isFalling || isPlummeting) {//the character jumping facing front
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
}
