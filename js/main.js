class Player {
    constructor(width, height, xCoord, yCoord, id, speed) {
        this.width = width;
        this.height = height;
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.id = id;
        this.speed = speed;
        this.board = board;

        this.playerElm = document.getElementById(this.id);
        this.draw();

    }

    moveDown() {

        if (this.yCoord < 95 - this.height) {
            this.yCoord += this.speed;
            this.draw();
        }
    }

    moveUp() {
        if (this.yCoord > 5) {
            this.yCoord -= this.speed;
            this.draw();
        }
    }

    moveRight() {
        if (this.xCoord < 95 - this.width) {
            this.xCoord += this.speed;
            this.draw();
        }

    }
    moveLeft() {
        if (this.xCoord > 5) {
            this.xCoord -= this.speed;
            this.draw();
        }
    }

    draw() {
        const boardWidth = this.board.offsetWidth;
        const boardHeight = this.board.offsetHeight;

        const absoluteWidth = (this.width / 100) * boardWidth;
        const absoluteHeight = (this.height / 100) * boardHeight;
        const absoluteX = (this.xCoord / 100) * boardWidth;
        const absoluteY = (this.yCoord / 100) * boardHeight;

        this.playerElm.style.position = "absolute";
        this.playerElm.style.width = absoluteWidth + "px";
        this.playerElm.style.height = absoluteHeight + "px";
        this.playerElm.style.left = absoluteX + "px";
        this.playerElm.style.top = absoluteY + "px";

        this.playerElm.style.backgroundImage = "url('./Assets/players2.jpg')";
        this.playerElm.style.backgroundSize = "cover";
        this.playerElm.style.backgroundPosition = "center"
        this.playerElm.style.border = "2px solid black";
        this.playerElm.style.borderRadius = "30%"
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
        this.board = board;

        this.ballElm = document.getElementById(this.id);
        this.drawBall();
    }

    move(players) {
        const boardWidth = this.board.offsetWidth;
        const boardHeight = this.board.offsetHeight;

        if (this.gameOver) {
            // Detener la música del juego si está sonando
            if (window.gameMusic) {
                window.gameMusic.pause();
                window.gameMusic.currentTime = 0;
            }
        
            // Guardamos en localStorage que estamos en Game Over
            localStorage.setItem("gameMusic", "stopped");
        
            // Redirigir a gameOver.html
            location.href = "gameover.html";
        }

        if (this.positionX <= 0 || this.positionX + this.width >= boardWidth) {
            console.log("Game Over: Toco el borde izquierdo o derecho");
            this.gameOver = true;
        }

        if (this.positionY <= 0 || this.positionY + this.height >= boardHeight) {
            console.log("Game Over: Toco el borde superior o inferior");
            this.gameOver = true;
        }

        if (this.gameOver) return;

        this.positionX += this.xSpeed;
        this.positionY += this.ySpeed;

        players.forEach(player => {
            if (this.isColliding(player)) {
                this.handleCollision(player);
            }
        });

        this.drawBall();
    }

    isColliding(player) {
        const boardWidth = this.board.offsetWidth;
        const boardHeight = this.board.offsetHeight;

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
        const boardWidth = this.board.offsetWidth;
        const boardHeight = this.board.offsetHeight;

        const playerX = (player.xCoord / 100) * boardWidth;
        const playerY = (player.yCoord / 100) * boardHeight;
        const playerWidth = (player.width / 100) * boardWidth;
        const playerHeight = (player.height / 100) * boardHeight;

        const totalSpeed = Math.sqrt(this.xSpeed ** 2 + this.ySpeed ** 2);

        if (player.id === "player") {
            if (
                this.positionX + this.width > playerX &&
                this.positionX < playerX + playerWidth &&
                this.positionY + this.height > playerY &&
                this.positionY < playerY + playerHeight
            ) {
                console.log("Rebotó en player izquierdo");
                this.xSpeed = Math.abs(this.xSpeed);
                this.positionX = playerX + playerWidth;
            }
            this.playSound();
        }
        if (player.id === "player2") {
            if (
                this.positionX < playerX &&
                this.positionX + this.width > playerX &&
                this.positionY + this.height > playerY &&
                this.positionY < playerY + playerHeight
            ) {
                console.log("Rebotó en player derecho");
                this.xSpeed = -Math.abs(this.xSpeed);
                this.positionX = playerX - this.width;
            }
            this.playSound();
        }

        if (player.id === "player3") {
            if (
                this.positionY + this.height > playerY &&
                this.positionY < playerY + playerHeight &&
                this.positionX + this.width > playerX &&
                this.positionX < playerX + playerWidth
            ) {
                console.log("Rebotó en player superior");
                this.ySpeed = Math.abs(this.ySpeed);
                this.positionY = playerY + playerHeight;
            }
            this.playSound();
        }

        if (player.id === "player4") {
            if (
                this.positionY < playerY &&
                this.positionY + this.height > playerY &&
                this.positionX + this.width > playerX &&
                this.positionX < playerX + playerWidth
            ) {
                console.log("Rebotó en player inferior");
                this.ySpeed = -Math.abs(this.ySpeed);
                this.positionY = playerY - this.height;
            }
            this.playSound();

        }
        const magnitude = Math.sqrt(this.xSpeed ** 2 + this.ySpeed ** 2);
        this.xSpeed = (this.xSpeed / magnitude) * totalSpeed;
        this.ySpeed = (this.ySpeed / magnitude) * totalSpeed;
    }

    playSound() {
        soundBallBounce.currentTime = 0;
        soundBallBounce.play();
    }


    drawBall() {

        this.ballElm.style.left = this.positionX + 'px';
        this.ballElm.style.top = this.positionY + 'px';
        this.ballElm.style.width = this.width + 'px';
        this.ballElm.style.height = this.height + 'px';

        this.ballElm.style.backgroundImage = "url('./Assets/png-sharingan.png')";
        this.ballElm.style.backgroundSize = "cover";

        this.ballElm.style.border = "2px solid black";
        this.ballElm.style.borderRadius = "50%";
    }
};

