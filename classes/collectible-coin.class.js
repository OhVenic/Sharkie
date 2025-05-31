/**
 * Represents a collectible coin in the game.
 * Inherits from the Collectible class and displays an animated coin.
 */
class Coin extends Collectible {
  /** @type {string[]} Array of image paths for the coin animation */
  IMAGES_COLLECTIBLE = [
    "img/4. Marcadores/1. Coins/1.png",
    "img/4. Marcadores/1. Coins/2.png",
    "img/4. Marcadores/1. Coins/3.png",
    "img/4. Marcadores/1. Coins/4.png",
  ];

  /**
   * Creates a new Coin object at the given position.
   * @param {string} imagePath - The path of the initial image to load.
   * @param {number} x - The x-position of the coin.
   * @param {number} y - The y-position of the coin.
   */
  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.y = y;
    this.x = x;
    this.loadImages(this.IMAGES_COLLECTIBLE);
    this.animate();
  }
}
