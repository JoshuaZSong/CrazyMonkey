/*
Author: Zihao Song
The Game Project
Final
Multiple interactables
*/

//import { drawGameChar } from './character.js';
//Background mountain Canyon Trees plamtforms
let floorPos_y, floorPos_x;
let mountains, canyons, trees_x, clouds, plantforms;
//Collectable
let collectables;
//Character
let gameChar_x, gameChar_y, gameChar_width, gameChar_world_x, fallingSpeed, lives, jumpHeight, isDead;
//Charactoer status
let isLeft, isRight, isFalling, isPlummeting, isJumping, isFrozen;
//enemy
let enemies;
//Game status 
let currentlevel,cameraPosX, gameScore, flagpole;
//Game sound
let jumpSound, completeSound, hascompleteSoundPlayed, collectSound1, collectSound2, collectSounds;
let failSound1, failSound2, failSounds, gameOverSound, hasgoSoundPlayed;

function preload() {
	setUpSoundFiles();
}

function setup() {
	createCanvas(1024, 576);
	floorPos_y = height * 3 / 4;
	gameScore = 0;
	lives = 3;
	currentlevel = 0;

	collectables = [{ x_pos: 100, y_pos: 350, size: 50, isFound: false },
	{ x_pos: 950, y_pos: 350, size: 50, isFound: false },
	{ x_pos: 1150, y_pos: 350, size: 50, isFound: false }]

	startLevel(currentlevel);
}

