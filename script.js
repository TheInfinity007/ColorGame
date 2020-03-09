var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var reset = document.querySelector("#reset");
var mode = document.querySelectorAll(".mode");

init();

function init(){
	setupModeButtons();
	setupSquares();	
	resetContainer();
}

function setupModeButtons(){
	for(var i = 0; i < mode.length; i++)
	{
		mode[i].addEventListener("click", function(){
			mode[0].classList.remove("selected");
			mode[1].classList.remove("selected");
			mode[2].classList.remove("selected");
			this.classList.add("selected");

			if(this.textContent === "Easy"){
				numSquares = 3;
			}
			else if(this.textContent === "Medium"){
				numSquares = 6;
			}
			else{
				numSquares = 10;
				
			}
			resetContainer();
		});
	}
}

function setupSquares(){
	for(var i = 0; i < squares.length; i++)
	{
		//add click listener to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var  clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor)
			{
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				reset.textContent = "PLAY AGAIN?";
			}
			else
			{
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again!"; 
			}
		});
	}
}

function resetContainer(){
	reset.textContent = "NEW COLORS";
	//generate new colors
	colors = generateRandomColors(numSquares);
	//pick a  new random color  from array
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
	// change color of squares
	for(var i = 0; i < squares.length; i++)
	{
		if(colors[i])
		{
			squares[i].style.display = "block";	
			squares[i].style.backgroundColor = colors[i];	
		}
		else
		{
			squares[i].style.display = "none";
		}
		if(numSquares == 10)
		{
			squares[i].classList.add("square_hard");
			document.querySelector("#container").classList.add("container_hard");
		}
		else{
			squares[i].classList.remove("square_hard");
			document.querySelector("#container").classList.remove("container_hard");	
		}
	}
}

 
reset.addEventListener("click", function(){
	resetContainer();
});




function changeColors(color){
	for(var i = 0; i < squares.length; i++)
	{
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	var arr = [];
	for(var i = 0; i < num; i++)
	{
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	var r = Math.floor(Math.random()*255 + 1);
	var g = Math.floor(Math.random()*255 + 1);
	var b = Math.floor(Math.random()*255 + 1);
	var str = "rgb(" + r + ", " + g + ", " + b + ")";
	return str;
}