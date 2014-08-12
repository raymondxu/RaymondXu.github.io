var arrow;
var score = 0;
var timer = 15;

function generateRandomArrow()
{
	arrow = Math.floor((Math.random()*4)+1);
	console.log(arrow);
	displayArrow(arrow);
}

function displayArrow(n)
{
	var img = document.getElementById("image");
	var r = Math.floor(Math.random()*2);
	if(r == 0)
		img.src="images/arrow" + n + ".png";
	else
		img.src="images/redarrow" + n + ".png";
	return false;
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
	scoreDiv.innerHTML = "score: "+ score;
}

function displayTime()
{
	timerDiv.innerHTML = "time: " + timer;
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