import { Body } from "./body.js";

export class Sprite extends Body {
  constructor(x, y, w, h, img) {
    super(x, y, w, h);
    this.img = img;
  }

  draw(renderer) {
    renderer.image(this.img, this.x, this.y, this.w, this.h);

    super.draw(renderer);
  }
}
