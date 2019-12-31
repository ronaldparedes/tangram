interface XYPair {
  x: number;
  y: number;
}
interface TriPoints {
  p1: XYPair;
  p2: XYPair;
  p3: XYPair;
}
interface QuadPoints {
  p1: XYPair;
  p2: XYPair;
  p3: XYPair;
  p4: XYPair;
}

class TanObject {
  unit: number;
  points: TriPoints | QuadPoints;
  centroid: XYPair;
  fill: string;
  stroke: string;
  constructor(
    unit: number = 1,
    fill: string = "#000",
    stroke: string = "#000"
  ) {
    this.unit = unit;
    this.fill = fill;
    this.stroke = stroke;
  }
  draw(ctx: CanvasRenderingContext2D) {}
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
  move(e: KeyboardEvent) {
    const moveAmout = e.shiftKey ? 25 : 1;
    switch (e.key) {
      case "ArrowUp":
        for (const point in this.points) {
          this.points[point].y -= moveAmout;
        }
        break;
      case "ArrowDown":
        for (const point in this.points) {
          this.points[point].y += moveAmout;
        }
        break;
      case "ArrowLeft":
        for (const point in this.points) {
          this.points[point].x -= moveAmout;
        }
        break;
      case "ArrowRight":
        for (const point in this.points) {
          this.points[point].x += moveAmout;
        }
        break;
      case "r" || "R":
        this.rotate((45 * Math.PI) / 180);
        break;
      default:
        break;
    }
    this.updateCentroid();
  }
  translate(deltaXY: XYPair) {
    for (const point in this.points) {
      this.points[point].x += deltaXY.x;
      this.points[point].y += deltaXY.y;
    }
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
}
export default TanObject;
