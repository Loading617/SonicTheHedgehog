const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game Variables
const TILE_SIZE = 32;  // Size of tiles (example size)
let sonic = {
    x: 100,
    y: 300,
    width: 40,
    height: 40,
    speed: 5,
    dx: 0,  // Sonic's velocity in x
    dy: 0,  // Sonic's velocity in y
    gravity: 0.5,
    jumpPower: -10,
    isJumping: false,
    isFalling: false,
    sprite: new Image()  // Sonic's sprite
};

sonic.sprite.src = 'assets/sonic.png';  // Use a placeholder image for now

// Background (for demonstration)
let background = new Image();
background.src = 'assets/background.png';  // Load a background image

// Move Sonic
function moveSonic() {
    sonic.x += sonic.dx;
    sonic.y += sonic.dy;
    
    // Gravity (pull Sonic down)
    if (sonic.y < canvas.height - sonic.height) {
        sonic.dy += sonic.gravity;
        sonic.isFalling = true;
    } else {
        sonic.dy = 0;
        sonic.y = canvas.height - sonic.height;
        sonic.isFalling = false;
        sonic.isJumping = false;
    }

    // Move Sonic left or right based on velocity
    if (sonic.x < 0) sonic.x = 0;
    if (sonic.x > canvas.width - sonic.width) sonic.x = canvas.width - sonic.width;
}

// Handle Jumping
function jump() {
    if (!sonic.isJumping && !sonic.isFalling) {
        sonic.dy = sonic.jumpPower;
        sonic.isJumping = true;
    }
}

// Update Sonic's velocity based on keypresses
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

// Key Controls
let keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Draw the Background
function drawBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

// Draw Sonic
function drawSonic() {
    ctx.drawImage(sonic.sprite, sonic.x, sonic.y, sonic.width, sonic.height);
}

// Main Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the screen
    drawBackground();
    update();
    drawSonic();
    requestAnimationFrame(gameLoop);  // Loop the game at 60fps
}

// Start the game
gameLoop();

let jumpSound = new Audio('assets/jump.mp3');
jumpSound.play();
