import TanObject from "./TanObject";

class BaseTriangle extends TanObject {
  constructor(name: string, unit: number, fill: string) {
    super(name, unit, fill);
    this.points = {
      p1: { x: 0, y: 0 },
      p2: { x: 0, y: unit },
      p3: {
        x: unit / 2,
        y: unit / 2
      }
    };
    this.updateCentroid();
  }
}

export default BaseTriangle;
