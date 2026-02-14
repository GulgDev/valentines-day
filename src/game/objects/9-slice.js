import { Body } from "./body.js";

export class Sprite9Slice extends Body {
  constructor(
    x,
    y,
    w,
    h,
    imgTopLeft,
    imgTop,
    imgTopRight,
    imgLeft,
    imgFill,
    imgRight,
    imgBottomLeft,
    imgBottom,
    imgBottomRight,
  ) {
    super(x, y, w, h);
    this.imgTopLeft = imgTopLeft;
    this.imgTop = imgTop;
    this.imgTopRight = imgTopRight;
    this.imgLeft = imgLeft;
    this.imgFill = imgFill;
    this.imgRight = imgRight;
    this.imgBottomLeft = imgBottomLeft;
    this.imgBottom = imgBottom;
    this.imgBottomRight = imgBottomRight;
  }

  draw(renderer) {
    renderer.image(this.imgFill, this.x, this.y, this.w, this.h, true);

    super.draw(renderer);
  }
}
