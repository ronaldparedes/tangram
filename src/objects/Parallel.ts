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

class Parallel extends TanObject {
  points: QuadPoints;
  constructor(unit: number, fill: string) {
    super(unit, fill);
    const shortSide = unit * (1 / 4);
    this.points = {
      p1: { x: shortSide, y: 0 },
      p2: { x: 0, y: shortSide },
      p3: { x: this.unit / 2, y: shortSide },
      p4: { x: shortSide + this.unit / 2, y: 0 }
    };
    this.updateCentroid();
  }
  flip() {
    const { p1, p2, p3, p4 } = this.points;
    const cX = this.centroid.x;
    this.points.p1.x = cX - (p1.x - cX);
    this.points.p2.x = cX - (p2.x - cX);
    this.points.p3.x = cX - (p3.x - cX);
    this.points.p4.x = cX - (p4.x - cX);
  }
  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    this.updateCentroid();
    ctx.beginPath();
    const { p1, p2, p3, p4 } = this.points;
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

export default Parallel;
