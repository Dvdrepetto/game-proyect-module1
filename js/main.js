class Player {
    constructor(width, height, xCoord, yCoord, id) {
        this.width = width ;
        this.height = height;
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.id = id;

        this.playerElm = document.getElementById(this.id);
        if(!this.playerElm){
            console.error(`element id "${this.id}" not found`);
        return;
        }
        this.draw();

    }
    draw() {
        this.playerElm.style.width = this.width + 'vw';
        this.playerElm.style.height = this.height + 'vh';
        this.playerElm.style.left = this.xCoord + 'vw';
        this.playerElm.style.bottom = this.yCoord + 'vh';
        this.playerElm.style.backgroundColor = "rgb(255, 202, 127)";

    }
    moveDown(){
        if(this.yCoord > 0){
            this.yCoord--;
            this.draw();
        }
    }
    moveUp(){
        if(this.yCoord < 100 - this.height){
            this.yCoord++;
            this.draw();
        }
    }
    moveRight() {
        if(this.xCoord < 100 - this.width){
            this.xCoord++;
            this.draw();
        }
    }
    moveLeft(){
        if(this.xCoord > 0){
            this.xCoord--;
            this.draw();
        }
    }

}

class Ball {
    constructor() {

    }
}
const gameBoard = document.getElementById("game-area");

const player = new Player(5,20,5,40, 'player')
const player2 = new Player(5,20,90,40, 'player2');
const player3 = new Player(20,5,40,5, 'player3');
const player4 = new Player(20,5,40,90, 'player4');

document.addEventListener('keydown',(e)=>{
    if(e.code === "ArrowUp"){
        player.moveUp();
        player2.moveUp();
        
    }else if(e.code === "ArrowDown"){
        player.moveDown();
        player2.moveDown();
    }else if(e.code === "ArrowLeft"){
        player3.moveLeft();
        player4.moveLeft();
    }else if(e.code === "ArrowRight"){
        player3.moveRight();
        player4.moveRight();
    }
});