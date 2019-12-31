import TanObject from "./TanObject";
interface XYPair {
  x: number;
  y: number;
}
interface QuadPoints {
  p1: XYPair;
  p2: XYPair;
  p3: XYPair;
  p4: XYPair;
}

class Square extends TanObject {
  points: QuadPoints;
  constructor(unit: number, fill: string) {
    super(unit, fill);
    this.points = {
      p1: { x: 0, y: 0 },
      p2: { x: 0, y: (unit * Math.sqrt(2)) / 4 },
      p3: { x: (unit * Math.sqrt(2)) / 4, y: (unit * Math.sqrt(2)) / 4 },
      p4: { x: (unit * Math.sqrt(2)) / 4, y: 0 }
    };
    this.updateCentroid();
  }
  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);

    this.updateCentroid();
    const { p1, p2, p3, p4 } = this.points;
    ctx.beginPath();
    // ctx.lineWidth = 2;
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.closePath();
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.stroke;
    ctx.fill();
    ctx.stroke();
  }
}

export default Square;
