import { Engine } from "./engine.js";
import { Character } from "./objects/character.js";
import { InputListener } from "./input.js";

export class Game extends EventTarget {
  #engine;

  #characters = [];

  constructor(canvas, level) {
    super();

    this.#engine = new Engine(canvas.getContext("2d"), this.#characters);

    {
      const character = new Character(
        level.characters[0].x,
        level.characters[0].y,
        64,
        64,
        level.characters[0].direction,
      );
      const listener = new InputListener(canvas, 0, 0, 0.5, 1, "KeyZ");
      listener.addEventListener("press", () => character.press());
      listener.addEventListener("release", () => character.release());
      this.#engine.addEventListener("stop", () => listener.dispose());
      this.#characters.push(character);
      this.#engine.world.bodies.add(character);
    }

    {
      const character = new Character(
        level.characters[1].x,
        level.characters[1].y,
        64,
        64,
        level.characters[1].direction,
      );
      const listener = new InputListener(canvas, 0.5, 0, 1, 1, "KeyX");
      listener.addEventListener("press", () => character.press());
      listener.addEventListener("release", () => character.release());
      this.#engine.addEventListener("stop", () => listener.dispose());
      this.#characters.push(character);
      this.#engine.world.bodies.add(character);
    }

    this.#characters[0].addEventListener("collide", ({ detail: { body } }) => {
      if (body === this.#characters[1]) {
        this.stop();
        level.complete();
      }
    });

    level.init(this.#engine.world);

    this.#engine.start();
  }

  stop() {
    this.#engine.stop();
  }
}
