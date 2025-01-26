class Player {
    constructor(width, height, xCoord, yCoord, id) {
        this.width = width ;
        this.height = height;
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.id = id;

        this.playerElm = document.getElementById(this.id);
        this.draw();

    }
    draw() {
        const board = document.getElementById("board");
        const boardWidth = board.offsetWidth;
        const boardHeight = board.offsetHeight;
    
        const absoluteWidth = (this.width / 100) * boardWidth;
        const absoluteHeight = (this.height / 100) * boardHeight;
        const absoluteX = (this.xCoord / 100) * boardWidth;
        const absoluteY = (this.yCoord / 100) * boardHeight;
    
        this.playerElm.style.position = "absolute";
        this.playerElm.style.width = absoluteWidth + "px";
        this.playerElm.style.height = absoluteHeight + "px";
        this.playerElm.style.left = absoluteX + "px";
        this.playerElm.style.top = absoluteY + "px";
    }
    moveDown(){
        if(this.yCoord > 0){
            this.yCoord++;
            this.draw();
        }
    }
    moveUp(){
        if(this.yCoord < 100 - this.height){
            this.yCoord--;
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

const player = new Player(5,20,5,40, 'player');
const player2 = new Player(5,20,90,40, 'player2');
const player3 = new Player(20,5,40,5, 'player3');
const player4 = new Player(20,5,40,90, 'player4');

window.addEventListener("resize", () => {
    player.draw();
    player2.draw();
    player3.draw();
    player4.draw();
});

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