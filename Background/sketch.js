/*
Author: Joshua Song

The Game Project

2b - using variables

*/

var floorPos_y;

var gameChar_x;
var gameChar_y;

var treePos_x;
var treePos_y;

var canyon;
var collectable;

var mountain;
var cloud;


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = 432; //NB. we are now using a variable for the floor position

	//NB. We are now using the built in variables height and width
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	treePos_x = width/2;
	treePos_y = height/2;

	canyon = {
		x_pos: 100, 
		width: 432, 
	}

	collectable = {
		x_pos: 125, 
		y_pos: 380, 
		size: 50
	}

	mountain = {
		x_pos: 500, 
		y_pos: 250, 
	}

	cloud = {
		x_pos: 200, 
		y_pos: 100, 
		x_size: 180,
		y_size: 60
	}

	cloud2 = {
		x_pos: 800,
		y_pos: 70, 
	}
}

function draw()
{
	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, width - floorPos_y); //draw some green ground

	//draw a canyon
	fill(20);
	rect(canyon.x_pos,canyon.width, 50 ,width - floorPos_y)

	// a mountain in the distance
	noStroke();
	fill(100,100,30,100);
	triangle(
		mountain.x_pos - 200,mountain.y_pos + 182,
		mountain.x_pos,mountain.y_pos,
		mountain.x_pos + 100,mountain.y_pos + 182);
	fill(100,100,30,100);
	triangle(
		mountain.x_pos,mountain.y_pos + 182,
		mountain.x_pos + 200,mountain.y_pos,
		mountain.x_pos + 330,mountain.y_pos + 182);
	fill(100,100,30);
	triangle(
		mountain.x_pos -150,mountain.y_pos + 182,
		mountain.x_pos + 100,mountain.y_pos - 70,
		mountain.x_pos + 300,mountain.y_pos + 182);

	//cloud in the sky
	noStroke();
	fill(0,0,0);
	ellipse(
		cloud.x_pos,cloud.y_pos,
		cloud.x_size,cloud.y_size);
	ellipse(
		cloud.x_pos - 90,cloud.y_pos + 10,
		cloud.x_size - 40,cloud.y_size - 20);
	ellipse(
		cloud.x_pos + 120,cloud.y_pos + 10,
		cloud.x_size - 40,cloud.y_size - 20);
	//It comes with a lighting, 
	//the lighting is falling and if the charactor touch it,
	//the charactor will lose a heart(life)
	noStroke();
	fill(255,255,0);
	triangle(205,150,190,180,200,175);
	triangle(200,175,210,165,195,210);

	//on more cloud in the sky
	
	noStroke();
	fill(0,0,0);
	ellipse(
		cloud2.x_pos,cloud2.y_pos,
		cloud.x_size,cloud.y_size);
	ellipse(
		cloud2.x_pos - 90,cloud2.y_pos + 10,
		cloud.x_size - 40,cloud.y_size - 20);
	ellipse(
		cloud2.x_pos + 120,cloud2.y_pos + 10,
		cloud.x_size - 40,cloud.y_size - 20);

	//draw a tree
	noStroke();
	fill(100,50,40);
	rect(treePos_x,treePos_y, height - treePos_x ,floorPos_y - treePos_y);
	fill(80,90,30);
	ellipse(treePos_x + 40,treePos_y + 20,180,60);
	ellipse(treePos_x + 40,treePos_y - 20,160,50);
	ellipse(treePos_x + 40,treePos_y - 50,120,40);

	//draw collectable item 
	noStroke();
	fill(250,250,0);
	ellipse(collectable.x_pos,collectable.y_pos,20,40);
	fill(220,220,140);
	ellipse(collectable.x_pos + 5 ,collectable.y_pos,10,20);


	/**
	 * The charactor 
	 * In front of every thing
	 */
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

function mousePressed()
{
	gameChar_x = mouseX;
	gameChar_y = mouseY;

}
