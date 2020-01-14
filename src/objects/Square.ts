import TanObject from "./TanObject";

class Square extends TanObject {
  constructor(name: string, unit: number, fill: string) {
    super(name, unit, fill);
    this.points = {
      p1: { x: 0, y: 0 },
      p2: { x: 0, y: (unit * Math.sqrt(2)) / 4 },
      p3: { x: (unit * Math.sqrt(2)) / 4, y: (unit * Math.sqrt(2)) / 4 },
      p4: { x: (unit * Math.sqrt(2)) / 4, y: 0 }
    };
    this.updateCentroid();
  }
}

export default Square;
