let canvas;
let world;
let keyboard = new Keyboard();
let gameIsRunning = true;
let intervals = [];
let backgroundMusic = new Audio('audio/background-music.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.1;

window.onload = () => {
  document.getElementById('start-menu').classList.remove('hidden');
  document.getElementById('controls-screen').classList.add('hidden');
  document.getElementById('canvas').classList.add('hidden');
};

function startGame() {
  document.getElementById('start-menu').classList.add('hidden');
  document.getElementById('canvas').classList.remove('hidden');
  backgroundMusic.play();
  init();
}

function init() {
canvas = document.getElementById("canvas")
  keyboard = new Keyboard();
world = new World(canvas, keyboard);
}

function showControls() {
  document.getElementById('start-menu').classList.add('hidden');
  document.getElementById('controls-screen').classList.remove('hidden');
}

function hideControls() {
  document.getElementById('controls-screen').classList.add('hidden');
  document.getElementById('start-menu').classList.remove('hidden');
}

let isMuted = false;

function toggleMute() {
  isMuted = !isMuted;
  document.getElementById('mute-btn').innerText = isMuted ? '🔇' : '🔊';

  // Add all Sounds here
  [backgroundMusic, world?.character?.swimSound, world?.character?.bubbleSound, world?.character?.finSound, world?.character?.damageSound, world?.coinSound, world?.poisonSound, world?.healSound, world?.enemyDeadSound]
    .forEach(sound => {
      if (sound) sound.muted = isMuted;
    });
}

function showGameOver() {
  document.getElementById('game-over-screen').classList.remove('hidden');
 gameIsRunning = false;
  if (backgroundMusic) backgroundMusic.pause();
}

function showGameWon() {
  document.getElementById('game-won-screen').classList.remove('hidden');
  gameIsRunning = false;
  if (backgroundMusic) backgroundMusic.pause();
}

function restartGame() {
  document.getElementById('game-over-screen').classList.add('hidden');
  document.getElementById('game-won-screen').classList.add('hidden');
  gameIsRunning = true;

  intervals.forEach(clearInterval);
  intervals = [];

  if (world) {
    world = null;
  }

  init();
  backgroundMusic.currentTime = 0;
  if (!isMuted) backgroundMusic.play();
}


window.addEventListener("keydown", (event) => { 
    const key = event.keyCode
      const blockKeys = [32, 37, 38, 39, 40, 68, 69];
  if (blockKeys.includes(key)) {
    event.preventDefault();
  }
    if(event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if(event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if(event.keyCode == 38) {
        keyboard.UP = true;
    }
    if(event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if(event.keyCode == 32) {
        keyboard.SPACE = true;
    }
     if(event.keyCode == 68) {
        keyboard.D = true;
    } 
    if(event.keyCode == 69) {
        keyboard.E = true;
    }
})

window.addEventListener("keyup", (event) => {
      const key = event.keyCode;

  if ([32, 37, 38, 39, 40, 68, 69].includes(key)) {
    event.preventDefault(); // optional hier auch
  }

    if(event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if(event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if(event.keyCode == 38) {
        keyboard.UP = false;
    }
    if(event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if(event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if(event.keyCode == 68) {
        keyboard.D = false;
    }
    if(event.keyCode == 69) {
        keyboard.E = false;
    }
})