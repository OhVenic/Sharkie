/**
 * Represents the yellow variant of the jellyfish enemy.
 * Inherits from {@link JellyFish}.
 */
class JellyFishYellow extends JellyFish {
  /** @type {number} Width of the yellow jellyfish */
  width = 80;

  /** @type {number} Height of the yellow jellyfish */
  height = 80;

  /** @type {string[]} Walking animation image paths */
  IMAGES_WALKING = [
    "img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png",
  ];

  /** @type {string[]} Poisonous (dangerous) animation image paths */
  IMAGES_POISONOUS = [
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png",
  ];

  /** @type {string[]} Death animation image paths */
  IMAGES_DEAD = [
    "img/2.Enemy/2 Jelly fish/Dead/green/g1.png",
    "img/2.Enemy/2 Jelly fish/Dead/green/g2.png",
    "img/2.Enemy/2 Jelly fish/Dead/green/g3.png",
    "img/2.Enemy/2 Jelly fish/Dead/green/g4.png",
  ];

  /**
   * Creates a new yellow jellyfish instance.
   * @param {World} world - Reference to the game world.
   */
  constructor(world) {
    super(world); // ✅ call parent constructor correctly
    this.loadImage("img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png");

    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_POISONOUS);
    this.loadImages(this.IMAGES_DEAD);

    this.animateJellyFish();
  }
}
