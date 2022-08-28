import { drawLine, lerp, range } from './Utils';

class Road {
  private _laneWidth: number;
  private _left: number;
  private _right: number;

  readonly laneSeparators: Array<Line>;
  readonly borders: Array<Line>;

  constructor(
    private _x: number,
    private _width: number,
    public laneCount = 3,
    public top = -1000000,
    public bottom = 1000000
  ) {
    this._laneWidth = _width / laneCount;
    this._left = _x - _width / 2;
    this._right = _x + _width / 2;

    this.laneSeparators = range(1, this.laneCount - 1)
      .map((laneIndex) => lerp(this._left, this._right, laneIndex / this.laneCount))
      .map<Line>((x) => [
        { x, y: this.top },
        { x, y: this.bottom }
      ]);

    const topLeft = { x: this._left, y: this.top };
    const topRight = { x: this._right, y: this.top };
    const bottomLeft = { x: this._left, y: this.bottom };
    const bottomRight = { x: this._right, y: this.bottom };

    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight]
    ];
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();

    context.lineWidth = 5;
    context.strokeStyle = 'white';

    context.setLineDash([20, 20]);
    this.laneSeparators.forEach(drawLine(context));

    context.setLineDash([]);
    this.borders.forEach(drawLine(context));

    context.restore();
  }

  getLaneCenter(laneIndex: number) {
    return (
      this._left + this._laneWidth / 2 + Math.min(laneIndex, this.laneCount - 1) * this._laneWidth
    );
  }
}

export default Road;
