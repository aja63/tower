const mapConst = document.getElementById("map");
const map = mapConst.getContext("2d");
const txt = document.getElementById('debug');

export default class Player{
	constructor(x,y){
		this.size = 110;
		this.x = x;
		this.y = y;
		this.speed = 5;
		this.color = "green";
		
		this.w = false;
		this.a = false;
		this.s = false;
		this.d = false;
		
		
		this.hp = 3;
	}
	erase(){
		map.clearRect(this.x-2, this.y-2, this.size, this.size);
	}
	draw() {
		let xPath = [12,-12,40, 40,-12,12,-40,-40]
		let yPath = [40,40,-12,12,-40,-40,12,-12]
		map.beginPath();
		map.strokeStyle = "blue";
		for(let pen = 0; pen < xPath.length; pen++){
			map.lineTo(this.x,this.y);
			map.stroke()
			this.x += xPath[pen];
			this.y += yPath[pen];
		}
		map.closePath()
		map.stroke();
	}

	

	moveUp() {
 		if(this.collision(this.x,this.y-this.speed,this.size, this.size) == false){ 
		this.y-=this.speed;}
	}
	moveDown(){
		if(this.collision(this.x,this.y+this.speed,this.size, this.size) == false){
		this.y+=this.speed;}
	}
	moveLeft(){
		if(this.collision(this.x-this.speed,this.y,this.size, this.size) == false){
		this.x-=this.speed;}
	}
	moveRight(){
		if(this.collision(this.x+this.speed,this.y,this.size, this.size) == false){
		this.x+=this.speed;}	
	}
	
	colorCheck(list){
		if (list[0] == "0" && list[1] == "0" && list[2] == "0"){return true};
		if (list[0] == "255" && list[1] == "0" && list[2] == "0"){
			this.hp = this.hp - 1;
			return false;
		}
		else{return true};
	}
	
	
	collision(x,y,w,h){
		let colorList = map.getImageData(x,y,w,h).data;
		for(let i=3; i<colorList.length;i+=4){
			if(colorList[i] != 0){
				let colorTemp = [];
				for(y=3;y!=0;y--){
					colorTemp.push(colorList[i-y].toString());
				}
				let colObject = this.colorCheck(colorTemp);
				return colObject;
			}
			
		}
		return false;
	}
}