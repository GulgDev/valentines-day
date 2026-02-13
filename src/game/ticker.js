const MIN_FPS = 24;

export class Ticker extends EventTarget {
  #lastFrameAt;
  start() {
    this.#running = true;
    this.#frame((this.#lastFrameAt = document.timeline.currentTime));
  }

  stop() {
    this.#running = false;
  }

  #running;
  #frame(timestamp) {
    if (!this.#running) return;

    for (
      let timeElapsed = timestamp - this.#lastFrameAt;
      timeElapsed > 0;
      timeElapsed -= 1000 / MIN_FPS
    )
      this.dispatchEvent(
        new CustomEvent("update", {
          detail: (timeElapsed % (1000 / MIN_FPS)) / 1000,
        }),
      );

    this.dispatchEvent(new CustomEvent("draw"));

    this.#lastFrameAt = timestamp;

    requestAnimationFrame((timestamp) => this.#frame(timestamp));
  }
}
