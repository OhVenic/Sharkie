let canvas;
let world;
let keyboard = new Keyboard();
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


window.addEventListener("keydown", (event) => { 
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