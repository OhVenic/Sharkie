/**
 * Represents the lila (purple) variant of the jellyfish enemy.
 * Inherits from {@link JellyFish}.
 */
class JellyFishLila extends JellyFish {
  /** @type {string[]} Walking animation image paths */
  IMAGES_WALKING = [
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
  ];

  /** @type {string[]} Poisonous (shock) animation image paths */
  IMAGES_POISONOUS = [
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png",
  ];

  /** @type {string[]} Death animation image paths */
  IMAGES_DEAD = [
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png",
  ];

  /**
   * Creates a new lila jellyfish instance.
   * @param {World} world - Reference to the game world.
   */
  constructor(world) {
    super(world); // ✅ Correct call to super constructor
    this.loadImage("img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png");

    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_POISONOUS);
    this.loadImages(this.IMAGES_DEAD);

    this.animateJellyFish();
  }
}
