import BaseTriangle from "./BaseTriangle";
import Square from "./Square";
import Parallel from "./Parallel";
import TWEEN from "../lib/tween.umd";
interface XYPair {
  x: number;
  y: number;
}
export default class TanGame {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  shapes = [];
  selShpIndex: number;
  selDistToShps: number[] = [];
  unit: number;
  dpi: number;
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
    let isAnimating: boolean = false;
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
      // Run Flip animation on shape if shape is clicked/touched for at least 500ms
      timer = setTimeout(() => {
        isAnimating = true;
        let delta = { value: -1 };
        let index = this.selShpIndex;
        let startPoints: object = {};
        for (const point in this.shapes[index].points) {
          startPoints[point] = { ...this.shapes[index].points[point] };
        }
        const tween = new TWEEN.Tween(delta) // Create a new tween that modifies 'coords'.
          .to({ value: 1 }, 300)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(() => {
            this.shapes[index].flip(delta.value, startPoints);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawObjects();
          })
          .onComplete(() => {
            isAnimating = false;
          })
          .start(); // Start the tween immediately.
        requestAnimationFrame(this.animate);
      }, 500);
      // If not flipped, check if shape is selected and start translate code
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
          let rotAngle = { theta: 0 };
          let index = this.selShpIndex;
          let prevRotAngle = 0;

          const tween = new TWEEN.Tween(rotAngle) // Create a new tween that modifies 'coords'.
            .to({ theta: (45 * Math.PI) / 180 }, 300)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(() => {
              this.shapes[index].rotate(rotAngle.theta - prevRotAngle);
              prevRotAngle = rotAngle.theta;
              this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
              this.drawObjects();
            })
            .onComplete(() => {})
            .start(); // Start the tween immediately.
          requestAnimationFrame(this.animate);
          /* End Rotation Animation */
        }
      }
      latestTap = now;
    };
    const handleInputMove = (e: MouseEvent | TouchEvent) => {
      if (!isAnimating) {
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
          // checkShapeDist();
          // checkEdgeDist();
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
        this.selShpIndex = null;
        this.shapes.forEach(shape => {
          shape.stroke = "black";
          shape.lineWidth = 4;
        });
        this.drawObjects();
        // shapes[shapes.length - 1].stroke = "black";
        // shapes[shapes.length - 1].draw(ctx);
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
        (this.unit * Math.sqrt(2)) / 2,
        "rgb(25, 150, 225)"
      )
    );
    this.shapes.push(new Square("Square", this.unit, "rgb(100, 200, 165)"));
    this.shapes.push(new Parallel("Parallel", this.unit, "rgb(140, 200, 50)"));
    // shapes.push(new BaseTriangle(this.unit / 8, "rgb(100, 255, 180)"));
  }
  setInitialLayout() {
    this.shapes[0].rotate(degToRad(135));
    this.shapes[0].translate({
      x: this.canvas.width / 2 - this.unit * (72.8 / 128),
      y: this.canvas.height / 2 - this.unit * (60.4 / 128)
    });
    this.shapes[1].rotate(degToRad(45));
    this.shapes[1].translate({
      x: this.canvas.width / 2 - this.unit * (30.15 / 128),
      y: this.canvas.height / 2 - this.unit * (103.2 / 128)
    });
    this.shapes[2].rotate(degToRad(-45));
    this.shapes[2].translate({
      x: this.canvas.width / 2 + this.unit * (38.3 / 128),
      y: this.canvas.height / 2 - this.unit * (62.3 / 128)
    });
    this.shapes[3].rotate(degToRad(225));
    this.shapes[3].translate({
      x: this.canvas.width / 2 - this.unit * (15.0 / 128),
      y: this.canvas.height / 2 - this.unit * (8.9 / 128)
    });
    this.shapes[4].rotate(degToRad(90));
    this.shapes[4].translate({
      x: this.canvas.width / 2 + this.unit * (21.4 / 128),
      y: this.canvas.height / 2
    });
    this.shapes[5].rotate(degToRad(45));
    this.shapes[5].translate({
      x: this.canvas.width / 2 + this.unit * (9.4 / 128),
      y: this.canvas.height / 2 - this.unit * (22.7 / 128)
    });
    this.shapes[6].translate({
      x: this.canvas.width / 2 - this.unit * (1 / 2),
      y: this.canvas.height / 2 + this.unit * (1 / 4)
    });
  }
  drawObjects() {
    this.shapes.forEach(shape => {
      shape.draw(this.ctx);
    });
  }
  animate = (time: number) => {
    requestAnimationFrame(this.animate);
    TWEEN.update(time);
  };
}

function degToRad(degree: number): number {
  return (degree * Math.PI) / 180;
}
