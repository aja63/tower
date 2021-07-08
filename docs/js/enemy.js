const mapConst = document.getElementById("map");
const map = mapConst.getContext("2d");
const txt = document.getElementById('debug');

export default class Enemy{
	constructor(x,y){
		this.size = 100;
		this.x = x;
		this.y = y;
		this.color = "red";
		this.speed = 20;
		
	}
	
	erase(){
		map.clearRect(this.x-2, this.y-52, this.size, this.size);
	}
	draw() {
		map.fillStyle = this.color;
		map.fillRect(this.x, this.y, this.size, this.size);
	}
	
	draw(){
		let xPath = [20,10,20,10,20,-40,-40]
		let yPath = [-50,20,0,-20,50,40,-40]
		map.beginPath();
		map.strokeStyle = this.color;
		for(let pen = 0; pen < xPath.length; pen++){
			map.lineTo(this.x,this.y);
			map.stroke()
			this.x += xPath[pen];
			this.y += yPath[pen];
		}
		map.closePath()
		map.stroke();
	}
	

	detectPlayer(player){
		if(this.x<player.x){
			this.erase();
			this.x+=this.speed;
			this.draw();
		}
		else{
			this.erase();
			this.x-=this.speed;
			this.draw();
		}
		
		if(this.y<player.y){
			this.erase();
			this.y+=this.speed;
			this.draw();
		}
		else{
			this.erase();
			this.y-=this.speed;
			this.draw();
		}
	}
	
	check(x,y){
		if(x>this.x && x<this.x+this.size && y>this.y && y<this.y+this.size){
			return(this);
		}else{
			return(false);
		}
	}
	
	
}