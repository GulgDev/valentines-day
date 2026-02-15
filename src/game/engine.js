import { Ticker } from "./ticker.js";
import { Renderer } from "./renderer.js";
import { World } from "./world.js";
import { SCREEN_HEIGHT } from "../const/screen.js";
import { CHARACTER_SIZE } from "./objects/character.js";

export class Engine extends EventTarget {
  #ticker = new Ticker();
  world = new World();

  #canvas;
  #renderer;

  #characters;

  constructor(ctx, characters) {
    super();

    this.#canvas = ctx.canvas;
    this.#renderer = new Renderer(ctx);

    this.#characters = characters;
  }

  start() {
    this.#ticker.addEventListener("update", this.#update);
    this.#ticker.addEventListener("draw", this.#draw);

    this.#ticker.start();
  }

  stop() {
    this.#ticker.removeEventListener("update", this.#update);
    this.#ticker.removeEventListener("draw", this.#draw);

    this.#ticker.stop();
    this.dispatchEvent(new Event("stop"));

    this.#canvas.classList.remove("split");
  }

  #update = ({ detail: dt }) => {
    this.world.update(dt);
  };

  #draw = () => {
    this.#renderer.prepare();

    document.documentElement.style.setProperty(
      "--character-angle",
      `${Math.atan2(
        this.#characters[1].x - this.#characters[0].x,
        this.#characters[1].y - this.#characters[0].y,
      )}rad`,
    );
    document.documentElement.style.setProperty(
      "--character-distance",
      `${Math.sqrt(
        (this.#characters[1].x - this.#characters[0].x) ** 2,
        (this.#characters[1].y - this.#characters[0].y) ** 2,
      )}`,
    );

    const hw = this.#renderer.width / 2;
    if (
      this.#characters[1].x - this.#characters[0].x <= hw &&
      this.#characters[1].x > this.#characters[0].x &&
      Math.abs(this.#characters[1].y - this.#characters[0].y) <=
        SCREEN_HEIGHT - (CHARACTER_SIZE / 2) * 2 - 4 * 2
    ) {
      this.#canvas.classList.remove("split");

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
      this.#canvas.classList.add("split");

      this.#renderer.setCamera(
        0,
        0,
        hw,
        this.#renderer.height,
        this.#characters[0].x,
        this.#characters[0].y,
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
  };
}
