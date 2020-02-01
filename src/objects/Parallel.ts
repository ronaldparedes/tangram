import TanObject from "./TanObject";

class Parallel extends TanObject {
  constructor(name: string, unit: number, fill: string) {
    super(name, unit, fill);
    const shortSide = unit * (1 / 4);
    this.points = {
      p1: { x: shortSide, y: 0 },
      p2: { x: 0, y: shortSide },
      p3: { x: unit / 2, y: shortSide },
      p4: { x: shortSide + unit / 2, y: 0 }
    };
    this.updateCentroid();
  }
}

export default Parallel;
