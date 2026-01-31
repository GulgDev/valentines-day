const DEBUG_WIREFRAMES_ENABLED = true;

const GRAVITY = 768;
const FRICTION = 448;

class Body {
  tags = new Set();

  static = false;
  collidable = true;

  constructor(x, y, w, h) {
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

  draw() {}

  collide(body) {
    if (!body.collidable || !body.static) return;

    const x1 = Math.max(this.x - this.w / 2, body.x - body.w / 2),
      x2 = Math.min(this.x + this.w / 2, body.x + body.w / 2),
      y1 = Math.max(this.y - this.h / 2, body.y - body.h / 2),
      y2 = Math.min(this.y + this.h / 2, body.y + body.h / 2);

    if (x2 <= x1 || y2 <= y1) return;

    if (x2 - x1 < y2 - y1) {
      if (body.x < this.x && this.vx < 0) {
        this.x = body.x + body.w / 2 + this.w / 2;
        this.vx = 0;
        this.onCollideLeft(body);
      } else if (body.x >= this.x && this.vx > 0) {
        this.x = body.x - body.w / 2 - this.w / 2;
        this.vx = 0;
        this.onCollideRight(body);
      }
    } else {
      if (body.y < this.y && this.vy < 0) {
        this.y = body.y + body.h / 2 + this.h / 2;
        this.vy = 0;
        this.onCollideTop(body);
      } else if (body.y >= this.y && this.vy > 0) {
        this.y = body.y - body.h / 2 - this.h / 2;
        this.vy = 0;
        this.onCollideBottom(body);
      }
    }
    this.onCollide(body);
  }

  onCollide(body) {}
  onCollideTop(body) {}
  onCollideLeft(body) {}
  onCollideBottom(body) {}
  onCollideRight(body) {}
}

class Sprite extends Body {
  constructor(x, y, w, h, img) {
    super(x, y, w, h);
    this.img = img;
  }

  draw(ctx) {
    if (DEBUG_WIREFRAMES_ENABLED) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#f00";
      ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }

    /*ctx.drawImage(
      this.img,
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w,
      this.h,
    );*/
  }
}

const CHARACTER_SPEED = 192;
const JUMP_POWER = 448;

class Character extends Sprite {
  dx = 1;

  constructor(x, y, w, h, img) {
    super(x, y, w, h, img);
  }

  moving = false;
  update(world, dt) {
    if (this.moving) this.vx = this.dx * CHARACTER_SPEED;
    super.update(world, dt);
  }

  canJump = false;
  jump() {
    if (!this.canJump) return;
    this.vy = -JUMP_POWER;
    this.canJump = false;
  }

  onCollideLeft() {
    if (this.moving && this.dx < 0) this.dx = -this.dx;
  }

  onCollideRight() {
    if (this.moving && this.dx > 0) this.dx = -this.dx;
  }

  onCollideBottom() {
    this.canJump = true;
  }
}

class World {
  bodies = new Set();

  update(dt) {
    this.bodies.forEach((body) => body.update(this, dt));
  }

  draw(ctx) {
    this.bodies.forEach((body) => body.draw(ctx));
  }
}

class Game {
  world = new World();

  characterA = null;
  characterB = null;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
  }

  resizeObserver = new ResizeObserver(() => {
    if (this.ctx.canvas.clientWidth > this.ctx.canvas.clientHeight) {
      this.ctx.canvas.width =
        (this.ctx.canvas.clientWidth / this.ctx.canvas.clientHeight) *
        VIEWPORT_SIZE;
      this.ctx.canvas.height = VIEWPORT_SIZE;
    } else {
      this.ctx.canvas.width = VIEWPORT_SIZE;
      this.ctx.canvas.height =
        (this.ctx.canvas.clientHeight / this.ctx.canvas.clientWidth) *
        VIEWPORT_SIZE;
    }
  });

  running = false;

  start() {
    this.running = true;
    this.resizeObserver.observe(this.ctx.canvas);
    document.addEventListener("pointerdown", this.onPointerDown);
    document.addEventListener("pointerup", this.onPointerUp);
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
    this.frame((this.lastTimestamp = document.timeline.currentTime));
  }

  frame(timestamp) {
    if (!this.running) return;

    for (
      let timeElapsed = timestamp - this.lastTimestamp;
      timeElapsed > 0;
      timeElapsed -= 1000 / MIN_FPS
    ) {
      const dt = (timeElapsed % (1000 / MIN_FPS)) / 1000;

      this.characterA.moving = this.inputA;
      if (this.inputAReleased) this.characterA.jump();

      this.characterB.moving = this.inputB;
      if (this.inputBReleased) this.characterB.jump();

      this.world.update(dt);
    }
    this.lastTimestamp = timestamp;

    this.inputAReleased = false;
    this.inputBReleased = false;

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.world.draw(this.ctx);

    requestAnimationFrame((timestamp) => this.frame(timestamp));
  }

  stop() {
    this.resizeObserver.disconnect();
    document.removeEventListener("pointerdown", this.onPointerDown);
    document.removeEventListener("pointerup", this.onPointerUp);
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keyup", this.onKeyUp);
    this.running = false;
  }

  inputA = false;
  inputB = false;

  inputAReleased = false;
  inputBReleased = false;

  pointersA = new Set();
  pointersB = new Set();

  onPointerDown = (ev) => {
    const rect = this.ctx.canvas.getBoundingClientRect();
    if (ev.clientX < rect.x + rect.width / 2) {
      this.inputA = true;
      this.pointersA.add(ev.pointerId);
    } else {
      this.inputB = true;
      this.pointersB.add(ev.pointerId);
    }
  };

  onPointerUp = (ev) => {
    if (this.pointersA.has(ev.pointerId)) {
      this.inputA = false;
      this.inputAReleased = true;
      this.pointersA.delete(ev.pointerId);
    } else if (this.pointersB.has(ev.pointerId)) {
      this.inputB = false;
      this.inputBReleased = true;
      this.pointersB.delete(ev.pointerId);
    }
  };

  onKeyDown = (ev) => {
    if (ev.code === "KeyA") this.inputA = true;
    else if (ev.code === "KeyD") this.inputB = true;
  };

  onKeyUp = (ev) => {
    if (ev.code === "KeyA") {
      this.inputA = false;
      this.inputAReleased = true;
    } else if (ev.code === "KeyD") {
      this.inputB = false;
      this.inputBReleased = true;
    }
  };
}

const MIN_FPS = 24;

const VIEWPORT_SIZE = 512;

const game = new Game(document.querySelector("canvas"));
game.world.bodies.add((game.characterA = new Character(50, 50, 64, 64)));
game.world.bodies.add((game.characterB = new Character(50, 120, 64, 64)));
game.world.bodies.add(
  Object.assign(new Character(50, 200, 256, 64), { static: true }),
);
game.world.bodies.add(
  Object.assign(new Character(250, 150, 256, 64), { static: true }),
);
game.start();
