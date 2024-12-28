// scripts/game.js

const cdImg = new Image();
cdImg.src = 'assets/images/cd.png'; 

const playerImg = new Image();
playerImg.src = 'assets/images/wizard.png';

// Basic player object
const player = {
    x: 100,
    y: 100,
    speed: 5,
};
  
let discs = [];
let enemies = [];

function update() {
    console.log(player.x);
    handlePlayerMovement();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //ctx.drawImage(cdImg, canvas.width / 2, canvas.height / 2, 100, 100);

    ctx.drawImage(playerImg, player.x, player.y, 48, 48);
}

function handlePlayerMovement() {

    if (keys['ArrowUp']) player.y -= player.speed;
    if (keys['ArrowDown']) player.y += player.speed;
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;
}
