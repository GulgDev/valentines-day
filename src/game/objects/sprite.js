import { Body } from "./body.js";

export class Sprite extends Body {
  constructor(x, y, w, h, img, imgX = 0, imgY = 0) {
    super(x, y, w, h);
    this.img = img;
    this.imgX = imgX;
    this.imgY = imgY;
  }

  draw(renderer) {
    if (this.img != null)
      renderer.image(
        this.img,
        this.x - this.imgX,
        this.y - this.imgY,
        this.w,
        this.h,
      );

    super.draw(renderer);
  }
}
