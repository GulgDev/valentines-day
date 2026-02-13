export const VIEWPORT_SIZE = 512;

export class Renderer {
  #ctx;

  constructor(ctx) {
    this.#ctx = ctx;
    this.#resizeObserver.observe(this.#ctx.canvas);
  }

  #resizeObserver = new ResizeObserver(() => {
    if (this.#ctx.canvas.clientWidth > this.#ctx.canvas.clientHeight) {
      this.#ctx.canvas.width =
        (this.#ctx.canvas.clientWidth / this.#ctx.canvas.clientHeight) *
        VIEWPORT_SIZE;
      this.#ctx.canvas.height = VIEWPORT_SIZE;
    } else {
      this.#ctx.canvas.width = VIEWPORT_SIZE;
      this.#ctx.canvas.height =
        (this.#ctx.canvas.clientHeight / this.#ctx.canvas.clientWidth) *
        VIEWPORT_SIZE;
    }
  });

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

  setCamera(x1, y1, x2, y2, x0, y0) {
    this.#ctx.restore();
    this.#ctx.save();
    this.#ctx.beginPath();
    this.#ctx.rect(x1, y1, x2 - x1, y2 - y1);
    this.#ctx.clip();
    this.#ctx.translate((x1 + x2) / 2 - x0, (y1 + y2) / 2 - y0);
  }

  image(img, x, y, w, h) {
    this.#ctx.drawImage(img, x - w / 2, y - h / 2, w, h);
  }

  rect(x, y, w, h, opts = {}) {
    Object.assign(this.#ctx, opts);
    this.#ctx.strokeRect(x - w / 2, y - h / 2, w, h);
  }
}
