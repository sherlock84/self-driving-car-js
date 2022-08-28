import type Car from './Car';
import { drawLine, lerp, range } from './Utils';

class CarSensor {
  private _rays: Array<Line> = [];

  constructor(
    private readonly car: Car,
    readonly rayCount = 5,
    readonly rayLength = 150,
    readonly raySpread = Math.PI / 2
  ) {}

  get rays() {
    return this._rays;
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();

    context.lineWidth = 2;
    context.strokeStyle = 'yellow';

    this.rays.forEach(drawLine(context));

    context.restore();
  }

  update() {
    this.castRays();
  }

  private castRays() {
    this._rays = range(0, this.rayCount - 1)
      .map(
        (i) =>
          this.car.angle +
          lerp(
            this.raySpread / 2,
            -this.raySpread / 2,
            this.rayCount === 1 ? 0.5 : i / (this.rayCount - 1)
          )
      )
      .map((rayAngle) => [
        { x: this.car.x, y: this.car.y },
        {
          x: this.car.x - Math.sin(rayAngle) * this.rayLength,
          y: this.car.y - Math.cos(rayAngle) * this.rayLength
        }
      ]);
  }
}

export default CarSensor;
