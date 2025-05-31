/**
 * Represents a level in the game, containing enemies, background, and collectibles.
 */
class Level {
  /**
   * Array of enemy objects (e.g., Pufferfish, Jellyfish, Endboss).
   * @type {MovableObject[]}
   */
  enemies;

  /**
   * Array of background objects used for rendering the level's scenery.
   * @type {BackgroundObject[]}
   */
  backgroundObjects;

  /**
   * Array of collectible coin objects.
   * @type {Coin[]}
   */
  coins;

  /**
   * Array of collectible poison flask objects.
   * @type {PoisonFlask[]}
   */
  poisonFlasks;

  /**
   * Defines the horizontal end position of the level (used for camera/scrolling).
   * @type {number}
   */
  level_end_x = 720 * 4;

  /**
   * Creates a new level instance with all required elements.
   * @param {MovableObject[]} enemies - Array of enemy objects.
   * @param {BackgroundObject[]} backgroundObjects - Array of background objects.
   * @param {Coin[]} [coins=[]] - Optional array of coin objects.
   * @param {PoisonFlask[]} [poisonFlasks=[]] - Optional array of poison flask objects.
   */
  constructor(enemies, backgroundObjects, coins = [], poisonFlasks = []) {
    this.enemies = enemies;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.poisonFlasks = poisonFlasks;
  }
}
