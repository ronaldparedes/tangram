import BaseTriangle from "./BaseTriangle";
import Square from "./Square";
import Parallel from "./Parallel";
import { Tween, Easing, update as tweenUpdate } from "es6-tween";
type XYPair = {
  x: number;
  y: number;
};

export default class TanGame {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  shapes = [];
  selShpIndex: number;
  selDistToShps: number[] = [];
  unit: number;
  dpi: number;
  isAnimating: boolean = false;
  initialLayout = [];
  constructor(canvasElem: HTMLCanvasElement, unit: number) {
    this.dpi = window.devicePixelRatio;
    if (typeof window.orientation !== "undefined") {
      this.dpi = 2;
    }
    this.canvas = canvasElem;
    this.canvas.width = document.documentElement.clientWidth * this.dpi;
    this.canvas.height = document.documentElement.clientHeight * this.dpi;
    this.ctx = this.canvas.getContext("2d");
    this.unit = unit;
  }

  initGame() {
    this.canvas.oncontextmenu = e => e.preventDefault();
    this.setCanvasSize();
    this.setHandlers();
    this.createTamObjects();
    this.setInitialLayout();
    // this.shapes.forEach(shape => {
    //   shape.moveTo({ x: 100, y: 100 });
    // });

    // this.setInitialLayout();
    this.drawObjects();
  }
  setCanvasSize() {
    this.canvas.width = document.documentElement.clientWidth * this.dpi;
    this.canvas.height = document.documentElement.clientHeight * this.dpi;
  }
  setHandlers() {
    let drag: boolean = false;
    let dragStart: XYPair;
    let dragEnd: XYPair;
    let latestTap = 0;
    let timer: number = null;
    const touchCapable: boolean =
      window.ontouchstart === undefined ? false : true;

    const handleCanvasClick = (e: MouseEvent | Touch) => {
      // Coordinates of point clicked|touched
      const clkdPt = { x: e.clientX * this.dpi, y: e.clientY * this.dpi };
      // Data data of pixel clicked/touched
      const pxl = this.ctx.getImageData(clkdPt.x, clkdPt.y, 1, 1).data;
      // Color of pixel clicked/touched
      const clkdColor = `rgb(${pxl[0]}, ${pxl[1]}, ${pxl[2]})`;
      // Get index of shape that maches color of pixel selected. If background, then return false
      this.shapes.forEach((shape, index) => {
        if (clkdColor === shape.fill) {
          this.selShpIndex = index;
        } else {
          if (clkdColor === "rgb(0, 0, 0)") {
            this.selShpIndex = null;
            return false;
          }
        }
      });
      // Set all the shape strokes to black and redraw them.
      this.shapes.forEach(shape => {
        shape.stroke = "black";
        shape.draw(this.ctx);
      });
      // Move the selected shape to the front, set its stroke to red, redraw, return true.
      if (this.selShpIndex !== null) {
        this.shapes.push(this.shapes.splice(this.selShpIndex, 1)[0]);
        this.selShpIndex = this.shapes.length - 1;
        this.shapes[this.selShpIndex].stroke = "red";
        this.shapes[this.selShpIndex].draw(this.ctx);
      }
      return true;
    };
    const handleInputStart = (e: MouseEvent | TouchEvent) => {
      let evt: MouseEvent | Touch;
      // Check if input is from Mobile or Desktop
      if (e.type == "touchstart") {
        evt = (e as TouchEvent).touches[0];
      } else {
        evt = e as MouseEvent;
      }
      // Check if background was clicked/touched, and return if so.
      if (!handleCanvasClick(evt)) {
        return;
      }
      let selShape = this.shapes[this.selShpIndex];
      // Run Flip animation on shape if shape is clicked/touched for at least 500ms
      timer = setTimeout(() => {
        this.animFlipShape([{ shape: selShape }], 300);
      }, 500);
      if (this.selShpIndex !== null) {
        dragStart = {
          x: evt.clientX * this.dpi,
          y: evt.clientY * this.dpi
        };
        drag = true;
      }
      // Check if Double Tap, if so, Rotate object using animation
      let now = new Date().getTime();
      let timeSince = now - latestTap;
      if (timeSince < 300 && timeSince > 0) {
        if (this.selShpIndex !== null) {
          /* Start Rotation Animation */
          this.animRotShape([
            {
              shape: selShape,
              rotPos:
                selShape.rotationPos + 1 === 9 ? 1 : selShape.rotationPos + 1
            }
          ]);
          /* End Rotation Animation */
        }
      }
      latestTap = now;
    };
    const handleInputMove = (e: MouseEvent | TouchEvent) => {
      if (!this.isAnimating) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        let evt: MouseEvent | Touch;
        if (e.type == "touchmove") {
          evt = (e as TouchEvent).touches[0];
        } else {
          evt = e as MouseEvent;
        }

        if (drag) {
          dragEnd = {
            x: evt.clientX * this.dpi,
            y: evt.clientY * this.dpi
          };
          this.shapes[this.selShpIndex].translate({
            x: dragEnd.x - dragStart.x,
            y: dragEnd.y - dragStart.y
          });
          dragStart = dragEnd;
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.drawObjects();
        }
      }
    };
    const handleInputEnd = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (drag) {
        drag = false;
        console.log(this.shapes[this.selShpIndex].rotationPos);
        this.selShpIndex = null;
        this.shapes.forEach(shape => {
          shape.stroke = "black";
          shape.lineWidth = 4;
        });
        this.drawObjects();
      }
    };
    this.canvas.addEventListener(
      touchCapable ? "touchstart" : "mousedown",
      handleInputStart
    );
    this.canvas.addEventListener(
      touchCapable ? "touchmove" : "mousemove",
      handleInputMove
    );
    this.canvas.addEventListener(
      touchCapable ? "touchend" : "mouseup",
      handleInputEnd
    );
  }

  createTamObjects() {
    this.shapes.push(new BaseTriangle("LgTriA", this.unit, "rgb(230, 30, 70)"));
    this.shapes.push(
      new BaseTriangle("LgTriB", this.unit, "rgb(235, 200, 45)")
    );
    this.shapes.push(
      new BaseTriangle("SmTriA", this.unit / 2, "rgb(85, 70, 180)")
    );
    this.shapes.push(
      new BaseTriangle("SmTriB", this.unit / 2, "rgb(220, 130, 180)")
    );
    this.shapes.push(
      new BaseTriangle(
        "MdTri",
        (this.unit * Math.SQRT2) / 2,
        "rgb(25, 150, 225)"
      )
    );
    this.shapes.push(new Square("Square", this.unit, "rgb(100, 200, 165)"));
    this.shapes.push(new Parallel("Parallel", this.unit, "rgb(140, 200, 50)"));
    // shapes.push(new BaseTriangle(this.unit / 8, "rgb(100, 255, 180)"));
  }
  getShapeIndex(name: string) {
    let retIndex = null;
    this.shapes.forEach((shape, index) => {
      if (shape.name === name) {
        retIndex = index;
      }
    });
    return retIndex;
  }
  animRotShape(shapeOps: { shape: any; rotPos: number }[], time: number = 300) {
    shapeOps.forEach(shapeOp => {
      const numOfRot =
        shapeOp.rotPos - shapeOp.shape.rotationPos < 0
          ? 8 + shapeOp.rotPos - shapeOp.shape.rotationPos
          : shapeOp.rotPos - shapeOp.shape.rotationPos;
      const toAngle = numOfRot * 45;
      const rotAngle = { theta: 0 };
      let prevRotAngle = 0;
      const tween = new Tween(rotAngle)
        .to({ theta: degToRad(toAngle) }, time)
        .easing(Easing.Quadratic.Out)
        .on("update", () => {
          shapeOp.shape.rotate(rotAngle.theta - prevRotAngle);
          prevRotAngle = rotAngle.theta;
        })
        .on("complete", () => {
          for (let i = 0; i < numOfRot; i++) {
            shapeOp.shape.increaseRotPos();
          }
        })
        .start();
    });
  }
  animMoveShape(shapesOps: { shape: any; point: XYPair }[], time: number) {
    shapesOps.forEach(shapeOp => {
      const delta = { ...shapeOp.shape.points.p1 };
      const tween = new Tween(delta)
        .to({ ...shapeOp.point }, time)
        .easing(Easing.Quadratic.Out)
        .on("update", () => {
          shapeOp.shape.moveTo({ x: delta.x, y: delta.y });
        })
        .on("complete", () => {})
        .start();
    });
  }
  animFlipShape(shapeOps: { shape: any }[], time: number = 300) {
    this.isAnimating = true;
    shapeOps.forEach(shapeOp => {
      let delta = { value: -1 };
      let startPoints: object = {};
      for (const point in shapeOp.shape.points) {
        startPoints[point] = { ...shapeOp.shape.points[point] };
      }
      const tween = new Tween(delta)
        .to({ value: 1 }, time)
        .easing(Easing.Quadratic.Out)
        .on("update", () => {
          shapeOp.shape.flip(delta.value, startPoints);
        })
        .on("complete", () => {
          this.isAnimating = false;
          const numTo = 2 * ((11 - shapeOp.shape.rotationPos) % 4);
          for (let i = 0; i < numTo; i++) {
            shapeOp.shape.increaseRotPos();
          }
          shapeOp.shape.isFlipped = !shapeOp.shape.isFlipped;
        })
        .start();
    });
  }

  animateToShape(
    shapeProps: { name: string; x: number; y: number; rot: number }[]
  ) {
    this.disableEnableBtns();
    const animTime = 800;
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const shapePropArr = [];
    shapeProps.forEach(shapeProp => {
      shapePropArr.push({
        shape: this.shapes[this.getShapeIndex(shapeProp.name)],
        point: {
          x: centerX + this.unit * shapeProp.x,
          y: centerY + this.unit * shapeProp.y
        },
        rotPos: shapeProp.rot
      });
    });
    this.shapes.forEach(shape => {
      if (shape.isFlipped) {
        this.animFlipShape([{ shape: shape }], animTime / 4);
      }
    });
    setTimeout(() => {
      this.animRotShape(shapePropArr, animTime);
      this.animMoveShape(shapePropArr, animTime);
    }, animTime / 3);
    requestAnimationFrame(this.animate);
  }
  setInitialLayout() {
    const squareShape = [
      { name: "LgTriA", x: -(1 / 2), y: -(1 / 2), rot: 1 },
      { name: "LgTriB", x: 1 / 2, y: -(1 / 2), rot: 7 },
      { name: "SmTriA", x: 1 / 2, y: 0, rot: 5 },
      { name: "SmTriB", x: -(1 / 4), y: 1 / 4, rot: 3 },
      { name: "MdTri", x: 1 / 2, y: 0, rot: 8 },
      { name: "Square", x: 1 / 4, y: -(1 / 4), rot: 1 },
      { name: "Parallel", x: -(1 / 4), y: 1 / 4, rot: 1 }
    ];
    this.animateToShape(squareShape);
  }
  setBunnyLayout() {
    const bunnyShape = [
      { name: "LgTriA", x: 0, y: 0, rot: 1 },
      { name: "LgTriB", x: 1 / 2, y: 1 / 2, rot: 8 },
      { name: "SmTriA", x: -(3.5 / 24), y: -(3 / 4), rot: 6 },
      { name: "SmTriB", x: -(1 / 2), y: -(3 / 4), rot: 2 },
      { name: "MdTri", x: 0, y: 1 / 4, rot: 8 },
      { name: "Square", x: -(1 / 3), y: -(3 / 8), rot: 2 },
      { name: "Parallel", x: 0, y: -(3 / 4), rot: 2 }
    ];
    this.animateToShape(bunnyShape);
  }
  setHorseLayout() {
    const horseShape = [
      { name: "LgTriA", x: -(17 / 24), y: 0, rot: 2 },
      { name: "LgTriB", x: 0, y: 0, rot: 1 },
      { name: "SmTriA", x: -(23 / 24), y: 1 / 4, rot: 3 },
      { name: "SmTriB", x: 0, y: 3 / 4, rot: 8 },
      { name: "MdTri", x: -(17 / 24), y: -(8.5 / 24), rot: 3 },
      { name: "Square", x: 0, y: 0, rot: 6 },
      { name: "Parallel", x: 1 / 2, y: 1, rot: 3 }
    ];
    this.animateToShape(horseShape);
  }
  setPersonLayout() {
    const personShape = [
      { name: "LgTriA", x: 1 / this.unit, y: 0, rot: 8 },
      { name: "LgTriB", x: -(1 / 4), y: 1 / 4, rot: 4 },
      { name: "SmTriA", x: -1, y: 1, rot: 4 },
      { name: "SmTriB", x: 0, y: 5 / 4, rot: 5 },
      { name: "MdTri", x: 1 / this.unit, y: 1 / 4, rot: 1 },
      { name: "Square", x: 0, y: -1, rot: 1 },
      { name: "Parallel", x: -(29 / 48), y: -(5 / 48), rot: 2 }
    ];
    this.animateToShape(personShape);
  }
  disableEnableBtns() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
      button.disabled = true;
    });
    setTimeout(() => {
      buttons.forEach(button => {
        button.disabled = false;
      });
    }, 850);
  }
  drawObjects() {
    this.shapes.forEach(shape => {
      shape.draw(this.ctx);
    });
  }
  animate = (time: number) => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawObjects();
    tweenUpdate(time);
    requestAnimationFrame(this.animate);
  };
}

function degToRad(degree: number): number {
  return (degree * Math.PI) / 180;
}
