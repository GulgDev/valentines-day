import { DEBUG_WIREFRAMES_ENABLED } from "../../debug.js";

const GRAVITY = 768;
const FRICTION = 448;

export class Body extends EventTarget {
  tags = new Set();

  static = false;
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

  update(world, dt) {
    if (!this.static) {
      this.vx -=
        Math.sign(this.vx) * Math.min(Math.abs(this.vx), FRICTION * dt);
      this.vy += GRAVITY * dt;

      this.x += this.vx * dt;
      this.y += this.vy * dt;

      if (this.collidable) world.bodies.forEach((body) => this.collide(body));
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

  collide(body) {
    if (!body.collidable) return;

    const x1 = Math.max(this.x - this.w / 2, body.x - body.w / 2),
      x2 = Math.min(this.x + this.w / 2, body.x + body.w / 2),
      y1 = Math.max(this.y - this.h / 2, body.y - body.h / 2),
      y2 = Math.min(this.y + this.h / 2, body.y + body.h / 2);

    if (x2 <= x1 || y2 <= y1) return;

    this.dispatchEvent(new CustomEvent("touch", { detail: { body } }));
    if (body.static)
      body.dispatchEvent(new CustomEvent("touch", { detail: { body: this } }));
    else return;

    // state might have changed
    if (!(this.collidable && body.collidable)) return;

    let direction;
    if (x2 - x1 < y2 - y1) {
      if (body.x < this.x && this.vx < 0) {
        this.x = body.x + body.w / 2 + this.w / 2;
        this.vx = 0;
        direction = "left";
      } else if (body.x >= this.x && this.vx > 0) {
        this.x = body.x - body.w / 2 - this.w / 2;
        this.vx = 0;
        direction = "right";
      }
    } else {
      if (body.y < this.y && this.vy < 0) {
        this.y = body.y + body.h / 2 + this.h / 2;
        this.vy = 0;
        direction = "top";
      } else if (body.y >= this.y && this.vy > 0) {
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
