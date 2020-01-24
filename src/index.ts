import TanGame from "./objects/TanGame";

// Prevent window from zooming.
document.addEventListener(
  "touchmove",
  e => {
    e.preventDefault();
  },
  { passive: false }
);

const canvas = document.getElementById("app") as HTMLCanvasElement;
const tanGame = new TanGame(canvas, 400);
tanGame.initGame();

// Adjust Canvas size on window resize
window.onresize = () => {
  tanGame.setCanvasSize();
  tanGame.ctx.clearRect(0, 0, canvas.width, canvas.height);
  tanGame.drawObjects();
};
