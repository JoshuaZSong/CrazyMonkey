/*
Author: Joshua Song
The Game Project
Task 5
Multiple interactables
*/

//Background
var floorPos_y;
var floorPos_x;
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
var isFacingLeft;
var lives;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var isJumping;
var jumpHeight;
var isFrozen;
//Moving camera
var cameraPosX;
//Game Scores
var gameScore;
//Flagpole
var flagpole;

function setup() {
	createCanvas(1024, 576);
	floorPos_y = height * 3 / 4;
	gameScore = 0;
	lives = 3;

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

	startGame();
}

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
	drawlife(lives)

	checkPlayerDie();

	checkFlagpole();

	//The opposite position change(opposite to the background)
	if (isFrozen == false) {
		if (isLeft == true) {//when going left
			cameraPosX += 5;
			floorPos_x -= 5
			//gameChar_x -=5;
		} else if (isRight == true) {//when going right
			cameraPosX -= 5;
			floorPos_x += 5;
			//gameChar_x +=5;
		} else if (isJumping == true) {//when jumping
			gameChar_y -= jumpHeight;
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
			console.log("Frozen by Gravity" + isPlummeting + isFalling + isFrozen + (gameChar_x + 30) + "=" + (cameraPosX + 500) + ","
				+ (gameChar_x + 45) + "=" + (cameraPosX + 600))
		}
	}

	gameChar_world_x = gameChar_x - cameraPosX;
}//End of draw function

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
	if (isFrozen == false) {
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
		console.log("isRight is " + isRight
		);
	} else if (keyCode == 38 || keyCode == 32) {
		isJumping = false;
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
	if (gameChar_x + 35 >= t_canyon.x_pos + cameraPosX
		&& gameChar_x + 40 <= t_canyon.x_pos + t_canyon.width + cameraPosX) {
		console.log("canyon is " + isPlummeting)
		if (!isFalling) {
			gameChar_y += 4;
		}
	}
}

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

function checkFlagpole() {
	var d = abs(gameChar_world_x - flagpole.x_pos)
	if (d <= 55) {
		flagpole.isReached = true;
		isFrozen = true
		console.log("Frozen by Wining")
	} else {
		flagpole.isReached = false;
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
		console.log("Level Completed!")
	} else {

		rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
	}

}

function checkPlayerDie() {
	if (gameChar_y > height) {
		if (lives > 1) {
			lives--;
			console.log("Live is " + lives)
			startGame();
		} else {
			lives--;
			text("Game Over!", width / 2, height / 2);
			console.log("Game over")
		}
	}
}

function startGame() {
	floorPos_x = 0
	gameChar_x = width / 6;
	gameChar_y = floorPos_y;
	isFacingLeft = false;
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
	isJumping = false;
	jumpHeight = 100;
	isFrozen = false;
	cameraPosX = 0;

	canyons = [
		{
			x_pos: 500,
			y_pos: floorPos_y,
			width: 100
		},
		{
			x_pos: 900,
			y_pos: floorPos_y,
			width: 100
		},
		{
			x_pos: 1100,
			y_pos: floorPos_y,
			width: 100
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
		isReached: false,
		x_pos: 1500
	}
}


function drawGameChar() {
	push();//to make the character not moving
	if (isLeft && (isFalling || isPlummeting)) {
		drawWholeBody(gameChar_x + 40, gameChar_y - 50, true); // Left + Falling
	  } else if (isRight && (isFalling || isPlummeting)) {
		drawWholeBody(gameChar_x + 50, gameChar_y - 60, false); // Right + Falling
	  } else if (isLeft) {
		drawWholeBody(gameChar_x + 40, gameChar_y - 50, true); // Left + Walking
	  } else if (isRight) {
		drawWholeBody(gameChar_x + 40, gameChar_y - 50, false); // Right + Walking
	  } else if (isFalling || isPlummeting) {
		drawWholeBody(gameChar_x + 40, gameChar_y - 60, false); // Falling front
	  } else {
		drawWholeBody(gameChar_x + 40, gameChar_y - 50, false); // Standing front
	  }
	pop();
}


//Draw body of the character
function drawBody(x, y) {
	fill(139, 69, 19);
	stroke(0);
	strokeWeight(3);
	ellipse(x, y, 80, 80);
}

//Draw arms and legs of the character
function drawlimbs(x, y, isFacingLeft) {
	strokeWeight(4);
	// Arms
	if (facingLeft) {
		line(x + 50, y - 40, x + 60, y); // left arm
		line(x + 80, y - 40, x + 90, y); // right arm
	} else {
		line(x + 30, y - 40, x + 10, y); // left arm
		line(x + 70, y - 40, x + 60, y); // right arm
	}
	// Legs
	line(x - 10, y + 30, x - legOffset, y + 50);  // Left leg
	line(x + 10, y + 30, x + legOffset, y + 50);  // Right leg
}

// Draw the face (head + features)
function drawFace(x, y) {
	strokeWeight(3);
	ellipse(x, y - 20, 55, 48); // head
	fill(225, 0, 0);
	strokeWeight(2);
	arc(x - 14, y - 33, 80, 50, radians(-2), radians(27)); // mouth
	arc(x, y - 20, 55, 48, radians(75), radians(167)); // mouth
	noStroke();
	fill(139, 69, 19);
	triangle(x, y - 21, x - 16, y - 14, x + 3, y - 14); // mouth bottom
	stroke(0);
	strokeWeight(2);
	line(x - 16, y - 14, x + 16, y - 15);  // teeth line
}

// Draw the teeth
function drawTeeth(x, y) {
	strokeWeight(1);
	fill(225, 0, 0);
	beginShape();
	vertex(x - 9, y - 23);
	vertex(x - 4, y - 10);
	vertex(x + 1, y - 24);
	vertex(x + 6, y - 10);
	vertex(x + 11, y - 24);
	vertex(x + 16, y - 10);
	vertex(x + 21, y - 24);
	endShape();
}

// Draw the eyes
function drawEyes(x, y) {
	stroke(240, 125, 0);
	strokeWeight(5);
	point(x + 10, y - 45);
	point(x - 10, y - 45);
}

// Draw the tail with a magic hand
function drawTailWithHand(x, y) {
	noFill();
	stroke(139, 69, 19);
	strokeWeight(7);
	line(x + 40, y - 20, x + 60, y); // Tail base line
	fill(255);
	stroke(0);
	strokeWeight(1);
	ellipse(x + 60, y + 10, 4, 8); // Magic hand start
	ellipse(x + 65, y + 5, 4, 8);  // Magic hand spread
	ellipse(x + 55, y + 5, 4, 8);  // Magic hand end
	ellipse(x + 60, y, 15, 10);    // Magic hand circular part
}