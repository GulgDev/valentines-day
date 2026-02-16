import { DEBUG_WIREFRAMES_ENABLED } from "../../debug.js";

const GRAVITY = 768;
const FRICTION = 448;

export class Body extends EventTarget {
  static = false;
  touchable = true;
  collidable = true;

  constructor(x, y, w, h) {
    super();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  vx = 0;
  vy = 0;

  #lastX = this.x;
  #lastY = this.y;

  update(world, dt) {
    if (!this.static) {
      this.vx -=
        Math.sign(this.vx) * Math.min(Math.abs(this.vx), FRICTION * dt);
      this.vy += GRAVITY * dt;

      this.x += this.vx * dt;
      this.y += this.vy * dt;

      if (this.collidable || this.touchable)
        world.bodies.forEach((body) => this.collide(body));

      this.#lastX = this.x;
      this.#lastY = this.y;
    }
  }

  draw(renderer) {
    if (DEBUG_WIREFRAMES_ENABLED) {
      renderer.strokeRect(this.x, this.y, this.w, this.h, {
        lineWidth: 2,
        strokeStyle: "#f00",
      });
    }
  }

  platformDirection = null;
  collide(body) {
    if (!body.touchable) return;

    const x1 = Math.max(this.x - this.w / 2, body.x - body.w / 2),
      x2 = Math.min(this.x + this.w / 2, body.x + body.w / 2),
      y1 = Math.max(this.y - this.h / 2, body.y - body.h / 2),
      y2 = Math.min(this.y + this.h / 2, body.y + body.h / 2);

    if (x2 <= x1 || y2 <= y1) return;

    this.dispatchEvent(new CustomEvent("touch", { detail: { body } }));
    if (body.static)
      body.dispatchEvent(new CustomEvent("touch", { detail: { body: this } }));
    else return;

    if (!(this.collidable && body.collidable)) return;

    const dx = this.x - this.#lastX,
      dy = this.y - this.#lastY;

    let direction;
    if (x2 - x1 < y2 - y1) {
      if (
        body.x < this.x &&
        dx < 0 &&
        (body.platformDirection == null || body.platformDirection === "right")
      ) {
        this.x = body.x + body.w / 2 + this.w / 2;
        this.vx = 0;
        direction = "left";
      } else if (
        body.x >= this.x &&
        dx > 0 &&
        (body.platformDirection == null || body.platformDirection === "left")
      ) {
        this.x = body.x - body.w / 2 - this.w / 2;
        this.vx = 0;
        direction = "right";
      }
    } else {
      if (
        body.y < this.y &&
        dy < 0 &&
        (body.platformDirection == null || body.platformDirection === "bottom")
      ) {
        this.y = body.y + body.h / 2 + this.h / 2;
        this.vy = 0;
        direction = "top";
      } else if (
        body.y >= this.y &&
        dy > 0 &&
        (body.platformDirection == null || body.platformDirection === "top")
      ) {
        this.y = body.y - body.h / 2 - this.h / 2;
        this.vy = 0;
        direction = "bottom";
      }
    }

    if (direction === undefined)
      console.warn("Collision direction is undefined", this);
    this.dispatchEvent(
      new CustomEvent("collide", { detail: { body, direction } }),
    );
  }
}
