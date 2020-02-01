import TanObject from "./TanObject";

class Square extends TanObject {
  constructor(name: string, unit: number, fill: string) {
    super(name, unit, fill);
    this.points = {
      p1: { x: unit / 4, y: 0 },
      p2: { x: 0, y: unit / 4 },
      p3: { x: unit / 4, y: unit / 2 },
      p4: { x: unit / 2, y: unit / 4 }
    };
    this.updateCentroid();
  }
}

export default Square;
