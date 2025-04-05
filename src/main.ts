import { Application, Sprite, Texture, Container, AnimatedSprite } from "pixi.js";
import { setupInput } from "./input";
import { Sonic } from "./sonic";
import { update, render } from './game/loop';

const app = new Application({ width: 640, height: 480, backgroundColor: 0x87ceeb });
document.body.appendChild(app.view);

setupInput();

const stage = app.stage;
const sonic = new Sonic();
stage.addChild(sonic.sprite);

app.ticker.add((delta) => {
  sonic.update(delta);
});
