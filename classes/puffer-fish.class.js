/**
 * Represents a Pufferfish enemy in the game.
 * Inherits from {@link MovableObject}.
 */
class Pufferfish extends MovableObject {
  /** @type {number} Height of the pufferfish */
  height = 100;

  /** @type {number} Width of the pufferfish */
  width = 100;

  /** @type {number} Y position of the pufferfish */
  y = 350;

  /** @type {boolean} Indicates if a transition animation is currently running */
  transitionRunning = false;

  /** @type {boolean} Indicates if the pufferfish is dead */
  dead = false;

  /** @type {string[]} Walking animation image paths */
  IMAGES_WALKING = [];

  /** @type {string[]} Transition animation image paths */
  IMAGES_TRANSITION = [];

  /** @type {string[]} Bubble swim animation image paths */
  IMAGES_BUBBLESWIM = [];

  /** @type {string[]} Dead animation image paths */
  IMAGES_DEAD = [];

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

  /**
   * Creates a new instance of Pufferfish.
   * @param {World} world - Reference to the game world.
   */
  constructor(world) {
    super();
    this.world = world;
    this.x = 350 + Math.random() * 2500;
    this.speed = 0.25 + Math.random() * 0.15;
    this.y = 400 - Math.random() * 400;
  }

  /**
   * Triggers the death animation and shrinks the pufferfish before removal.
   * @param {Function} [callback] - Optional callback to run after animation ends.
   */
  die(callback) {
    if (this.dead) return;
    this.dead = true;
    let i = 0;

    let deathInterval = setInterval(() => {
      this.width -= 5;
      this.height -= 5;
      this.y -= 5;
      this.x += 15;
      this.img = this.imageCache[this.IMAGES_DEAD[i]];
      i++;

      if (i >= this.IMAGES_DEAD.length) {
        clearInterval(deathInterval);
        if (callback) callback();
      }
    }, 1000 / 20);
  }

  /**
   * Starts the animation cycle of the pufferfish, including transition and bubble swim phases.
   */
  animate() {
    let currentImages = this.IMAGES_WALKING;
    let currentImageIndex = 0;
    let transitionRunning = false;

    this.moveLeft();

    setInterval(() => {
      if (this.dead) return;

      if (this.isColliding(this.world.character) && !transitionRunning) {
        transitionRunning = true;
        currentImages = this.IMAGES_TRANSITION;
        currentImageIndex = 0;
      }

      this.img = this.imageCache[currentImages[currentImageIndex]];
      currentImageIndex++;

      if (currentImageIndex >= currentImages.length) {
        if (transitionRunning) {
          currentImages = this.IMAGES_BUBBLESWIM;
          currentImageIndex = 0;
        } else {
          currentImageIndex = 0;
        }
      }
    }, 1000 / 8);
  }
}
