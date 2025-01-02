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

// Example platform (positioned at x=200, y=300)
let platform = { x: 200, y: 300, width: 100, height: 20 };

// Check for collision with a platform
function checkCollision() {
    if (sonic.x + sonic.width > platform.x && sonic.x < platform.x + platform.width &&
        sonic.y + sonic.height > platform.y && sonic.y < platform.y + platform.height) {
        // Sonic is touching the platform
        sonic.dy = 0;
        sonic.y = platform.y - sonic.height;  // Place Sonic on top of the platform
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

    const gamepad = gamepads[0]; // Assuming player 1 uses the first controller
    if (gamepad) {
        // Example: Handle button presses
        if (gamepad.buttons[0].pressed) {
            console.log("Jump button pressed!");
            // Trigger Sonic's jump action
            sonic.jump();
        }

        if (gamepad.buttons[1].pressed) {
            console.log("Spin Dash button pressed!");
            // Trigger Sonic's spin dash
            sonic.spinDash();
        }

        // Example: Handle joystick movement
        const horizontalAxis = gamepad.axes[0]; // X-axis of the left joystick
        const verticalAxis = gamepad.axes[1];   // Y-axis of the left joystick

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
    updateGame(); // Update Sonic's world
    renderGame(); // Render the game scene
    requestAnimationFrame(gameLoop);
}

gameLoop();

const controlMapping = {
    jump: 0,       // Button A
    spinDash: 1,   // Button B
    moveLeft: -1,  // Left stick, negative X-axis
    moveRight: 1   // Left stick, positive X-axis
};

// Example: Check if a button matches the mapping
if (gamepad.buttons[controlMapping.jump].pressed) {
    sonic.jump();
}

document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") sonic.moveLeft();
    if (event.code === "ArrowRight") sonic.moveRight();
    if (event.code === "Space") sonic.jump();
});
