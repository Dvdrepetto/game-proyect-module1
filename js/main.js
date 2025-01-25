class Player {
    constructor() {
        this.width = 20;
        this.height = 20;
        this.xCoord = 0;
        this.yCoord = 0;

        this.playerElm = document.getElementById('player');
        this.draw();

    }
    draw() {
        this.playerElm.style.width = this.width + 'vw';
        this.playerElm.style.height = this.height + 'vh';
        this.playerElm.style.xCoord = this.xCoord + 'vw';
        this.playerElm.style.yCoord = this.yCoord + 'vh';
        this.playerElm.style.backgroundColor = "rgb(255, 202, 127)";

    }

}

class Ball {
    constructor() {

    }
}
const gameBoard = document.getElementById("game-area");

const player1 = new Player;
const player2 = new Player;
const player3 = new Player;
const player4 = new Player;