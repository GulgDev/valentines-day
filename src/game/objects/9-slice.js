import { Body } from "./body.js";
import { crop } from "../../util/crop.js";

export class Sprite9Slice extends Body {
  constructor(x, y, w, h, img, left, top, right, bottom) {
    super(x, y, w, h);
    this.setImage(img, left, top, right, bottom);
  }

  setImage(img, left, top, right, bottom) {
    const resolve = () => {
      const x1 = left,
        y1 = top,
        x2 = img.naturalWidth - right,
        y2 = img.naturalHeight - bottom;

      this.left = left;
      this.top = top;
      this.right = right;
      this.bottom = bottom;

      this.imgTopLeft = crop(img, 0, 0, x1, y1);
      this.imgTop = crop(img, x1, 0, x2, y1);
      this.imgTopRight = crop(img, x2, 0, img.naturalWidth, y1);
      this.imgLeft = crop(img, 0, y1, x1, y2);
      this.imgFill = crop(img, x1, y1, x2, y2);
      this.imgRight = crop(img, x2, y1, img.naturalWidth, y2);
      this.imgBottomLeft = crop(img, 0, y2, x1, img.naturalHeight);
      this.imgBottom = crop(img, x1, y2, x2, img.naturalHeight);
      this.imgBottomRight = crop(
        img,
        x2,
        y2,
        img.naturalWidth,
        img.naturalHeight,
      );
    };

    if (img.complete) resolve();
    else img.addEventListener("load", resolve);
  }

  draw(renderer) {
    if (this.imgFill) {
      renderer.image(
        this.imgTopLeft,
        this.x - (this.w - this.left) / 2,
        this.y - (this.h - this.top) / 2,
        this.left,
        this.top,
      );
      renderer.image(
        this.imgTop,
        this.x,
        this.y - (this.h - this.top) / 2,
        this.w - (this.left + this.right),
        this.top,
        true,
      );
      renderer.image(
        this.imgTopRight,
        this.x + (this.w - this.right) / 2,
        this.y - (this.h - this.top) / 2,
        this.right,
        this.top,
      );

      renderer.image(
        this.imgLeft,
        this.x - (this.w - this.left) / 2,
        this.y,
        this.left,
        this.h - (this.top + this.bottom),
        true,
      );
      renderer.image(
        this.imgFill,
        this.x,
        this.y,
        this.w - (this.left + this.right),
        this.h - (this.top + this.bottom),
        true,
      );
      renderer.image(
        this.imgRight,
        this.x + (this.w - this.right) / 2,
        this.y,
        this.right,
        this.h - (this.top + this.bottom),
        true,
      );

      renderer.image(
        this.imgBottomLeft,
        this.x - (this.w - this.left) / 2,
        this.y + (this.h - this.bottom) / 2,
        this.left,
        this.top,
      );
      renderer.image(
        this.imgBottom,
        this.x,
        this.y + (this.h - this.bottom) / 2,
        this.w - (this.left + this.right),
        this.top,
        true,
      );
      renderer.image(
        this.imgBottomRight,
        this.x + (this.w - this.right) / 2,
        this.y + (this.h - this.bottom) / 2,
        this.right,
        this.top,
      );
    }

    super.draw(renderer);
  }
}
