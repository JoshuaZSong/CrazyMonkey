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

export { drawGameChar };
