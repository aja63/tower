/*  function fireBullet(event){
	 let endPoint = getMousePosition(event);
	 let path = calcPath(endPoint, player.x+25, player.y+25);
	 
	 	 for(x=1;x<path.length;x++){
			let col = colorCheck([path[x][0], path[x][1], 10, 10]); 
			if(col != true){
				map.fillStyle = "red";
				map.fillRect(path[x][0], path[x][1], 10, 10);
			}
	 } 
	setTimeout(function(){
	for(n=1;n<path.length;n++){
		let col = colorCheck([path[n][0], path[n][1], 10, 10]);
		map.clearRect(path[n][0], path[n][1], 10, 10);
		};
	}, 250); 
	
 	
}
 
 
 function getMousePosition(mousePos) {
	let bind = document.getElementById("map").getBoundingClientRect();
    let x = Math.floor(mousePos.clientX - bind.left);
    let y = Math.floor(mousePos.clientY - bind.top);
	return [x,y];
}

function calcPath(endPoint,x,y){
	let my = endPoint[1]-y;
	let mx = endPoint[0]-x;
	let m = my/mx;
	let b = y-m*x;
	let path = [];
	
	let n = 4;
	while(n < 100){
		let xPoint = Math.round(x+(n/100.00)*(endPoint[0]-x));
		let yPoint = Math.round(m*xPoint+b);
		n++;
		path.push([xPoint, yPoint])
		
	}
	
	return path;
} */

const mapConst = document.getElementById("map");
const map = mapConst.getContext("2d");
const txt = document.getElementById("debug");



export function animTest(pos){
	let posList = getMousePos(pos.clientX, pos.clientY);
	let m = getSlope(posList);
	let b = (player.y+(player.size/2)) - m * (player.x+(player.size/2));
	let line = getLine(posList, m, b);
	fire(line);
}

export function getMousePos(x, y){
	let box = mapConst.getBoundingClientRect();
	let xPos = x-box;
	let yPos = y-box;
	let posList = [x, y];
	return posList;
}

export function getSlope(posList){
	let my = posList[1]-(player.y+(player.size/2));
	let mx = posList[0]-(player.x+(player.size/2));
	let m = my/mx;
	return m;
}

export function getLine(posList, m, b){
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

export function fire(line){
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

export function colorCheck(list,x,y,w,h){
		if (list[0] == "0" && list[1] == "0" && list[2] == "0"){
			destroy(x,y,w,h);
			return true}
		else{return true};
	}
	
	
export function collision(x,y,w,h){
		let colorList = map.getImageData(x,y,w,h).data;
		for(let i=3; i<colorList.length;i+=4){
			if(colorList[i] != 0){
				let colorTemp = [];
				for(y=3;y!=0;y--){
					colorTemp.push(colorList[i-y].toString());
				}
				let colObject = colorCheck(colorTemp,x,y,w,h);
				return colObject;
			}
			
		}
		return false;
	}

export function destroy(x,y,w,h){
	map.clearRect(x,y,w,h)
}
