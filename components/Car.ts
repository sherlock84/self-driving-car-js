import CarControls from './CarControls';

abstract class Car {
  private _angle = 0;
  private _speed = 0;

  constructor(
    protected _x: number,
    protected _y: number,
    protected _width: number,
    protected _height: number,
    public turnRate: number,
    public acceleration: number,
    public maxSpeed: number,
    public friction: number
  ) {}

  abstract get controls(): CarControls;

  get angle() {
    return this._angle;
  }

  get speed() {
    return this._speed;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  mount() {
    this.controls.mount();
  }

  unmount() {
    this.controls.unmount();
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();

    context.translate(this._x, this._y);
    context.rotate(-this._angle);

    context.beginPath();
    context.rect(-this._width / 2, -this._height / 2, this._width, this._height);
    context.fill();

    context.restore();
  }

  update() {
    if (this.controls.forward) {
      this._speed += this.acceleration;
    }
    if (this.controls.reverse) {
      this._speed -= this.acceleration;
    }

    if (this._speed > this.maxSpeed) {
      this._speed = this.maxSpeed;
    }
    if (this._speed < -this.maxSpeed) {
      this._speed = -this.maxSpeed;
    }
    if (this._speed > 0) {
      this._speed -= this.friction;
    }
    if (this._speed < 0) {
      this._speed += this.friction;
    }
    if (Math.abs(this._speed) < this.friction) {
      this._speed = 0;
    }

    if (this.controls.left) {
      this._angle += this.turnRate * Math.sign(this._speed);
    }
    if (this.controls.right) {
      this._angle -= this.turnRate * Math.sign(this._speed);
    }

    this._x -= Math.sin(this.angle) * this._speed;
    this._y -= Math.cos(this.angle) * this._speed;
  }
}

export default Car;
