/**
 * Global canvas element.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Global game world instance.
 * @type {World}
 */
let world;

/**
 * Keyboard input tracking object.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Game state flag.
 * @type {boolean}
 */
let gameIsRunning = false;

/**
 * Array to store all running intervals.
 * @type {number[]}
 */
let intervals = [];

/**
 * Background music for the game.
 * @type {HTMLAudioElement}
 */
let backgroundMusic = new Audio("audio/background-music.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.1;

/**
 * Sets up the UI and control button events on window load.
 */
window.onload = () => {
  document.getElementById("start-menu").classList.remove("hidden");
  document.getElementById("controls-screen").classList.add("hidden");
  document.getElementById("canvas").classList.add("hidden");

  const savedMute = localStorage.getItem("isMuted");
  isMuted = savedMute === "true";

  document.getElementById("mute-btn").innerText = isMuted ? "🔇" : "🔊";
  backgroundMusic.muted = isMuted;

  setupControlButton(document.getElementById("btn-left"), "LEFT");
  setupControlButton(document.getElementById("btn-right"), "RIGHT");
  setupControlButton(document.getElementById("btn-up"), "UP");
  setupControlButton(document.getElementById("btn-down"), "DOWN");
  setupControlButton(document.getElementById("btn-bubble"), "D");
  setupControlButton(document.getElementById("btn-fin"), "SPACE");
  setupControlButton(document.getElementById("btn-heal"), "E");
};

/**
 * Starts the game and shows the canvas.
 */
function startGame() {
  document.getElementById("start-menu").classList.add("hidden");
  document.getElementById("canvas").classList.remove("hidden");
  document.getElementById("game-container").classList.remove("hidden");
  backgroundMusic.play();
  init();
}

/**
 * Initializes the game world and sets sounds according to mute state.
 */
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

/**
 * Shows the controls screen.
 */
function showControls() {
  document.getElementById("start-menu").classList.add("hidden");
  document.getElementById("controls-screen").classList.remove("hidden");
}

/**
 * Hides the controls screen.
 */
function hideControls() {
  document.getElementById("controls-screen").classList.add("hidden");
  document.getElementById("start-menu").classList.remove("hidden");
}

/**
 * Shows the imprint screen.
 */
function showImprint() {
  document.getElementById("start-menu").classList.add("hidden");
  document.getElementById("imprint-screen").classList.remove("hidden");
}

/**
 * Hides the imprint screen.
 */
function hideImprint() {
  document.getElementById("imprint-screen").classList.add("hidden");
  document.getElementById("start-menu").classList.remove("hidden");
}

/**
 * Mute state flag.
 * @type {boolean}
 */
let isMuted = false;

/**
 * Toggles the game's mute state and updates all sounds.
 */
function toggleMute() {
  isMuted = !isMuted;
  localStorage.setItem("isMuted", isMuted);
  document.getElementById("mute-btn").innerText = isMuted ? "🔇" : "🔊";

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

/**
 * Shows the game over screen and pauses music.
 */
function showGameOver() {
  document.getElementById("game-over-screen").classList.remove("hidden");
  gameIsRunning = false;
  if (backgroundMusic) backgroundMusic.pause();
}

/**
 * Shows the game won screen and pauses music.
 */
function showGameWon() {
  document.getElementById("game-won-screen").classList.remove("hidden");
  gameIsRunning = false;
  if (backgroundMusic) backgroundMusic.pause();
}

/**
 * Restarts the game by resetting state, intervals, and audio.
 */
function restartGame() {
  document.getElementById("game-over-screen").classList.add("hidden");
  document.getElementById("game-won-screen").classList.add("hidden");
  gameIsRunning = true;

  intervals.forEach(clearInterval);
  intervals = [];
  world = null;

  init();
  backgroundMusic.currentTime = 0;
  backgroundMusic.muted = isMuted;
  if (!isMuted) backgroundMusic.play();
}

/**
 * Checks screen orientation and toggles UI elements for mobile.
 */
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

/**
 * Handles keydown events and updates keyboard input state.
 * @param {KeyboardEvent} event
 */
window.addEventListener("keydown", (event) => {
  const key = event.keyCode;
  const blockKeys = [32, 37, 38, 39, 40, 68, 69];
  if (blockKeys.includes(key)) {
    event.preventDefault();
  }

  if (key === 39) keyboard.RIGHT = true;
  if (key === 37) keyboard.LEFT = true;
  if (key === 38) keyboard.UP = true;
  if (key === 40) keyboard.DOWN = true;
  if (key === 32) keyboard.SPACE = true;
  if (key === 68) keyboard.D = true;
  if (key === 69) keyboard.E = true;
});

/**
 * Handles keyup events and resets keyboard input state.
 * @param {KeyboardEvent} event
 */
window.addEventListener("keyup", (event) => {
  const key = event.keyCode;

  if ([32, 37, 38, 39, 40, 68, 69].includes(key)) {
    event.preventDefault();
  }

  if (key === 39) keyboard.RIGHT = false;
  if (key === 37) keyboard.LEFT = false;
  if (key === 38) keyboard.UP = false;
  if (key === 40) keyboard.DOWN = false;
  if (key === 32) keyboard.SPACE = false;
  if (key === 68) keyboard.D = false;
  if (key === 69) keyboard.E = false;
});

/**
 * Simulates key press for mobile controls.
 * @param {string} flagName - The keyboard flag to activate.
 */
function simulateKeyPress(flagName) {
  keyboard[flagName] = true;
}

/**
 * Simulates key release for mobile controls.
 * @param {string} flagName - The keyboard flag to deactivate.
 */
function simulateKeyRelease(flagName) {
  keyboard[flagName] = false;
}

/**
 * Sets up event listeners for a mobile control button.
 * @param {HTMLElement} button - The button element.
 * @param {string} flagName - The flag name to simulate.
 */
function setupControlButton(button, flagName) {
  if (!button) return;
  button.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    simulateKeyPress(flagName);
  });
  button.addEventListener("pointerup", () => simulateKeyRelease(flagName));
  button.addEventListener("pointerleave", () => simulateKeyRelease(flagName));
}
