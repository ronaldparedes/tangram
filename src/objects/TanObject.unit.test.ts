import TanObject from "./TanObject";
import "jest-canvas-mock";
import CanvasRenderingContext2D from "jest-canvas-mock/lib/classes/CanvasRenderingContext2D";

console.dir(CanvasRenderingContext2D);

// beforeEach(() => {
//   ctx = CanvasRenderingContext2D;
// });
describe("Tan Object Test", () => {
  it("should create a Generic Tan Object", () => {
    const myTan = new TanObject("MyTanObject");
    expect(myTan.name).toBe("MyTanObject");
    myTan.points = {
      p1: { x: 0, y: 0 },
      p2: { x: 0, y: 40 },
      p3: { x: 30, y: 40 }
    };
    expect(myTan.points).not.toBe(undefined);
    myTan.updateCentroid();
    expect(myTan.centroid).toStrictEqual({ x: 10, y: 80 / 3 });
    myTan.translate({ x: 100, y: 200 });
    expect(myTan.points).toStrictEqual({
      p1: { x: 100, y: 200 },
      p2: { x: 100, y: 240 },
      p3: { x: 130, y: 240 }
    });
    // const ctx = canvas.getContext("2d");
    // expect(ctx.arc(1, 2, 3, 4, 5)).toThrow(Error);
  });
});