const board = document.getElementById("board");
const ball = new Ball(30, 30, 'ball');

const player = new Player(7, 20, 5, 40, 'player', 7);
const player2 = new Player(7, 20, 90, 40, 'player2', 7);
const player3 = new Player(35, 5, 30, 5, 'player3', 7);
const player4 = new Player(35, 5, 30, 90, 'player4', 7);

const timerElm = document.getElementById('timer');
const soundBallBounce = new Audio('./Assets/whoosh.mp3');
//const soundGameOver = new Audio('./Assets/laugh.mp3');
const soundGame = new Audio("./Assets/theme-song.mp3")
soundGame.loop = true;
soundGame.volume = 0.1;
soundBallBounce.volume = 0.2;


document.addEventListener('DOMContentLoaded', () => {
    soundGame.play();
});


window.addEventListener("resize", () => {
    player.draw();
    player2.draw();
    player3.draw();
    player4.draw();
    ball.drawBall();
});

document.addEventListener('keydown', (e) => {
    if (e.code === "ArrowUp" || e.code === "KeyW") {
        player.moveUp();
        player2.moveUp();
    } else if (e.code === "ArrowDown" || e.code === "KeyS") {
        player.moveDown();
        player2.moveDown();
    } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
        player3.moveLeft();
        player4.moveLeft();
    } else if (e.code === "ArrowRight" || e.code === "KeyD") {
        player3.moveRight();
        player4.moveRight();
    }
});
setInterval(() => {
    ball.move([player, player2, player3, player4]);
}, 1000 / 60);

let level = 1;
let speedIncreaseInterval = 15;
let speedMultiplier = 1.1;
let currentInterval = 0;
let gameTime = 100;

let levelUpTimer = setInterval(() => {
    level++;

    ball.xSpeed *= speedMultiplier;
    ball.ySpeed *= speedMultiplier;

    console.log(`¡Nuevo nivel! Nivel: ${level}. Velocidad de la pelota: ${Math.sqrt(ball.xSpeed ** 2 + ball.ySpeed ** 2)}`);


    if (level >= 10) {
        clearInterval(levelUpTimer);
        console.log("¡Nivel máximo alcanzado!");
    }
}, speedIncreaseInterval * 1000);

let timerInterval = setInterval(() => {
    gameTime--;

    let minutes = Math.floor(gameTime / 60);
    let seconds = gameTime % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    if (gameTime === 0) {
        ball.gameOver = true;
    }

    if (timerElm) {
        timerElm.innerHTML = `Time: ${minutes}:${seconds}`;
    }
}, 1000); 