import BaseTriangle from "./objects/BaseTriangle";
import Square from "./objects/Square";
import Parallel from "./objects/Parallel";

interface XYPair {
  x: number;
  y: number;
}
let dpi = window.devicePixelRatio;
if (typeof window.orientation !== "undefined") {
  dpi = 1;
}
const canvas = document.getElementById("app") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
canvas.oncontextmenu = e => e.preventDefault();
let unit: number = 600;
function setCanvasSize() {
  canvas.width = document.documentElement.clientWidth * dpi;
  canvas.height = document.documentElement.clientHeight * dpi;
}
setCanvasSize();
ctx.lineWidth = 3;
ctx.strokeStyle = "#222";

document.addEventListener("keydown", e => {
  shapes[selShpIndex].move(e);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  DrawObjects();
});
// canvas.addEventListener("click", e => handleCanvasClick(e));

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
      shapes[selShpIndex].flip();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      DrawObjects();
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
      shapes[selShpIndex].rotate((45 * Math.PI) / 180);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      DrawObjects();
    }
  }
  latestTap = now;
};
// canvas.addEventListener("mousedown", handleInputStart);
canvas.addEventListener("touchstart", handleInputStart);
const handleInputMove = (e: MouseEvent | TouchEvent) => {
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
    shapes[shapes.length - 1].stroke = "black";
    shapes[shapes.length - 1].draw(ctx);
  }
};
// canvas.addEventListener("mousemove", handleInputMove);
canvas.addEventListener("touchmove", handleInputMove);
canvas.addEventListener("touchend", handleInputEnd);
// canvas.addEventListener("mouseup", () => {
//   if (drag) {
//     drag = false;
//     selShpIndex = null;
//     DrawObjects();
//   }
// });

const shapes = [];
let selShpIndex: number;

function createTamObjects() {
  shapes.push(new BaseTriangle(unit, "rgb(230, 30, 70)"));
  shapes.push(new BaseTriangle(unit, "rgb(235, 200, 45)"));
  shapes.push(new BaseTriangle(unit / 2, "rgb(85, 70, 180)"));
  shapes.push(new BaseTriangle(unit / 2, "rgb(220, 130, 180)"));
  shapes.push(new BaseTriangle((unit * Math.sqrt(2)) / 2, "rgb(25, 150, 225)"));
  shapes.push(new Square(unit, "rgb(100, 200, 165)"));
  shapes.push(new Parallel(unit, "rgb(140, 200, 50)"));
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
  // shapes[7].translate({
  //   x: canvas.width / 2,
  //   y: canvas.height / 2
  // });
  // shapes[7].stroke = "red";
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
