import BaseTriangle from "./objects/BaseTriangle";
import Square from "./objects/Square";
import Parallel from "./objects/Parallel";
import TWEEN from "./lib/tween.umd";

// Prevent window from zooming.
document.addEventListener(
  "touchmove",
  e => {
    e.preventDefault();
  },
  { passive: false }
);

interface XYPair {
  x: number;
  y: number;
}
let dpi = window.devicePixelRatio;
if (typeof window.orientation !== "undefined") {
  dpi = 2;
}
const canvas = document.getElementById("app") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
canvas.oncontextmenu = e => e.preventDefault();
// let unit: number = 560 / Math.sqrt(2);
let unit: number = 400;
function setCanvasSize() {
  canvas.width = document.documentElement.clientWidth * dpi;
  canvas.height = document.documentElement.clientHeight * dpi;
}
setCanvasSize();
document.addEventListener("keydown", e => {
  if (selShpIndex) {
    shapes[selShpIndex].move(e);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    DrawObjects();
  }
});

const handleCanvasClick = (e: MouseEvent) => {
  const clkdPt = { x: e.clientX * dpi, y: e.clientY * dpi };
  const pxl = ctx.getImageData(clkdPt.x, clkdPt.y, 1, 1).data;
  const clkdColor = `rgb(${pxl[0]}, ${pxl[1]}, ${pxl[2]})`;
  shapes.forEach((shape, index) => {
    if (clkdColor === shape.fill) {
      selShpIndex = index;
    } else {
      if (clkdColor === "rgb(0, 0, 0)") {
        selShpIndex = null;
        return false;
      }
    }
  });
  shapes.forEach(shape => {
    shape.stroke = "black";
    shape.draw(ctx);
  });
  if (selShpIndex !== null) {
    shapes.push(shapes.splice(selShpIndex, 1)[0]);
    selShpIndex = shapes.length - 1;
    shapes[selShpIndex].stroke = "red";
    shapes[selShpIndex].draw(ctx);
  }
  return true;
};

let drag: boolean = false;
let dragStart: XYPair;
let dragEnd: XYPair;
let isAnimating: boolean = false;
let latestTap = 0;
let timer: number = null;
const handleInputStart = (e: MouseEvent | TouchEvent) => {
  let evt: MouseEvent | Touch;
  if (e.type == "touchstart") {
    evt = (e as TouchEvent).touches[0];
  } else {
    evt = e as MouseEvent;
  }
  if (!handleCanvasClick(evt as any)) {
    return;
  }
  timer = setTimeout(() => {
    if (shapes[selShpIndex].flip !== undefined) {
      isAnimating = true;
      let delta = { value: -1 };
      let index = selShpIndex;
      let startPoints: XYPair[] = [];
      for (const point in shapes[index].points) {
        startPoints.push(
          JSON.parse(JSON.stringify(shapes[index].points[point]))
        );
      }
      const tween = new TWEEN.Tween(delta) // Create a new tween that modifies 'coords'.
        .to({ value: 1 }, 300)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          shapes[index].flip(delta.value, startPoints);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          DrawObjects();
        })
        .onComplete(() => {
          isAnimating = false;
        })
        .start(); // Start the tween immediately.
      requestAnimationFrame(animate);
    }
  }, 500);
  if (selShpIndex !== null) {
    dragStart = {
      x: evt.clientX * dpi,
      y: evt.clientY * dpi
    };
    drag = true;
  }
  // Check if Double Tap
  let now = new Date().getTime();
  let timeSince = now - latestTap;
  if (timeSince < 300 && timeSince > 0) {
    if (selShpIndex !== null) {
      /* Start Rotation Animation */
      let rotAngle = { theta: 0 };
      let index = selShpIndex;
      let prevRotAngle = 0;
      console.log(
        `${shapes[index].name}, Cent:${shapes[index].centroid.x}, ${shapes[index].centroid.y}`
      );
      console.table(shapes[index].points);

      const tween = new TWEEN.Tween(rotAngle) // Create a new tween that modifies 'coords'.
        .to({ theta: (45 * Math.PI) / 180 }, 300)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          shapes[index].rotate(rotAngle.theta - prevRotAngle);
          prevRotAngle = rotAngle.theta;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          DrawObjects();
        })
        .onComplete(() => {
          console.log(
            `${shapes[index].name}, Cent:${shapes[index].centroid.x}, ${shapes[index].centroid.y}`
          );
          console.table(shapes[index].points);
        })
        .start(); // Start the tween immediately.
      requestAnimationFrame(animate);
      /* End Rotation Animation */
    }
  }
  latestTap = now;
};
/* Run animation Frame */
function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}
const touchCapable: boolean = window.ontouchstart === undefined ? false : true;

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
        x: evt.clientX * dpi,
        y: evt.clientY * dpi
      };
      shapes[selShpIndex].translate({
        x: dragEnd.x - dragStart.x,
        y: dragEnd.y - dragStart.y
      });
      dragStart = dragEnd;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      DrawObjects();
      checkShapeDist();
      checkEdgeDist();
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
    selShpIndex = null;
    shapes.forEach(shape => {
      shape.stroke = "black";
      shape.lineWidth = 4;
    });
    DrawObjects();
    // shapes[shapes.length - 1].stroke = "black";
    // shapes[shapes.length - 1].draw(ctx);
  }
};
canvas.addEventListener(
  touchCapable ? "touchstart" : "mousedown",
  handleInputStart
);
canvas.addEventListener(
  touchCapable ? "touchmove" : "mousemove",
  handleInputMove
);
canvas.addEventListener(touchCapable ? "touchend" : "mouseup", handleInputEnd);

