// A 2-player snake game built on HTML5 and JavaScript Canvas.
//
// Source code adapted from:
// http://thecodeplayer.com/walkthrough/html5-game-tutorial-make-a-snake-game-using-html5-canvas-jquery
//
// Raymond Xu
// DevFest 2015



	var canvas = $("#canvas")[0];
	var contex = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	
	var cell_width = 15;
	var blue_dir;
	var red_dir;
	var food;
	var bluesnake_array;
	var redsnake_array;
	var lastKey;
	var blueScore = 0;
	var redScore = 0;

	function init()
	{
		blue_dir = "right";
		red_dir = "left";
		create_snake();
		create_food();
		
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 60);
	}

	function create_snake()
	{
		var length = 15;
		bluesnake_array = [];
		for(var i = length-1; i>=0; i--)
			bluesnake_array.push({x: i, y: 4});
		redsnake_array = [];
		for(var i = length-1; i>=0; i--)
			redsnake_array.push({x: w/cell_width - i, y: h/cell_width - 5});
	}
	
	function create_food()
	{
		food = {
			x: Math.round(Math.random()*(w-cell_width)/cell_width), 
			y: Math.round(Math.random()*(h-cell_width)/cell_width), 
		};
	}
	
	function paint()
	{
		contex.fillStyle = "white";
		contex.fillRect(0, 0, w, h);
		contex.strokeStyle = "red";
		contex.strokeRect(0, 0, w, h);
		
		var bnx = bluesnake_array[0].x;
		var bny = bluesnake_array[0].y;
		var rnx = redsnake_array[0].x;
		var rny = redsnake_array[0].y;
		
		// Passive movement
		if(blue_dir == "right") bnx++;
		else if(blue_dir == "left") bnx--;
		else if(blue_dir == "up") bny--;
		else if(blue_dir == "down") bny++;

		if(red_dir == "right") rnx++;
		else if(red_dir == "left") rnx--;
		else if(red_dir == "up") rny--;
		else if(red_dir == "down") rny++;
		
		// Game over conditions
		if(lastKey == "blue")
		{
			if(bnx == -1 || bnx == w/cell_width || bny == -1 || bny == h/cell_width ||
				check_collision(bnx, bny, bluesnake_array) || check_collision(bnx, bny, redsnake_array))
			{
				redScore++;
				console.log("Red Wins! Red: " + redScore + " Blue: " + blueScore);
				bluesnake_array = [];
				redsnake_array = [];
				return;
			}
			if(rnx == -1 || rnx == w/cell_width || rny == -1 || rny == h/cell_width ||
				check_collision(rnx, rny, redsnake_array) || check_collision(rnx, rny, bluesnake_array))
			{
				blueScore++
				console.log("Blue Wins! Red: " + redScore + " Blue: " + blueScore);
				bluesnake_array = [];
				redsnake_array = [];
				return;
			}
		}

		else
		{
			if(rnx == -1 || rnx == w/cell_width || rny == -1 || rny == h/cell_width ||
				check_collision(rnx, rny, redsnake_array) || check_collision(rnx, rny, bluesnake_array))
			{
				blueScore++
				console.log("Blue Wins! Red: " + redScore + " Blue: " + blueScore);
				bluesnake_array = [];
				redsnake_array = [];
				return;
			}
			if(bnx == -1 || bnx == w/cell_width || bny == -1 || bny == h/cell_width ||
				check_collision(bnx, bny, bluesnake_array) || check_collision(bnx, bny, redsnake_array))
			{
				redScore++;
				console.log("Red Wins! Red: " + redScore + " Blue: " + blueScore);
				bluesnake_array = [];
				redsnake_array = [];
				return;
			}
		}
		

		// Eat food
		if(bnx == food.x && bny == food.y)
		{
			var btail = {x: bnx, y: bny};
			create_food();
		}
		else
		{
			var btail = bluesnake_array.pop();
			btail.x = bnx; btail.y = bny;
		}

		if(rnx == food.x && rny == food.y)
		{
			var rtail = {x: rnx, y: rny};
			create_food();
		}
		else
		{
			var rtail = redsnake_array.pop();
			rtail.x = rnx; rtail.y = rny;
		}


		bluesnake_array.unshift(btail); //puts back the tail as the first cell
		redsnake_array.unshift(rtail);

		// Paint
		for(var i = 0; i < bluesnake_array.length; i++)
		{
			var c = bluesnake_array[i];
			paint_bluesnake(c.x, c.y);
		}

		for(var i = 0; i < redsnake_array.length; i++)
		{
			var c = redsnake_array[i];
			paint_redsnake(c.x, c.y);
		}
		
		paint_food(food.x, food.y);
	}
	


	function paint_food(x, y)
	{
		contex.fillStyle = "green";
		contex.fillRect(x*cell_width, y*cell_width, cell_width, cell_width);
	}

	function paint_bluesnake(x, y)
	{
		contex.fillStyle = "blue";
		contex.fillRect(x*cell_width, y*cell_width, cell_width, cell_width);
	}

	function paint_redsnake(x, y)
	{
		contex.fillStyle = "red";
		contex.fillRect(x*cell_width, y*cell_width, cell_width, cell_width);
	}

	function check_collision(x, y, array)
	{
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}
	
	$(document).keydown(function(e){
		var key = e.which;
		if(key == "37" && blue_dir != "right")
		{
			blue_dir = "left";
			lastKey = "blue";
		}
		else if(key == "38" && blue_dir != "down")
		{
			blue_dir = "up";
			lastKey = "blue";
		}
		else if(key == "39" && blue_dir != "left")
		{
			blue_dir = "right";
			lastKey = "blue";
		}
		else if(key == "40" && blue_dir != "up")
		{
			blue_dir = "down";
			lastKey = "blue";
		}
		else if(key == "65" && red_dir != "right")
		{
			red_dir = "left";
			lastKey = "red";
		}
		else if(key == "87" && red_dir != "down")
		{
			red_dir = "up";
			lastKey = "red";
		}
		else if(key == "68" && red_dir != "left")
		{
			red_dir = "right";
			lastKey = "red";
		}
		else if(key == "83" && red_dir != "up")
		{
			red_dir = "down";
			lastKey = "red";
		}
	})	
