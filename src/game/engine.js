import { Ticker } from "./ticker.js";
import { Renderer } from "./renderer.js";
import { World } from "./world.js";

export class Engine extends EventTarget {
  #ticker = new Ticker();
  world = new World();

  #renderer;

  #characters;

  constructor(ctx, characters) {
    super();

    this.#renderer = new Renderer(ctx);

    this.#characters = characters;

    this.#ticker.addEventListener("update", ({ detail: dt }) =>
      this.#update(dt),
    );
    this.#ticker.addEventListener("draw", () => this.#draw());
  }

  start() {
    this.#ticker.start();
  }

  stop() {
    this.#ticker.stop();
    this.dispatchEvent(new Event("stop"));
  }

  #update(dt) {
    this.world.update(dt);
  }

  #draw() {
    this.#renderer.prepare();

    const hw = this.#renderer.width / 2;
    if (Math.abs(this.#characters[0].x - this.#characters[1].x) < hw) {
      this.#renderer.setCamera(
        0,
        0,
        this.#renderer.width,
        this.#renderer.height,
        (this.#characters[0].x + this.#characters[1].x) / 2,
        (this.#characters[0].y + this.#characters[1].y) / 2,
      );
      this.world.draw(this.#renderer);
    } else {
      this.#renderer.setCamera(
        0,
        0,
        hw,
        this.#renderer.height,
        this.#characters[0].x.x,
        this.#characters[0].x.y,
      );
      this.world.draw(this.#renderer);

      this.#renderer.setCamera(
        hw,
        0,
        this.#renderer.width,
        this.#renderer.height,
        this.#characters[1].x,
        this.#characters[1].y,
      );
      this.world.draw(this.#renderer);
    }
  }
}
