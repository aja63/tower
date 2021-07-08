const mapConst = document.getElementById("map");
const map = mapConst.getContext("2d");
const txt = document.getElementById('debug');

export default class Block{
	constructor(x,y,w,h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		
		this.color = "black";
	}
	
	draw(){
		map.fillStyle = this.color;
		map.fillRect(this.x,this.y,this.w,this.h);
	}
	
	
	check(){
		let x = this.x;
		let y = this.y;
		let w = this.w;
		let h = this.h;
		let checking = setInterval(function(){
			let map = document.getElementById("map").getContext("2d");
			let colorList = map.getImageData(x,y,w,h).data;
			for (let i=3; i<colorList.length;i+=4){
				if(colorList[i] == 0){
					map.clearRect(x,y,w,h)
					clearInterval(checking);
				}
			}
		},1)
	}
	
}