function draw() {
	//FIll the background with blue sky
	background(100, 155, 255);
	//Draw green ground
	drawGround();

	//Make the background "moving" following the camera
	push();
	translate(cameraPosX, 0);//set up the initial point

	//Draw clouds, muntains, trees, canyons, plantforms, flagpole,Collectable coins
	drawCloud();
	drawMountain();
	drawTree();
	drawCanyon();
	drawPlatform();
	drawFlagpole();
	drawCollectable()
	drawEnemies();
	pop();

	//The game character
	drawGameChar();

	//Score Table at left-top corner.
	drawScoreTable(gameScore);
	drawlife(lives)
	checkFlagpole();



	//The opposite position change(opposite to the background)
	if (isFrozen == false) {
		if (isLeft == true) {//when going left
			cameraPosX += 5;
		} else if (isRight == true) {//when going right
			cameraPosX -= 5;
		}
		if (isJumping == true) {//when jumping
			gameChar_y -= jumpHeight;
			isPlummeting = false;
		}
	}

	//Gravity
	if (gameChar_y < floorPos_y) {
		let isContact = false;
		for (let i = 0; i < plantforms.length; i++) {
			if (plantforms[i].checkContact(gameChar_world_x, gameChar_y, gameChar_width + 10)) {
				isContact = true;
				break;
			}
		}
		if (!isContact) {
			isFalling = true
			gameChar_y += fallingSpeed;//character's fallign speed
		}
		if (gameChar_y < (floorPos_y - jumpHeight)) {//Avoid double jumping
			isJumping = false;
		}
	} else if (gameChar_y == floorPos_y) {
		isPlummeting = false;
		isFalling = false;
	} else if (gameChar_y > floorPos_y) {
		isPlummeting = true;
		isFalling = false;
		if (!isJumping) {
			isFrozen = true;
		}
		if (gameChar_y > height) {
			checkPlayerDie();
		}
	}

	gameChar_world_x = gameChar_x - cameraPosX;

	if (isJumping) {
		jumpSound.play();
	}

	if (isDead) {
		fill(255);
		stroke(0)
		text("Game Over!", width / 2, height / 2);
	}
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

function creatPlantforms(x, y, length) {
	let p = {
		x: x,
		y: y,
		length: length,
		draw: function () {
			fill(0, 155, 0);
			rect(this.x, this.y, this.length, 20)
		},
		checkContact: function (gc_x, gc_y, gc_w) {
			if (gc_x + gc_w > this.x && gc_x + gc_w < this.x + this.length) {
				let d = this.y - gc_y
				if (d >= 0 && d < 10) {
					return true;
				}
			}
			return false;
		}
	}
	return p;
}

function drawPlatform() {
	for (let i = 0; i < plantforms.length; i++) {
		plantforms[i].draw();
	}
};

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

//Enemies
function Enemy(x, y, range) {
	this.x = x;
	this.y = y;
	this.range = range;

	this.currentX = x;
	this.inc = 1

	this.update = function () {
		if (!isDead) {
			this.currentX += this.inc
			if (this.currentX >= this.x + this.range) {
				this.inc = -1;
			} else if (this.currentX < this.x) {
				this.inc = 1;
			}
		}

	}

	this.draw = function () {
		this.update();
		for (let i = 0; i < 40; i++) {
			noFill();
			stroke(random(0, 255));
			ellipse(this.currentX, this.y, i, i)
		}
	}

	this.checkContact = function (gc_x, gc_y) {
		let d = dist(gc_x, gc_y, this.currentX, this.y);
		if (d < 80) {
			return true;
		}
		return false;
	}
}

function drawEnemies() {
	for (let i = 0; i < enemies.length; i++) {
		enemies[i].draw();
		let isContact = enemies[i].checkContact(gameChar_world_x + gameChar_width, gameChar_y + gameChar_width)

		if (isContact) {
			checkPlayerDie();
		}
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
		playRandomSound(collectSounds)
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
		if (!hascompleteSoundPlayed) {
			completeSound.play();
			hascompleteSoundPlayed = true;
		}
		if (!completeSound.isPlaying() && hascompleteSoundPlayed) {
			completeSound.stop();
		}
	} else {
		flagpole.isReached = false;
	}
}

function checkPlayerDie() {
	console.log('checkPlayerDie')
	if (lives > 1) {
		lives--;
		startGame();
		playRandomSound(failSounds);
		console.log('failSounds')
	} else {
		lives--;
		isDead = true;
		isFrozen = true;
		console.log('Over')
		if (!hasgoSoundPlayed) {
			gameOverSound.play();
			hasgoSoundPlayed = true;
		}
		if (!gameOverSound.isPlaying() && hasgoSoundPlayed) {
			gameOverSound.stop();
		}
	}
}

function setUpSoundFiles() {
	soundFormats('mp3', 'wav');
	jumpSound = loadSound('assets/jumpSound.mp3');
	jumpSound.setVolume(0.1);
	completeSound = loadSound('assets/completeSound.mp3');
	completeSound.setVolume(0.1);
	completeSound.rate(1);
	collectSound1 = loadSound('assets/collectSound1.mp3');
	collectSound1.setVolume(0.1);
	collectSound2 = loadSound('assets/collectSound2.wav');
	collectSound2.setVolume(0.1);
	collectSounds = [collectSound1, collectSound2];
	failSound1 = loadSound('assets/failSound1.mp3');
	failSound1.rate(2);
	failSound2 = loadSound('assets/failSound2.mp3');
	failSound2.rate(2);
	failSounds = [failSound1, failSound2];
	gameOverSound = loadSound('assets/gameOverSound.mp3');
	gameOverSound.setVolume(0.1);
}

function playRandomSound(sounds) {
	let randomIndex = floor(random(sounds.length))
	sounds[randomIndex].play();
}

//Start of each game level
function startLevel(currentlevel){
	startGame(currentlevel);
}

//Start/replay of the game
function startGame(currentlevel) {
	floorPos_x = 0
	//Character status
	gameChar_x = width / 2;
	gameChar_y = floorPos_y;
	gameChar_width = 40;
	fallingSpeed = 4;
	//Character set to default
	isLeft, isRight, isFalling, isPlummeting, isJumping = false;
	jumpHeight = 100;
	isFrozen = false;
	//Game Camera
	cameraPosX = 0;
	hascompleteSoundPlayed = false;
	hasGameOverSoundPlayed = false;

	//Back ground set up
	//Mountains in array
	mountains = [{ x_pos: 500, y_pos: 250 },
	{ x_pos: 500, y_pos: 250 },
	{ x_pos: 500, y_pos: 250 }];

	//Canyons in array
	canyons = [{ x_pos: 200, y_pos: floorPos_y, width: 150 },
	{ x_pos: 900, y_pos: floorPos_y, width: 150 },
	{ x_pos: 1500, y_pos: floorPos_y, width: 150 }]

	//Trees in array
	trees_x = [100, 300, 700, 100, 1400];

	//Clouds in array
	clouds = [{ x_pos: 150, y_pos: 100, x_size: 180, y_size: 60 },
	{ x_pos: 600, y_pos: 100, x_size: 180, y_size: 60 },
	{ x_pos: 1450, y_pos: 100, x_size: 180, y_size: 60 }];

	//Plantforms in array
	plantforms = [];
	canyons.forEach((canyon) => {
		plantforms.push(creatPlantforms(canyon.x_pos + 35, canyon.y_pos - 125, canyon.width - 70))
	})

	//Enemies
	enemies = [];
	canyons.forEach((canyon) => {
		enemies.push(new Enemy(canyon.x_pos - canyon.width, floorPos_y - 30, canyon.x_pos + canyon.width))
	})


	//Flagpole
	flagpole = {
		isReached: false,
		x_pos: 2000
	}
}


function drawGameChar() {
	if (isLeft && (isFalling || isPlummeting)) {//the character jumping and facing the left side
		//Body
		fill(139, 69, 19); //brown
		stroke(0);
		strokeWeight(3);
		ellipse(gameChar_x + gameChar_width, gameChar_y - 50, gameChar_width * 2, gameChar_width * 2);
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
		ellipse(gameChar_x + gameChar_width + 10, gameChar_y - gameChar_width - 20, gameChar_width * 2, gameChar_width * 2);
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
		ellipse(gameChar_x + gameChar_width, gameChar_y - 50, gameChar_width * 2, gameChar_width * 2);
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
		ellipse(gameChar_x + gameChar_width, gameChar_y - 50, gameChar_width * 2, gameChar_width * 2);
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
		ellipse(gameChar_x + gameChar_width, gameChar_y - 60, gameChar_width * 2, gameChar_width * 2);
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
		ellipse(gameChar_x + gameChar_width, gameChar_y - 50, gameChar_width * 2, gameChar_width * 2);
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
