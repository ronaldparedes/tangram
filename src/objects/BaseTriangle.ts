import TanObject from "./TanObject";
interface XYPair {
  x: number;
  y: number;
}

class BaseTriangle extends TanObject {
  constructor(name: string, unit: number, fill: string) {
    super(name, unit, fill);
    this.points = {
      p1: { x: 0, y: 0 },
      p2: { x: 0, y: (this.unit * Math.sqrt(2)) / 2 },
      p3: {
        x: (this.unit * Math.sqrt(2)) / 2,
        y: (this.unit * Math.sqrt(2)) / 2
      }
    };
    this.setEdges();
    this.updateCentroid();
  }
  rotate(theta: number) {
    super.rotate(theta);
    this.setEdges();
  }
  setEdges() {
    const { p1, p2, p3 } = this.points;
    this.edges.length = 0;
    this.edges.push({
      pA: p1,
      pB: p2,
      slope: this.updateSlope(p1, p2)
    });
    this.edges.push({
      pA: p2,
      pB: p3,
      slope: this.updateSlope(p2, p3)
    });
    this.edges.push({
      pA: p3,
      pB: p1,
      slope: this.updateSlope(p3, p1)
    });
  }
  updateSlope(pA: XYPair, pB: XYPair): number {
    return Math.round(pB.y - pA.y) / Math.round(pB.x - pA.x);
  }
}

export default BaseTriangle;
