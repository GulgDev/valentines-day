import { Engine } from "./engine.js";
import { Character } from "./objects/character.js";
import { InputListener } from "./input.js";

export class Game extends EventTarget {
  #container;

  #engine;

  #characters = [];

  constructor(canvas, level) {
    super();

    this.#container = canvas;

    this.#engine = new Engine(canvas.getContext("2d"), this.#characters);

    {
      const character = new Character(
        level.characters[0].x,
        level.characters[0].y,
        level.characters[0].direction,
        0,
      );
      this.#characters.push(character);
      this.#engine.world.bodies.add(character);
    }

    {
      const character = new Character(
        level.characters[1].x,
        level.characters[1].y,
        level.characters[1].direction,
        1,
      );
      this.#characters.push(character);
      this.#engine.world.bodies.add(character);
    }

    this.#characters[0].addEventListener("touch", ({ detail: { body } }) => {
      if (body === this.#characters[1]) {
        this.stop();
        level.complete();
      }
    });

    level.init(this.#engine.world);

    this.#engine.start();
  }

  start() {
    {
      const character = this.#characters[0];
      const listener = new InputListener(this.#container, 0, 0, 0.5, 1, "KeyZ");
      listener.addEventListener("press", () => character.press());
      listener.addEventListener("release", () => character.release());
      this.#engine.addEventListener("stop", () => listener.dispose());
    }

    {
      const character = this.#characters[1];
      const listener = new InputListener(this.#container, 0.5, 0, 1, 1, "KeyX");
      listener.addEventListener("press", () => character.press());
      listener.addEventListener("release", () => character.release());
      this.#engine.addEventListener("stop", () => listener.dispose());
    }
  }

  stop() {
    this.#engine.stop();
  }
}
