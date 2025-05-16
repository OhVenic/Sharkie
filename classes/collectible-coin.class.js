class Coin extends Collectible {
  IMAGES_COLLECTIBLE = [
    "img/4. Marcadores/1. Coins/1.png",
    "img/4. Marcadores/1. Coins/2.png",
    "img/4. Marcadores/1. Coins/3.png",
    "img/4. Marcadores/1. Coins/4.png",
  ];

  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.y = y;
    this.x = x;
    this.loadImages(this.IMAGES_COLLECTIBLE);
    this.animate();
}
}
