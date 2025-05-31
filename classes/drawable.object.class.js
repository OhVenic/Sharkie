/**
 * Base class for all drawable objects on the canvas.
 */
class DrawableObject {
  img;
  imageCache = {}; // Map of cached images
  x = 50;
  y = 230;
  height = 150;
  width = 150;
  currentImage = 0;

  /**
   * Loads a single image and sets it as the current image.
   * @param {string} path - Path to the image file
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads an array of images into the image cache.
   * @param {string[]} arr - Array of image paths
   */
  loadImages(arr) {
    arr.forEach((path) => {
      const img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the object on the canvas.
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  /**
   * Draws the collision frame if the object is one of the specified classes.
   * @param {CanvasRenderingContext2D} ctx
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Pufferfish ||
      this instanceof Endboss ||
      this instanceof ThrowableObject ||
      this instanceof Coin ||
      this instanceof PoisonFlask
    ) {
      const offset = this.offset || { top: 0, right: 0, bottom: 0, left: 0 };

      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + offset.left,
        this.y + offset.top,
        this.width - offset.left - offset.right,
        this.height - offset.top - offset.bottom
      );
      ctx.stroke();
    }
  }
}
