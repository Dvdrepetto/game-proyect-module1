class Player {
    constructor(width, height, xCoord, yCoord, id, speed) {
        this.width = width;
        this.height = height;
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.id = id;
        this.speed = speed;

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

        this.playerElm.style.backgroundColor = "rgb(255, 202, 127)";
        this.playerElm.style.border = "2px solid black";
    }

    moveDown() {
        const board = document.getElementById("board");
        if (this.yCoord < 100 - this.height) {
            this.yCoord += this.speed;
            this.draw();
        }
    }

    moveUp() {
        const board = document.getElementById("board");
        if (this.yCoord > 0) {
            this.yCoord -= this.speed;
            this.draw();
        }
    }

    moveRight() {
        if (this.xCoord < 100 - this.width) {
            this.xCoord += this.speed;
            this.draw();
        }
    }

    moveLeft() {
        if (this.xCoord > 0) {
            this.xCoord -= this.speed;
            this.draw();
        }
    }
}

class Ball {
    constructor(width, height, id) {
        this.width = width;
        this.height = height;
        this.id = id;
        this.positionX = 50;
        this.positionY = 50;
        this.xSpeed = 2;
        this.ySpeed = 2;
        this.gameOver = false;

        this.ballElm = document.getElementById(this.id);
        this.drawBall();
    }

    move(players) {
        if (this.gameOver) return;
        const board = document.getElementById("board");
        const boardWidth = board.offsetWidth;
        const boardHeight = board.offsetHeight;

        if (this.positionX + this.width + this.xSpeed <= boardWidth && this.positionX + this.xSpeed >= 0) {
            this.positionX += this.xSpeed;
        } else {
            this.xSpeed = -this.xSpeed;
        }

        if (this.positionY + this.height + this.ySpeed <= boardHeight && this.positionY + this.ySpeed >= 0) {
            this.positionY += this.ySpeed;
        } else {
            this.ySpeed = -this.ySpeed;
        }

        players.forEach(player => {
            if (this.isColliding(player)) {
                this.handleCollision(player);
            }
        });

        if (this.positionX <= 0 || this.positionX + this.width >= boardWidth || this.positionY <= 0 || this.positionY + this.height >= boardHeight) {
            console.log("Game Over");
            this.gameOver = true;
        }

        this.drawBall();
    }

    isColliding(player) {
        const board = document.getElementById("board");
        const boardWidth = board.offsetWidth;
        const boardHeight = board.offsetHeight;

        const playerX = (player.xCoord / 100) * boardWidth;
        const playerY = (player.yCoord / 100) * boardHeight;
        const playerWidth = (player.width / 100) * boardWidth;
        const playerHeight = (player.height / 100) * boardHeight;

        return !(this.positionX + this.width < playerX ||
            this.positionX > playerX + playerWidth ||
            this.positionY + this.height < playerY ||
            this.positionY > playerY + playerHeight);
    }

    handleCollision(player) {
        const board = document.getElementById("board");
        const boardWidth = board.offsetWidth;
        const boardHeight = board.offsetHeight;
    
        const playerX = (player.xCoord / 100) * boardWidth;
        const playerY = (player.yCoord / 100) * boardHeight;
        const playerWidth = (player.width / 100) * boardWidth;
        const playerHeight = (player.height / 100) * boardHeight;
    
        //here i descover how to keep the velocity 
        const totalSpeed = Math.sqrt(this.xSpeed ** 2 + this.ySpeed ** 2);
    
        if (player.id === "player") {
            if (
                this.positionX + this.width >= playerX && 
                this.positionX <= playerX + playerWidth && 
                this.positionY + this.height > playerY &&
                this.positionY < playerY + playerHeight
            ) {
                console.log("Rebotó en player izquierdo");
                this.xSpeed = Math.abs(this.xSpeed); 
                this.positionX = playerX + playerWidth;
            }
        }
        if (player.id === "player2") {
            if (
                this.positionX <= playerX && 
                this.positionX + this.width >= playerX &&
                this.positionY + this.height > playerY &&
                this.positionY < playerY + playerHeight
            ) {
                console.log("Rebotó en player derecho");
                this.xSpeed = -Math.abs(this.xSpeed); 
                this.positionX = playerX - this.width;
            }
        }
    
        if (player.id === "player3") {
            if (
                this.positionY + this.height >= playerY && 
                this.positionY <= playerY + playerHeight &&
                this.positionX + this.width > playerX && 
                this.positionX < playerX + playerWidth
            ) {
                console.log("Rebotó en player superior");
                this.ySpeed = Math.abs(this.ySpeed); 
                this.positionY = playerY + playerHeight;
            }
        }
    
        if (player.id === "player4") {
            if (
                this.positionY <= playerY && 
                this.positionY + this.height >= playerY && 
                this.positionX + this.width > playerX && 
                this.positionX < playerX + playerWidth
            ) {
                console.log("Rebotó en player inferior");
                this.ySpeed = -Math.abs(this.ySpeed); 
                this.positionY = playerY - this.height;
            }
        }
        const magnitude = Math.sqrt(this.xSpeed ** 2 + this.ySpeed ** 2);
        this.xSpeed = (this.xSpeed / magnitude) * totalSpeed;
        this.ySpeed = (this.ySpeed / magnitude) * totalSpeed;
    }


    drawBall() {
        const ballElm = document.getElementById('ball');
        if (ballElm) {
            ballElm.style.left = this.positionX + 'px';
            ballElm.style.top = this.positionY + 'px';
            ballElm.style.width = this.width + 'px';
            ballElm.style.height = this.height + 'px';
        }

        ballElm.style.backgroundColor = "black";
        ballElm.style.border = "2px solid black";
        ballElm.style.borderRadius = "50%";
    }
};


const ball = new Ball(20, 20, 'ball');

const player = new Player(5, 20, 5, 40, 'player', 5);
const player2 = new Player(5, 20, 90, 40, 'player2', 5);
const player3 = new Player(35, 5, 40, 5, 'player3', 5);
const player4 = new Player(35, 5, 40, 90, 'player4', 5);

window.addEventListener("resize", () => {
    player.draw();
    player2.draw();
    player3.draw();
    player4.draw();
    ball.drawBall();
});

document.addEventListener('keydown', (e) => {
    if (e.code === "ArrowUp") {
        player.moveUp();
        player2.moveUp();
    } else if (e.code === "ArrowDown") {
        player.moveDown();
        player2.moveDown();
    } else if (e.code === "ArrowLeft") {
        player3.moveLeft();
        player4.moveLeft();
    } else if (e.code === "ArrowRight") {
        player3.moveRight();
        player4.moveRight();
    }
});


setInterval(() => {
    ball.move([player, player2, player3, player4]);
}, 1000 / 60);