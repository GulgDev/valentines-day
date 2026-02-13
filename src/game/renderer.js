export class Renderer {
  #ctx;

  constructor(ctx) {
    this.#ctx = ctx;
  }

  get width() {
    return this.#ctx.canvas.width;
  }

  get height() {
    return this.#ctx.canvas.height;
  }

  prepare() {
    this.#ctx.restore();
    this.#ctx.clearRect(0, 0, this.width, this.height);
    this.setCamera(0, 0, this.width, this.height, 0, 0);
  }

  setCamera(x1, y1, x2, y2, x0, y0, mirrored = false) {
    const mirror = mirrored ? -1 : 1;
    this.#ctx.restore();
    this.#ctx.save();
    this.#ctx.beginPath();
    this.#ctx.rect(x1, y1, x2 - x1, y2 - y1);
    this.#ctx.clip();
    this.#ctx.translate(
      Math.round((x1 + x2) / 2 - x0 * mirror),
      Math.round((y1 + y2) / 2 - y0),
    );
    this.#ctx.scale(mirror, 1);
  }

  image(img, x, y, w, h) {
    this.#ctx.drawImage(
      img,
      Math.round(x) - w / 2,
      Math.round(y) - h / 2,
      w,
      h,
    );
  }

  strokeRect(x, y, w, h, opts = {}) {
    Object.assign(this.#ctx, opts);
    this.#ctx.strokeRect(Math.round(x) - w / 2, Math.round(y) - h / 2, w, h);
  }

  fillRect(x, y, w, h, opts = {}) {
    Object.assign(this.#ctx, opts);
    this.#ctx.fillRect(Math.round(x) - w / 2, Math.round(y) - h / 2, w, h);
  }
}
