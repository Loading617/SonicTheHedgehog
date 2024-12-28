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
