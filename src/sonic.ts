import { AnimatedSprite, BaseTexture, Rectangle, Texture } from "pixi.js";
import { keys } from "./input";

export class Sonic {
  sprite: AnimatedSprite;
  velocity = { x: 0, y: 0 };
  grounded = false;

  constructor() {
    const base = BaseTexture.from("public/sonic.png");
    const frames = [
      new Texture(base, new Rectangle(0, 0, 32, 32)),
      new Texture(base, new Rectangle(32, 0, 32, 32)),
      new Texture(base, new Rectangle(64, 0, 32, 32)),
      new Texture(base, new Rectangle(96, 0, 32, 32)),
    ];

    this.sprite = new AnimatedSprite(frames);
    this.sprite.animationSpeed = 0.2;
    this.sprite.play();
    this.sprite.x = 100;
    this.sprite.y = 300;
  }

  update(delta: number) {
    const accel = 0.5;
    const maxSpeed = 5;

    if (keys["ArrowLeft"]) this.velocity.x -= accel;
    if (keys["ArrowRight"]) this.velocity.x += accel;

    this.velocity.x *= 0.9;
    if (Math.abs(this.velocity.x) > maxSpeed)
      this.velocity.x = maxSpeed * Math.sign(this.velocity.x);

    if (keys["Space"] && this.grounded) {
      this.velocity.y = -8;
      this.grounded = false;
    }

    this.velocity.y += 0.4;

    this.sprite.x += this.velocity.x;
    this.sprite.y += this.velocity.y;

    if (this.sprite.y >= 300) {
      this.sprite.y = 300;
      this.velocity.y = 0;
      this.grounded = true;
    }
  }
}
