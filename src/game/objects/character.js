import {
  gingerCatLeft,
  gingerCatRight,
  tabbyCatLeft,
  tabbyCatRight,
} from "../../../res/index.js";
import { Body } from "./body.js";

const SPEED = 192;
const JUMP_POWER = 448;

const DOUBLE_TAP_INTERVAL = 300;

export const CHARACTER_SIZE = 32;

const ANGULAR_SPEED = (2 * SPEED) / CHARACTER_SIZE;

export const characterSprites = [
  { left: gingerCatLeft, right: gingerCatRight },
  { left: tabbyCatLeft, right: tabbyCatRight },
];

export class Character extends Body {
  #variant;

  #moving = false;
  #canJump = false;

  constructor(x, y, direction, variant) {
    super(x, y, CHARACTER_SIZE, CHARACTER_SIZE);
    this.#variant = variant;
    this.direction = direction;
    this.addEventListener("collide", this.#onCollide);
  }

  kill() {
    this.collidable = false;
    this.touchable = false;
    this.release();
    this.dispatchEvent(new Event("death"));
  }

  #releasedAt = null;

  press() {
    if (!this.collidable) return;

    if (
      this.#releasedAt !== null &&
      document.timeline.currentTime - this.#releasedAt <= DOUBLE_TAP_INTERVAL
    )
      this.#jump();

    this.#moving = true;

    this.#releasedAt = null;
  }

  release() {
    this.#moving = false;
    this.#rotation = 0;

    this.#releasedAt = document.timeline.currentTime;
  }

  #rotation = 0;

  update(world, dt) {
    if (this.#moving) {
      this.vx = this.direction * SPEED;
      this.#rotation += this.direction * ANGULAR_SPEED * dt;
    }

    super.update(world, dt);
  }

  draw(renderer) {
    const round = Math.PI / 4;
    renderer.image(
      characterSprites[this.#variant][this.direction > 0 ? "right" : "left"],
      this.x,
      this.y,
      this.w,
      this.h,
      false,
      Math.round(this.#rotation / round) * round,
    );

    super.draw(renderer);
  }

  #jump() {
    if (!this.#canJump) return;

    this.vy = -JUMP_POWER;
    this.#canJump = false;
  }

  #onCollide = ({ detail: { direction } }) => {
    switch (direction) {
      case "left":
        if (this.#moving && this.direction < 0) this.direction *= -1;
        break;
      case "right":
        if (this.#moving && this.direction > 0) this.direction *= -1;
        break;
      case "bottom":
        this.#canJump = true;
        break;
    }
  };
}
