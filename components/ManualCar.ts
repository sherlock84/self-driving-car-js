import Car from './Car';
import ManualCarControls from './ManualCarControls';

class ManualCar extends Car {
  private _controls = new ManualCarControls();

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    turnRate = 0.03,
    acceleration = 0.2,
    maxSpeed = 3,
    friction = 0.05
  ) {
    super(x, y, width, height, turnRate, acceleration, maxSpeed, friction);
  }

  get controls() {
    return this._controls;
  }
}

export default ManualCar;
