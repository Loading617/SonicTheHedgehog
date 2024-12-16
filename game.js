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
