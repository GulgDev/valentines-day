export class World {
  bodies = new Set();

  update(dt) {
    this.bodies.forEach((body) => body.update(this, dt));
  }

  draw(renderer) {
    this.bodies.forEach((body) => body.draw(renderer));
  }
}
