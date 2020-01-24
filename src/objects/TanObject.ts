// interface XYPair {
//   x: number;
//   y: number;
// }
type XYPair = {
  x: number;
  y: number;
};
type TriPoints = {
  p1: XYPair;
  p2: XYPair;
  p3: XYPair;
};
type QuadPoints = {
  p1: XYPair;
  p2: XYPair;
  p3: XYPair;
  p4: XYPair;
};
interface Edge {
  pA: XYPair;
  pB: XYPair;
  slope: number;
}

class TanObject {
  name: string;
  unit: number;
  points: TriPoints | QuadPoints;
  edges: Edge[] = [];
  centroid: XYPair;
  fill: string;
  stroke: string;
  lineWidth: number;
  constructor(
    name: string,
    unit = 1,
    fill = "#000",
    stroke = "#000",
    lineWidth = 4
  ) {
    this.name = name;
    this.unit = unit;
    this.fill = fill;
    this.stroke = stroke;
    this.lineWidth = lineWidth;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    ctx.moveTo(this.points.p1.x, this.points.p1.y);
    for (const point in this.points) {
      ctx.lineTo(this.points[point].x, this.points[point].y);
    }
    ctx.closePath();
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.stroke;
    ctx.fill();
    ctx.stroke();
  }
  updateCentroid() {
    let xSum = 0;
    let ySum = 0;
    const pointsLength = Object.keys(this.points).length;
    for (const point in this.points) {
      xSum += this.points[point].x;
      ySum += this.points[point].y;
    }
    this.centroid = {
      x: xSum / pointsLength,
      y: ySum / pointsLength
    };
  }

  translate(deltaXY: XYPair) {
    for (const point in this.points) {
      this.points[point].x += deltaXY.x;
      this.points[point].y += deltaXY.y;
    }
    this.updateCentroid();
  }
  rotate(theta: number) {
    //* ((𝑥1−𝑥0)cos(𝜃)+(𝑦1−𝑦0)sin(𝜃)+𝑥0,
    //* −(𝑥1−𝑥0)sin(𝜃)+(𝑦1−𝑦0)cos(𝜃)+𝑦0)
    const rotatePoint = (point: XYPair): XYPair => {
      return {
        x:
          (point.x - this.centroid.x) * Math.cos(theta) +
          (point.y - this.centroid.y) * Math.sin(theta) +
          this.centroid.x,
        y:
          -(point.x - this.centroid.x) * Math.sin(theta) +
          (point.y - this.centroid.y) * Math.cos(theta) +
          this.centroid.y
      };
    };
    for (const point in this.points) {
      this.points[point] = rotatePoint(this.points[point]);
    }
  }
  flip(delta: number, startPoints: any) {
    //startPoints: XYPair[]) {
    const cX = this.centroid.x;
    this.points.p1.x = cX * delta - (startPoints.p1.x * delta - cX);
    this.points.p2.x = cX * delta - (startPoints.p2.x * delta - cX);
    this.points.p3.x = cX * delta - (startPoints.p3.x * delta - cX);
    if ("p4" in this.points) {
      this.points.p4.x = cX * delta - (startPoints.p4.x * delta - cX);
    }
  }
}

export default TanObject;
