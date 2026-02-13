export class InputListener extends EventTarget {
  constructor(container, x1, y1, x2, y2, key) {
    super();
    this.container = container;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.key = key;

    document.addEventListener("pointerdown", this.#onPointerDown);
    document.addEventListener("pointerup", this.#onPointerUp);
    document.addEventListener("keydown", this.#onKeyDown);
    document.addEventListener("keyup", this.#onKeyUp);
  }

  dispose() {
    document.removeEventListener("pointerdown", this.#onPointerDown);
    document.removeEventListener("pointerup", this.#onPointerUp);
    document.removeEventListener("keydown", this.#onKeyDown);
    document.removeEventListener("keyup", this.#onKeyUp);
  }

  #pointers = new Set();

  #onPointerDown = (ev) => {
    const rect = this.container.getBoundingClientRect();
    if (
      ev.clientX >= rect.x + rect.width * this.x1 &&
      ev.clientX < rect.x + rect.width * this.x2 &&
      ev.clientY >= rect.y + rect.height * this.y1 &&
      ev.clientY < rect.y + rect.height * this.y2
    ) {
      if (this.#pointers.size === 0) this.dispatchEvent(new Event("press"));
      this.#pointers.add(ev.pointerId);
    }
  };

  #onPointerUp = (ev) => {
    if (this.#pointers.delete(ev.pointerId) && this.#pointers.size === 0)
      this.dispatchEvent(new Event("release"));
  };

  #onKeyDown = (ev) => {
    if (ev.code === this.key) this.dispatchEvent(new Event("press"));
  };

  #onKeyUp = (ev) => {
    if (ev.code === this.key) this.dispatchEvent(new Event("release"));
  };
}
