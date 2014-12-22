var arrow;
var score = 0;
var timer = 15;
lastArrow = null;
lastR = null;

function generateRandomArrow()
{
	arrow = Math.floor((Math.random()*4)+1);
	displayArrow(arrow);
	lastArrow = arrow;
}

function displayArrow(n)
{
	var img = document.getElementById("image");

	// if same direction as last time, choose other color
	if(lastArrow == n)
	{
		if(lastR == 0) 
			r = 1;
		else
			r = 0;
	}
	else // otherwise, choose a random color
		var r = Math.floor(Math.random()*2);

	if(r == 0)
		img.src="images/arrow" + n + ".png";
	else // (r == 1)
		img.src="images/redarrow" + n + ".png";

	lastR = r;
}

function processKeyPress(n)
{
	if(timer > 0)
	{
		if(arrow == n)
		{
			score++;
			generateRandomArrow();
		}
		else
		{
			score--;
		}
	}
	displayScore();
}

function processUp()
{
	processKeyPress(1);
}

function processRight()
{
	processKeyPress(2);
}

function processDown()
{
	processKeyPress(3);
}

function processLeft()
{
	processKeyPress(4);
}

function displayScore()
{
	scoreDiv.innerHTML = "SCORE: "+ score;
}

function displayTime()
{
	timerDiv.innerHTML = "TIME: " + timer;
}

function play()
{
	displayScore();
	displayTime();
	generateRandomArrow();
	setInterval(function countdown()
	{
		if(timer > 0)
    		timer -= 1;
    	displayTime();
	}, 1000);
}
play();


$(document).keydown(function(e){
	var key = e.which;
	if(key == "37") processLeft();
	else if(key == "38") processUp();
	else if(key == "39") processRight();
	else if(key == "40") processDown();
})