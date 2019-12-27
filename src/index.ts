const dpi = window.devicePixelRatio;
const canvas = document.getElementById("app") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

let unit: number;
function setCanvasSize() {
  // canvas.width = window.innerWidth * dpi;
  // canvas.height = window.innerHeight * dpi;
  canvas.width = document.documentElement.clientWidth * dpi;
  canvas.height = document.documentElement.clientHeight * dpi;
  unit = Math.floor(
    0.8 * (canvas.width < canvas.height ? canvas.width : canvas.height)
  );
}
setCanvasSize();
ctx.lineWidth = 2;
ctx.strokeStyle = "#222";

const tri = {
  p1: { x: 0, y: 0 },
  p2: { x: 0, y: Math.sqrt(2) / 2 },
  p3: { x: Math.sqrt(2) / 2, y: Math.sqrt(2) / 2 }
};

function baseTri(unit: number) {
  ctx.beginPath();
  ctx.moveTo(tri.p1.x * unit, tri.p1.y * unit);
  ctx.lineTo(tri.p2.x * unit, tri.p2.y * unit);
  ctx.lineTo(tri.p3.x * unit, tri.p3.y * unit);
  ctx.closePath();
}
function DrawLgTriA() {
  ctx.translate((canvas.width - unit) / 2, (canvas.height - unit) / 2);
  ctx.scale(-1, 1);
  ctx.rotate((45 * Math.PI) / 180);
  baseTri(unit);
  ctx.stroke();
  ctx.fillStyle = "rgba(255, 120, 0, 0.8)";
  ctx.fill();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function DrawLgTriB() {
  ctx.translate((canvas.width - unit) / 2, (canvas.height - unit) / 2);
  ctx.rotate((-45 * Math.PI) / 180);
  baseTri(unit);
  ctx.fillStyle = "rgba(0, 200, 0, .8)";
  ctx.stroke();
  ctx.fill();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function DrawMdTri() {
  ctx.translate(
    (canvas.width - unit) / 2 + unit / 2,
    (canvas.height - unit) / 2 + unit
  );
  ctx.rotate((-90 * Math.PI) / 180);
  baseTri((unit * Math.sqrt(2)) / 2);
  ctx.fillStyle = "rgba(255,0,0,.8)";
  ctx.stroke();
  ctx.fill();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function DrawSmTriA() {
  ctx.translate(
    (canvas.width - unit) / 2 + (unit * 3) / 4,
    (canvas.height - unit) / 2 + (unit * 3) / 4
  );
  ctx.rotate((135 * Math.PI) / 180);
  baseTri(unit / 2);
  ctx.fillStyle = "rgba(0, 0, 110, 0.8)";
  ctx.stroke();
  ctx.fill();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function DrawSmTriB() {
  ctx.translate((canvas.width - unit) / 2 + unit, (canvas.height - unit) / 2);
  ctx.rotate((45 * Math.PI) / 180);
  baseTri(unit / 2);
  ctx.fillStyle = "rgba(230, 50, 150, 0.8)";
  ctx.stroke();
  ctx.fill();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function DrawSquare() {
  ctx.beginPath();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((-45 * Math.PI) / 180);
  ctx.rect(0, 0, (unit * Math.sqrt(2)) / 4, (unit * Math.sqrt(2)) / 4);
  ctx.fillStyle = "rgba(247, 202, 24, 0.8)";
  ctx.stroke();
  ctx.fill();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function DrawParal() {
  ctx.beginPath();
  ctx.translate((canvas.width - unit) / 2, (canvas.height - unit) / 2 + unit);

  ctx.moveTo(0, 0);
  ctx.lineTo(unit / 2, 0);
  ctx.lineTo((unit * 3) / 4, -unit / 4);
  ctx.lineTo(unit / 4, -unit / 4);
  ctx.closePath();
  ctx.fillStyle = "rgba(20, 20, 255, 0.8)";
  ctx.stroke();
  ctx.fill();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function DrawCanvas() {
  DrawLgTriA();
  DrawLgTriB();
  DrawMdTri();
  DrawSmTriA();
  DrawSmTriB();
  DrawSquare();
  DrawParal();
}
DrawCanvas();

window.onresize = () => {
  // Adjust Canvas size
  setCanvasSize();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  DrawCanvas();
};
