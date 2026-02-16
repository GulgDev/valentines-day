import { cloud1, cloud2 } from "../../../res/index.js";
import { Sprite } from "../../game/objects/sprite.js";
import { eq, moveTowards } from "../../util/math.js";

const CLOUD_SPEED = 64;
const CLOUD_INTERVAL = 1500;

export class Cloud extends Sprite {
  static = true;
  platformDirection = "top";

  constructor(x1, y1, x2, y2) {
    super(x1, y1, 32, 16, Math.random() < 0.5 ? cloud1 : cloud2);
    this.positions = [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
    ];
    this.#advance();
  }

  #targetPosition = 0;
  #advance() {
    setTimeout(
      () =>
        (this.#targetPosition =
          (this.#targetPosition + 1) % this.positions.length),
      CLOUD_INTERVAL,
    );
  }

  update(world, dt) {
    if (!eq(this, this.positions[this.#targetPosition])) {
      Object.assign(
        this,
        moveTowards(
          this,
          this.positions[this.#targetPosition],
          CLOUD_SPEED * dt,
        ),
      );

      if (eq(this, this.positions[this.#targetPosition])) this.#advance();
    }

    super.update(world, dt);
  }

  draw(renderer) {
    for (let i = 1; i < this.positions.length; ++i) {
      const { x: x1, y: y1 } = this.positions[i - 1],
        { x: x2, y: y2 } = this.positions[i];
      renderer.dashedLine(x1, y1, x2, y2, 0, 8, {
        strokeStyle: "#fff8",
        lineDashOffset: -4,
        lineWidth: 4,
        lineCap: "round",
        lineJoin: "round"
      });
    }

    super.draw(renderer);
  }
}
