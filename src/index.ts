import TanGame from "./objects/TanGame";

// Prevent window from zooming.
document.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
  },
  { passive: false }
);
if (window.orientation !== undefined) {
  document.querySelector(".controls").classList.add("mobile");
  document.querySelector(".controlLabel").classList.add("mobile");
}

const canvas = document.getElementById("app") as HTMLCanvasElement;
const tanGame = new TanGame(canvas, 398);
tanGame.initGame();

// Set viewport height for Mobile (for controls layout)
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

// Adjust Canvas size on window resize
window.onresize = () => {
  tanGame.setCanvasSize();
  tanGame.ctx.clearRect(0, 0, canvas.width, canvas.height);
  tanGame.drawObjects();
};

const bunnyBtn = document.querySelector(".bunnyBtn");
const squareBtn = document.querySelector(".squareBtn");
const horseBtn = document.querySelector(".horseBtn");
const personBtn = document.querySelector(".personBtn");

squareBtn.addEventListener("click", () => tanGame.setInitialLayout());
bunnyBtn.addEventListener("click", () => tanGame.setBunnyLayout());
horseBtn.addEventListener("click", () => tanGame.setHorseLayout());
personBtn.addEventListener("click", () => tanGame.setPersonLayout());
