import { Engine } from "./engine.js";
import { Character } from "./objects/character.js";
import { InputListener } from "./input.js";

export class Game extends EventTarget {
  #engine;

  #characters = [];

  constructor(ctx, levelInfo) {
    this.#engine = new Engine(ctx, this.#characters);

    {
      const character = new Character(
        levelInfo.spawnPoints[0].x,
        levelInfo.spawnPoints[0].y,
        64,
        64,
      );
      const listener = new InputListener(canvas, 0, 0, 0.5, 1, "KeyZ");
      listener.addEventListener("press", () => character.press());
      listener.addEventListener("release", () => character.release());
      this.#engine.addEventListener("stop", () => listener.dispose());
      this.#characters.push(character);
    }

    {
      const character = new Character(
        levelInfo.spawnPoints[1].x,
        levelInfo.spawnPoints[1].x,
        64,
        64,
      );
      const listener = new InputListener(canvas, 0.5, 0, 1, 1, "KeyX");
      listener.addEventListener("press", () => character.press());
      listener.addEventListener("release", () => character.release());
      this.#engine.addEventListener("stop", () => listener.dispose());
      this.#characters.push(character);
    }

    for (const object of levelInfo.objects) this.#engine.world.add(object);

    this.#characters[0].addEventListener("collide", ({ detail: { body } }) => {
      if (body === this.#characters[1])
        this.dispatchEvent(new Event("completed"));
    });
  }
}
