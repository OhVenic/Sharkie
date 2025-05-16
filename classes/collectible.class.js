class Collectible extends BackgroundObject {
  height = 35;
  width = 35;
  x;
  y;

  offset = {

  }

  IMAGES_COLLECTIBLE = [];

  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.y = y;
    this.x = x;
    this.loadImages(this.IMAGES_COLLECTIBLE);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COLLECTIBLE);
    }, 1000 / 8);
  }
}
