/*
Author： Joshua Song
The Game Project

Game character

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the different states of your game character.

Write the code so that your character appears inside the box for each
state.

*/

var gameChar_x = 0;
var gameChar_y = 0;

function setup()
{
	createCanvas(400, 600);
}

function draw()
{
	background(255);

	//Standing, facing frontwards

	// stroke(100);
	// noFill();
	// rect(20, 60, 50, 80);
	// noStroke();
	fill(0);
	text("1. standing front facing", 20, 160);

	gameChar_x = 45;
	gameChar_y = 137;
	//Add your code here ...
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



	//Jumping facing forwards
	// stroke(100);
	// noFill();
	// rect(220, 60, 50, 80);
	// noStroke();
	fill(0);
	text("2. jumping facing forwards", 220, 160);

	gameChar_x = 245;
	gameChar_y = 137;
	var jumpingVar = 10;
	//Add your code here ...
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
	line(gameChar_x, gameChar_y - 50 - jumpingVar, 
		gameChar_x - 5, gameChar_y - 20);	
	
	fill(255);
	stroke(0);
	strokeWeight(0.1);
	ellipse(gameChar_x - 5, gameChar_y - 20, 15, 10);

	/**Walking, turned left
	 * 
	 * 
	 * */
	// stroke(100);
	// noFill();
	// rect(20, 260, 50, 80);
	// noStroke();
	fill(0);
	text("3. Walking left", 20, 360);

	gameChar_x = 45;
	gameChar_y = 337;
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
	// line(gameChar_x + 4, gameChar_y - 30, gameChar_x - 15, gameChar_y - 15);//right leg
	// line(gameChar_x - 15, gameChar_y - 15, gameChar_x - 10, gameChar_y + 10);//right leg    
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



	//Walking, turned right
	// stroke(100);
	// noFill();
	// rect(220, 260, 50, 80);
	// noStroke();
	fill(0);
	text("4. Walking right", 220, 360);

	gameChar_x = 245;
	gameChar_y = 337;
	//Add your code here ...
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
	fill(225,0,0); 
	strokeWeight(2);
	arc(gameChar_x + 41, gameChar_y - 63, 80, 50, radians(-2), radians(27))// mouth
	arc(gameChar_x + 65, gameChar_y - 70, 55, 48, radians(75) ,radians(167))// mouth
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
	fill(225,0,0); 
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

	//Jumping right
	// stroke(100);
	// noFill();
	// rect(20, 460, 50, 80);
	// noStroke();
	fill(0);
	text("5. Jumping to the right", 20, 560);

	gameChar_x = 45;
	gameChar_y = 537;
	//Add your code here ...
	fill(139, 69, 19); // brown
	stroke(0);
	strokeWeight(3);
	ellipse(gameChar_x + 40 + jumpingVar, gameChar_y - 50 - jumpingVar, 80, 80); //body

	//arms and legs
	strokeWeight(4);
	line(gameChar_x + 30 + jumpingVar, gameChar_y - 30 - jumpingVar, gameChar_x + 30, gameChar_y );//left arm
	line(gameChar_x + 60 + jumpingVar, gameChar_y - 30 - jumpingVar, gameChar_x + 60, gameChar_y );//right arm
	line(gameChar_x + 4 + jumpingVar, gameChar_y - 30 - jumpingVar, gameChar_x + 2, gameChar_y );//right leg
	line(gameChar_x + 40 + jumpingVar, gameChar_y - 19, gameChar_x + 45, gameChar_y );//left leg  


	// face
	strokeWeight(3);
	ellipse(gameChar_x + 65, gameChar_y - 70, 55, 48); //head
	fill(225,0,0); 
	strokeWeight(2);
	arc(gameChar_x + 41, gameChar_y - 63, 80, 50, radians(-2), radians(27))// mouth
	arc(gameChar_x + 65, gameChar_y - 70, 55, 48, radians(75) ,radians(167))// mouth
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
	fill(225,0,0); 
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
	line(gameChar_x + jumpingVar, gameChar_y - 50 - jumpingVar, 
		gameChar_x - 5, gameChar_y - 20);	
	
	fill(255);
	stroke(0);
	strokeWeight(0.1);
	ellipse(gameChar_x - 5, gameChar_y - 20, 15, 10);

	//Jumping to the left
	// stroke(100);
	// noFill();
	// rect(220, 460, 50, 80);
	// noStroke();
	fill(0);
	text("6. Jumping to the left", 220, 560);

	gameChar_x = 245;
	gameChar_y = 537;
	moveLeft = -35;
	//Add your code here ...
	fill(139, 69, 19); // brown
	stroke(0);
	strokeWeight(3);
	ellipse(gameChar_x + 40 + jumpingVar, gameChar_y - 50 - jumpingVar, 80, 80); //body

	//arms and legs
	strokeWeight(4);
	line(gameChar_x + 40 + jumpingVar , gameChar_y - 30 - jumpingVar, gameChar_x + 60, gameChar_y );//left arm
	line(gameChar_x + 70 + jumpingVar, gameChar_y - 30 - jumpingVar, gameChar_x + 90, gameChar_y );//right arm
	line(gameChar_x + 14 + jumpingVar, gameChar_y - 30 - jumpingVar, gameChar_x + 32, gameChar_y );//right leg
	line(gameChar_x + 50 + jumpingVar, gameChar_y - 19, gameChar_x + 65, gameChar_y );//left leg  


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
	line(gameChar_x + 90, gameChar_y - 50 - jumpingVar, 
		gameChar_x + 105, gameChar_y - 20);	
	
	fill(255);
	stroke(0);
	strokeWeight(1);
	ellipse(gameChar_x + 105, gameChar_y - 20, 15, 10);
}
