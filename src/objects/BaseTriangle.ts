import TanObject from "./TanObject";
interface XYPair {
  x: number;
  y: number;
}
interface TriPoints {
  p1: XYPair;
  p2: XYPair;
  p3: XYPair;
}

class BaseTriangle extends TanObject {
  points: TriPoints;
  constructor(unit: number, fill: string) {
    super(unit, fill);
    this.points = {
      p1: { x: 0, y: 0 },
      p2: { x: 0, y: (this.unit * Math.sqrt(2)) / 2 },
      p3: {
        x: (this.unit * Math.sqrt(2)) / 2,
        y: (this.unit * Math.sqrt(2)) / 2
      }
    };
    this.updateCentroid();
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.updateCentroid();
    ctx.beginPath();
    // ctx.lineWidth = 2;
    const { p1, p2, p3 } = this.points;
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.stroke;
    ctx.fill();
    ctx.stroke();
  }
}

export default BaseTriangle;
