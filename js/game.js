let canvas;
let world;
let keyboard = new Keyboard();
let gameIsRunning = false;
let intervals = [];
let backgroundMusic = new Audio("audio/background-music.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.1;

window.onload = () => {
  document.getElementById("start-menu").classList.remove("hidden");
  document.getElementById("controls-screen").classList.add("hidden");
  document.getElementById("canvas").classList.add("hidden");
  const savedMute = localStorage.getItem("isMuted");
  isMuted = savedMute === "true";

  document.getElementById("mute-btn").innerText = isMuted ? "🔇" : "🔊";
  backgroundMusic.muted = isMuted;
  const btnLeft = document.getElementById("btn-left");
  const btnRight = document.getElementById("btn-right");
  const btnUp = document.getElementById("btn-up");
  const btnDown = document.getElementById("btn-down");
  const btnBubble = document.getElementById("btn-bubble");
  const btnFin = document.getElementById("btn-fin");
  const btnHeal = document.getElementById("btn-heal");

  setupControlButton(btnLeft, "LEFT");
  setupControlButton(btnRight, "RIGHT");
  setupControlButton(btnUp, "UP");
  setupControlButton(btnDown, "DOWN");
  setupControlButton(btnBubble, "D");
  setupControlButton(btnFin, "SPACE");
  setupControlButton(btnHeal, "E");
};

function startGame() {
  document.getElementById("start-menu").classList.add("hidden");
  document.getElementById("canvas").classList.remove("hidden");
  document.getElementById("game-container").classList.remove("hidden");
  backgroundMusic.play();

  init();
}

function init() {
  gameIsRunning = true;
  canvas = document.getElementById("canvas");
  keyboard = new Keyboard();
  world = new World(canvas, keyboard);
  [
    backgroundMusic,
    world?.character?.swimSound,
    world?.character?.loseSound,
    world?.character?.bubbleSound,
    world?.character?.finSound,
    world?.character?.damageSound,
    world?.coinSound,
    world?.poisonSound,
    world?.healSound,
    world?.enemyDeadSound,
    world?.endboss?.winSound,
  ].forEach((sound) => {
    if (sound) sound.muted = isMuted;
  });
}

function showControls() {
  document.getElementById("start-menu").classList.add("hidden");
  document.getElementById("controls-screen").classList.remove("hidden");
}

function hideControls() {
  document.getElementById("controls-screen").classList.add("hidden");
  document.getElementById("start-menu").classList.remove("hidden");
}

function showImprint() {
  document.getElementById("start-menu").classList.add("hidden");
  document.getElementById("imprint-screen").classList.remove("hidden");
}

function hideImprint() {
  document.getElementById("imprint-screen").classList.add("hidden");
  document.getElementById("start-menu").classList.remove("hidden");
}

let isMuted = false;

function toggleMute() {
  isMuted = !isMuted;
  localStorage.setItem("isMuted", isMuted);
  document.getElementById("mute-btn").innerText = isMuted ? "🔇" : "🔊";
  const endbossSound = world?.endboss?.winSound;

  // Add all Sounds here
  [
    backgroundMusic,
    world?.character?.swimSound,
    world?.character?.loseSound,
    world?.character?.bubbleSound,
    world?.character?.finSound,
    world?.character?.damageSound,
    world?.coinSound,
    world?.poisonSound,
    world?.healSound,
    world?.enemyDeadSound,
    world?.endboss?.winSound,
  ].forEach((sound) => {
    if (sound) sound.muted = isMuted;
  });
}

function showGameOver() {
  document.getElementById("game-over-screen").classList.remove("hidden");
  gameIsRunning = false;
  if (backgroundMusic) backgroundMusic.pause();
}

function showGameWon() {
  document.getElementById("game-won-screen").classList.remove("hidden");
  gameIsRunning = false;
  if (backgroundMusic) backgroundMusic.pause();
}

function restartGame() {
  document.getElementById("game-over-screen").classList.add("hidden");
  document.getElementById("game-won-screen").classList.add("hidden");
  gameIsRunning = true;

  intervals.forEach(clearInterval);
  intervals = [];

  if (world) {
    world = null;
  }

  init();
  backgroundMusic.currentTime = 0;
  backgroundMusic.muted = isMuted;
  if (!isMuted) backgroundMusic.play();
}

function checkOrientation() {
  const overlay = document.getElementById("airplane-mode-overlay");
  const mobileControls = document.getElementById("mobile-controls");
  const isPortrait = window.innerHeight > window.innerWidth;
  const isNarrowScreen = window.innerWidth < 1370;

  if (isPortrait) {
    overlay.classList.remove("hidden");
    mobileControls.style.display = "none";
  } else {
    overlay.classList.add("hidden");
    mobileControls.style.display = isNarrowScreen ? "flex" : "none";
  }
}

window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);

window.addEventListener("keydown", (event) => {
  const key = event.keyCode;
  const blockKeys = [32, 37, 38, 39, 40, 68, 69];
  if (blockKeys.includes(key)) {
    event.preventDefault();
  }
  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (event.keyCode == 38) {
    keyboard.UP = true;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (event.keyCode == 68) {
    keyboard.D = true;
  }
  if (event.keyCode == 69) {
    keyboard.E = true;
  }
});

window.addEventListener("keyup", (event) => {
  const key = event.keyCode;

  if ([32, 37, 38, 39, 40, 68, 69].includes(key)) {
    event.preventDefault();
  }

  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (event.keyCode == 38) {
    keyboard.UP = false;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (event.keyCode == 68) {
    keyboard.D = false;
  }
  if (event.keyCode == 69) {
    keyboard.E = false;
  }
});

function simulateKeyPress(flagName) {
  keyboard[flagName] = true;
}

function simulateKeyRelease(flagName) {
  keyboard[flagName] = false;
}

function setupControlButton(button, flagName) {
  if (!button) return;
  button.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    simulateKeyPress(flagName);
  });
  button.addEventListener("pointerup", () => simulateKeyRelease(flagName));
  button.addEventListener("pointerleave", () => simulateKeyRelease(flagName)); // Finger/Maus geht vom Button
}