const shapes = [];
const selDistToShps: number[] = [];
let selShpIndex: number;
function getDist(centA: XYPair, centB: XYPair): number {
  return Math.abs(
    Math.sqrt(Math.pow(centB.x - centA.x, 2) + Math.pow(centB.y - centA.y, 2))
  );
}
function checkShapeDist() {
  selDistToShps.length = 0;
  shapes.forEach(shape => {
    if (shape !== shapes[selShpIndex]) {
      selDistToShps.push(getDist(shapes[selShpIndex].centroid, shape.centroid));
    }
  });
  shapes.forEach((shape, index) => {
    if (shape !== shapes[selShpIndex]) {
      if (selDistToShps[index] < unit / 3) {
        shape.stroke = "blue";
        shape.lineWidth = 6;
      } else {
        shape.stroke = "black";
        shape.lineWidth = 4;
      }
    }
  });
  DrawObjects();
}
function checkEdgeDist() {
  shapes.forEach(shape => {
    const dist = getDist(shapes[selShpIndex].centroid, shape.centroid);
    if (shapes[selShpIndex] !== shape && dist < 200) {
      if (shapes[selShpIndex].edges.slope !== undefined) {
        if (shapes[selShpIndex].edges[0].slope === shape.edges[0].slope) {
          ctx.beginPath();
          ctx.moveTo(shape.edges[0].pA.x, shape.edges[0].pA.y);
          ctx.lineTo(shape.edges[0].pB.x, shape.edges[0].pB.y);
          ctx.strokeStyle = "orange";
          ctx.stroke();
          shapes[selShpIndex].translate();
        }
      }
    }
  });
  // console.count("Checking Egde Distance");
}
function createTamObjects() {
  shapes.push(new BaseTriangle("LgTriA", unit, "rgb(230, 30, 70)"));
  shapes.push(new BaseTriangle("LgTriB", unit, "rgb(235, 200, 45)"));
  shapes.push(new BaseTriangle("SmTriA", unit / 2, "rgb(85, 70, 180)"));
  shapes.push(new BaseTriangle("SmTriB", unit / 2, "rgb(220, 130, 180)"));
  shapes.push(
    new BaseTriangle("MdTri", (unit * Math.sqrt(2)) / 2, "rgb(25, 150, 225)")
  );
  shapes.push(new Square("Square", unit, "rgb(100, 200, 165)"));
  shapes.push(new Parallel("Parallel", unit, "rgb(140, 200, 50)"));
  // shapes.push(new BaseTriangle(unit / 8, "rgb(100, 255, 180)"));
}
function DrawObjects() {
  shapes.forEach(shape => {
    shape.draw(ctx);
  });
}
function degToRad(degree: number): number {
  return (degree * Math.PI) / 180;
}
function setInitialLayout() {
  shapes[0].rotate(degToRad(135));
  shapes[0].translate({
    x: canvas.width / 2 - unit * (72.8 / 128),
    y: canvas.height / 2 - unit * (60.4 / 128)
  });
  shapes[1].rotate(degToRad(45));
  shapes[1].translate({
    x: canvas.width / 2 - unit * (30.15 / 128),
    y: canvas.height / 2 - unit * (103.2 / 128)
  });
  shapes[2].rotate(degToRad(-45));
  shapes[2].translate({
    x: canvas.width / 2 + unit * (38.3 / 128),
    y: canvas.height / 2 - unit * (62.3 / 128)
  });
  shapes[3].rotate(degToRad(225));
  shapes[3].translate({
    x: canvas.width / 2 - unit * (15.0 / 128),
    y: canvas.height / 2 - unit * (8.9 / 128)
  });
  shapes[4].rotate(degToRad(90));
  shapes[4].translate({
    x: canvas.width / 2 + unit * (21.4 / 128),
    y: canvas.height / 2
  });
  shapes[5].rotate(degToRad(45));
  shapes[5].translate({
    x: canvas.width / 2 + unit * (9.4 / 128),
    y: canvas.height / 2 - unit * (22.7 / 128)
  });
  shapes[6].translate({
    x: canvas.width / 2 - unit * (1 / 2),
    y: canvas.height / 2 + unit * (1 / 4)
  });
  DrawObjects();
}
window.onresize = () => {
  // Adjust Canvas size
  setCanvasSize();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  DrawObjects();
};
createTamObjects();
setInitialLayout();
