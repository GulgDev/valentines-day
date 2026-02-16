import { Body } from "./body.js";

export class Sprite extends Body {
  imgOffsetX = 0;
  imgOffsetY = 0;

  constructor(x, y, w, h, img) {
    super(x, y, w, h);
    this.img = img;
  }

  draw(renderer) {
    renderer.image(
      this.img,
      this.x + this.imgOffsetX,
      this.y + this.imgOffsetY,
      this.w,
      this.h,
    );

    super.draw(renderer);
  }
}
