export function lerp(A: number, B: number, t: number) {
  return A + (B - A) * t;
}

export function range(start: number, end: number) {
  return [..._range(start, end)];
}

function* _range(start: number, end: number) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

export function drawLine(context: CanvasRenderingContext2D) {
  return function (line: Line) {
    context.beginPath();
    context.moveTo(line[0].x, line[0].y);
    context.lineTo(line[1].x, line[1].y);
    context.stroke();
  };
}
