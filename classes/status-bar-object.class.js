/**
 * Represents a status bar for life, poison, or coins.
 * Inherits from {@link DrawableObject}.
 */
class StatusBar extends DrawableObject {
  /**
   * Current percentage value displayed in the bar.
   * @type {number}
   */
  percentage;

  /**
   * Creates a new StatusBar instance.
   * @param {"life" | "poison" | "coins"} [type="life"] - Type of the status bar.
   * @param {number} [x=40] - X position on canvas.
   * @param {number} [y=0] - Y position on canvas.
   */
  constructor(type = "life", x = 40, y = 0) {
    super();
    this.type = type;
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 60;
    this.loadBarImages();
    const defaultPercentage = type === "life" ? 100 : 0;
    this.setPercentage(defaultPercentage);
  }

  /**
   * Loads the image arrays for each status bar type.
   */
  loadBarImages() {
    this.IMAGE_LIFE = [
      `img/4. Marcadores/Purple/0_ .png`,
      `img/4. Marcadores/Purple/20_ .png`,
      `img/4. Marcadores/Purple/40_ .png`,
      `img/4. Marcadores/Purple/60_ .png`,
      `img/4. Marcadores/Purple/80_ .png`,
      `img/4. Marcadores/Purple/100_ .png`,
    ];

    this.IMAGE_POISON = [
      "img/4. Marcadores/Purple/0_.png",
      "img/4. Marcadores/Purple/20_.png",
      "img/4. Marcadores/Purple/40_.png",
      "img/4. Marcadores/Purple/60_.png",
      "img/4. Marcadores/Purple/80_.png",
      "img/4. Marcadores/Purple/100_.png",
    ];

    this.IMAGE_COINS = [
      "img/4. Marcadores/Purple/0_ _1.png",
      "img/4. Marcadores/Purple/20_ _1.png",
      "img/4. Marcadores/Purple/40_ _1.png",
      "img/4. Marcadores/Purple/60_ _1.png",
      "img/4. Marcadores/Purple/80_ _1.png",
      "img/4. Marcadores/Purple/100__1.png",
    ];

    this.imageMap = {
      life: this.IMAGE_LIFE,
      poison: this.IMAGE_POISON,
      coins: this.IMAGE_COINS,
    };

    const images = this.imageMap[this.type];
    this.loadImages(images);
  }

  /**
   * Sets the percentage value and updates the bar image accordingly.
   * @param {number} percentage - New percentage to display (0–100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    const images = this.imageMap[this.type];
    const index = this.resolveImageIndex();
    const path = images[index];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image based on the percentage value.
   * @returns {number} Index of the image in the array.
   */
  resolveImageIndex() {
    if (this.percentage === 100) return 5;
    if (this.percentage === 80) return 4;
    if (this.percentage === 60) return 3;
    if (this.percentage === 40) return 2;
    if (this.percentage === 20) return 1;
    return 0;
  }
}
