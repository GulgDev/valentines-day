import { Body } from "./body.js";

export class Solid extends Body {
  constructor(x, y, w, h, color) {
    super(x, y, w, h);
    this.color = color;
  }

  draw(renderer) {
    renderer.fillRect(this.x, this.y, this.w, this.h, {
      fillStyle: this.color,
    });

    super.draw(renderer);
  }
}
