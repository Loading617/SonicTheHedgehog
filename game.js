const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const TILE_SIZE = 32;
let sonic = {
    x: 100,
    y: 300,
    width: 40,
    height: 40,
    speed: 5,
    dx: 0,
    dy: 0,  
    gravity: 0.5,
    jumpPower: -10,
    isJumping: false,
    isFalling: false,
    sprite: new Image()  
};

sonic.sprite.src = 'assets/sonic.png';  

let background = new Image();
background.src = 'assets/background.png';

function moveSonic() {
    sonic.x += sonic.dx;
    sonic.y += sonic.dy;
    
    if (sonic.y < canvas.height - sonic.height) {
        sonic.dy += sonic.gravity;
        sonic.isFalling = true;
    } else {
        sonic.dy = 0;
        sonic.y = canvas.height - sonic.height;
        sonic.isFalling = false;
        sonic.isJumping = false;
    }

    if (sonic.x < 0) sonic.x = 0;
    if (sonic.x > canvas.width - sonic.width) sonic.x = canvas.width - sonic.width;
}

function jump() {
    if (!sonic.isJumping && !sonic.isFalling) {
        sonic.dy = sonic.jumpPower;
        sonic.isJumping = true;
    }
}

function update() {
    if (keys['ArrowRight']) {
        sonic.dx = sonic.speed;
    } else if (keys['ArrowLeft']) {
        sonic.dx = -sonic.speed;
    } else {
        sonic.dx = 0;
    }

    if (keys['Space'] || keys['ArrowUp']) {
        jump();
    }

    moveSonic();
}

let keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function drawBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

function drawSonic() {
    ctx.drawImage(sonic.sprite, sonic.x, sonic.y, sonic.width, sonic.height);
}


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    update();
    drawSonic();
    requestAnimationFrame(gameLoop);  
}

gameLoop();

let jumpSound = new Audio('assets/jump.mp3');
jumpSound.play();

let platform = { x: 200, y: 300, width: 100, height: 20 };

function checkCollision() {
    if (sonic.x + sonic.width > platform.x && sonic.x < platform.x + platform.width &&
        sonic.y + sonic.height > platform.y && sonic.y < platform.y + platform.height) {
        sonic.dy = 0;
        sonic.y = platform.y - sonic.height;
    }
}

window.addEventListener("gamepadconnected", (event) => {
    console.log("Controller connected:", event.gamepad);
});

window.addEventListener("gamepaddisconnected", (event) => {
    console.log("Controller disconnected:", event.gamepad);
});

function handleGamepadInput() {
    const gamepads = navigator.getGamepads();
    if (!gamepads) return;

    const gamepad = gamepads[0];
    if (gamepad) {
        if (gamepad.buttons[0].pressed) {
            console.log("Jump button pressed!");
            sonic.jump();
        }

        if (gamepad.buttons[1].pressed) {
            console.log("Spin Dash button pressed!");
            sonic.spinDash();
        }

        const horizontalAxis = gamepad.axes[0];
        const verticalAxis = gamepad.axes[1];

        if (horizontalAxis < -0.5) {
            console.log("Move Left");
            sonic.moveLeft();
        } else if (horizontalAxis > 0.5) {
            console.log("Move Right");
            sonic.moveRight();
        }
    }
}

function gameLoop() {
    handleGamepadInput();
    updateGame();
    renderGame();
    requestAnimationFrame(gameLoop);
}

gameLoop();

const controlMapping = {
    jump: 0,
    spinDash: 1,
    moveLeft: -1,
    moveRight: 1
};

if (gamepad.buttons[controlMapping.jump].pressed) {
    sonic.jump();
}

document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") sonic.moveLeft();
    if (event.code === "ArrowRight") sonic.moveRight();
    if (event.code === "Space") sonic.jump();
});
