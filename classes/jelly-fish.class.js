/**
 * Represents a jellyfish enemy that can poison the player.
 * Inherits from {@link Pufferfish}.
 */
class JellyFish extends Pufferfish {
  /** @type {number} Width of the jellyfish */
  width = 100;

  /** @type {number} Height of the jellyfish */
  height = 100;

  /**
   * Offset configuration for collision detection.
   * @type {{top: number, bottom: number, left: number, right: number}}
   */
  offset = {
    top: 10,
    bottom: 30,
    left: 10,
    right: 20,
  };

  /** @type {string[]} Walking animation images */
  IMAGES_WALKING = [];

  /** @type {string[]} Poisonous (shock) animation images */
  IMAGES_POISONOUS = [];

  /** @type {string[]} Death animation images */
  IMAGES_DEAD = [];

  /**
   * Creates a new jellyfish instance.
   * @param {World} world - Reference to the game world.
   */
  constructor(world) {
    super(world); // ✅ Proper call to parent constructor
    this.loadImage("img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png");

    this.world = world;
    this.x = 350 + Math.random() * 2500;
    this.speed = 0.25 + Math.random() * 0.15;
    this.y = 400 - Math.random() * 400;

    this.animateJellyFish();
  }

  /**
   * Starts movement and animation loop for the jellyfish.
   * Switches animation if colliding with the player.
   */
  animateJellyFish() {
    this.moveJellyFish();

    setInterval(() => {
      if (!gameIsRunning || this.dead) return;

      if (this.isColliding(this.world.character)) {
        this.playAnimation(this.IMAGES_POISONOUS);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 150);
  }

  /**
   * Plays the jellyfish death animation and executes a callback when done.
   * @param {Function} [callback] - Optional callback function after death animation.
   */
  jellyFishDie(callback) {
    if (this.dead) return;
    this.dead = true;
    let i = 0;

    let deathInterval = setInterval(() => {
      if (!gameIsRunning) return;
      this.speed = 0;
      this.y -= 2;
      this.img = this.imageCache[this.IMAGES_DEAD[i]];
      i++;

      if (i >= this.IMAGES_DEAD.length) {
        clearInterval(deathInterval);
        if (callback) callback();
      }
    }, 1000 / 5);
  }
}
