const mapConst = document.getElementById("map");
const map = mapConst.getContext("2d");
const txt = document.getElementById("debug");

import Player from "./player.js";
import Enemy from "./enemy.js";
import * as attacks from "./attacks.js";
import Block from "./block.js";


const player = new Player(1000, 500);
player.draw();





const enemy1 = new Enemy(100,100);
enemy1.draw();
const enemy1MoveStop = setInterval(function(){enemy1.detectPlayer(player)}, 100);

const enemy2 = new Enemy(1700,100);
enemy2.draw();
const enemy2MoveStop = setInterval(function(){enemy2.detectPlayer(player)}, 100);

const enemy3 = new Enemy(700,100);
enemy3.draw();
const enemy3MoveStop = setInterval(function(){enemy3.detectPlayer(player)}, 100);

const enemyList = [enemy1, enemy2, enemy3];

/*

function rand(max,min){
	return Math.floor(Math.random()*max+min);
}



for (let i = 0; i < 5; i++){
	let block = new Block((i+1)*200,(i+1)*200,(i+1)*200,(i+1)*200);
	txt.innerHTML +=block.x;
	txt.innerHTML +=block.y;
	block.draw;
} */

document.addEventListener("keydown", input);
document.addEventListener("keyup", inputStop);

function input(key){
	if(key.keyCode == 87){player.w = true};
	if(key.keyCode == 65){player.a = true};
	if(key.keyCode == 83){player.s = true};
	if(key.keyCode == 68){player.d = true};
}
function inputStop(key){
	if(key.keyCode == 87){player.w = false};
	if(key.keyCode == 65){player.a = false};
	if(key.keyCode == 83){player.s = false};
	if(key.keyCode == 68){player.d = false};
}

function move(){
	window.requestAnimationFrame(move);
	if(player.w == true){player.erase(); player.moveUp(); player.draw()};
	if(player.a == true){player.erase(); player.moveLeft(); player.draw()};
	if(player.s == true){player.erase(); player.moveDown(); player.draw()};
	if(player.d == true){player.erase(); player.moveRight(); player.draw()};
}
window.requestAnimationFrame(move);






window.addEventListener("mousedown", LeftClick);

function LeftClick(pos){
	let posList = getMousePos(pos.clientX, pos.clientY);
	let m = getSlope(posList);
	let b = (player.y+(player.size/2)) - m * (player.x+(player.size/2));
	let line = getLine(posList, m, b);
	fire(line);
}

function getMousePos(x, y){
	let box = mapConst.getBoundingClientRect();
	let xPos = x-box;
	let yPos = y-box;
	let posList = [x, y];
	return posList;
}

function getSlope(posList){
	let my = posList[1]-(player.y+(player.size/2));
	let mx = posList[0]-(player.x+(player.size/2));
	let m = my/mx;
	return m;
}

function getLine(posList, m, b){
	let line = [];
	let n = 1;
	while(n < 100){
		let xpoint = Math.round((player.x+(player.size/2))+(n/100.00)*(posList[0]-(player.x+(player.size/2))));
		let ypoint = Math.round(m*xpoint+b);
		n++;
		line.push([xpoint, ypoint]);
	}
	return line;
}

function fire(line){
	let clearList = [];
	for(let z=5; z<line.length; z++){
		map.fillStyle = "purple";
		if(collision(line[z][0], line[z][1], 10, 10) == false){
			clearList.push([line[z][0], line[z][1]])
			map.fillRect(line[z][0], line[z][1], 10, 10);
		}
	}
	for(let z=0; z<clearList.length; z++){
		setTimeout(function(){
			map.clearRect(clearList[z][0], clearList[z][1], 10, 10);
		}, 200)
	}
}

function findEnemy(x,y){
	for (let i = 0; i < enemyList.length; i++){
		let checkEnemy = enemyList[i].check(x,y);
		if(checkEnemy != false){
			switch(i){
				case 0: clearInterval(enemy1MoveStop); break;
				case 1: clearInterval(enemy2MoveStop); break;
				case 2: clearInterval(enemy3MoveStop); break;
			}
			enemyList[i].erase();
		}
	}
}



function colorCheck(list,x,y,w,h){
		if (list[0] == "255" && list[1] == "0" && list[2] == "0"){
			findEnemy(x,y);
			return true}
		else{return true};
	}
	
	
function collision(x,y,w,h){
		let colorList = map.getImageData(x,y,w,h).data;
		for(let i=3; i<colorList.length;i+=4){
			if(colorList[i] != 0){
				let colorTemp = [];
				for(let n=3;n!=0;n--){
					colorTemp.push(colorList[i-n].toString());
				}
				let colObject = colorCheck(colorTemp,x,y,w,h);
				return colObject;
			}
			
		}
		return false;
	}

function destroy(x,y,w,h){
	map.clearRect(x,y,w,h)
}


const playerDead = setInterval(function(){if(player.hp < 0){ clearInterval(playerDead); alert('YOU ARE DEAD'); location.reload()}},1);


