
var canvas = new fabric.Canvas("c"), movable = true, time = 20, timer = document.getElementById("time"), timerEnd = false, win = false, timerInterval;

var random = function(min, max){
	return Math.floor(Math.random() * (max - min + 2)) + min;
}

var data = {
	ball: {
		x: 10,
		y: 10,
		img: ""
	},
	hole:{
		x: random(10, canvas.width-10),
		y: random(10, canvas.height-10),
		img: ""
	}
};

var drawB = function(){
	fabric.Image.fromURL("ball.png", function(Img){
		data.ball.img = Img;

		data.ball.img.scaleToWidth(20);
		data.ball.img.scaleToHeight(20);

		data.ball.img.set({
			top: data.ball.y,
			left: data.ball.x
		});
		canvas.add(data.ball.img);
	});
}
var drawH = function(){
	fabric.Image.fromURL("golf-h.png", function(get_Img){
		data.hole.img = get_Img;
	
		data.hole.img.scaleToWidth(20);
		data.hole.img.scaleToHeight(20);
	
		data.hole.img.set({
			top: data.hole.y,
			left: data.hole.x
		});
		console.log("hole")
		canvas.add(data.hole.img);
	});
}


var my_keydown = function(e){
	var k = e.keyCode;
	var steps = random(1, document.getElementById("in").value);
	console.log(steps);
	if(movable){
		switch(k){
			case 37:
				if(data.ball.x > steps){
					data.ball.x -= steps;
				}
				break;
			case 38:
				if(data.ball.y > steps){
					data.ball.y -= steps;
				}
				break;
			case 39:
				if(data.ball.x+steps < canvas.width){
					data.ball.x+=steps;
				}
				break;
			case 40:
				if(data.ball.y+steps < canvas.height){
					data.ball.y+=steps;
				}
				break;
			default:
				break;
		}
	}
	canvas.remove(data.ball.img);
	if(data.ball.x === data.hole.x && data.ball.y === data.hole.y){
		movable = false;
		if(timerEnd === false){
			clearInterval(timerInterval);
		}
	}else{
		drawB();
	}

	if(k === 83){
		timerInterval = setInterval(timerFunction, 1000);
	}
}

window.addEventListener("keydown", my_keydown);
drawB();
drawH();

var timerFunction = function(){
	if(time){
		time--;
		timer.innerHTML = time;
	}else{
		clearInterval(timerInterval);
		document.getElementById("hd3").innerHTML = "You Lost!";
		movable = false;
		timerEnd = true;
	}
}