import { Sprite } from "./sprite.js";

const SPEED = 192;
const JUMP_POWER = 448;

const DOUBLE_TAP_INTERVAL = 300;

export class Character extends Sprite {
  #dx = 1;
  #moving = false;
  #canJump = false;

  constructor(x, y, w, h, img, imgX, imgY) {
    super(x, y, w, h, img, imgX, imgY);
    this.addEventListener("collide", this.#onCollide);
  }

  #releasedAt = null;

  press() {
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

    this.#releasedAt = document.timeline.currentTime;
  }

  update(world, dt) {
    if (this.#moving) this.vx = this.#dx * SPEED;
    super.update(world, dt);
  }

  #jump() {
    if (!this.#canJump) return;

    this.vy = -JUMP_POWER;
    this.#canJump = false;
  }

  #onCollide = ({ detail: { direction } }) => {
    switch (direction) {
      case "left":
        if (this.#moving && this.#dx < 0) this.#dx = -this.#dx;
      case "right":
        if (this.#moving && this.#dx > 0) this.#dx = -this.#dx;
      case "bottom":
        this.#canJump = true;
    }
  };
}
