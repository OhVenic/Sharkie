/**
 * Represents a collectible poison flask item in the game.
 * Inherits from the Collectible class and animates its image sequence.
 */
class PoisonFlask extends Collectible {
  /** @type {number} The height of the poison flask */
  height = 60;

  /** @type {number} The width of the poison flask */
  width = 45;

  /** @type {string[]} Array of image paths for the poison flask animation */
  IMAGES_COLLECTIBLE = [
    "img/4. Marcadores/Posión/Animada/1.png",
    "img/4. Marcadores/Posión/Animada/2.png",
    "img/4. Marcadores/Posión/Animada/3.png",
    "img/4. Marcadores/Posión/Animada/4.png",
    "img/4. Marcadores/Posión/Animada/5.png",
    "img/4. Marcadores/Posión/Animada/6.png",
    "img/4. Marcadores/Posión/Animada/7.png",
    "img/4. Marcadores/Posión/Animada/8.png",
  ];

  /**
   * Creates a new PoisonFlask object at the given position.
   * @param {string} imagePath - The path of the initial image to load.
   * @param {number} x - The x-position of the flask.
   * @param {number} y - The y-position of the flask.
   */
  constructor(imagePath, x, y) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.y = y;
    this.loadImages(this.IMAGES_COLLECTIBLE);
    this.animate();
  }
}
