class Collectible extends MovableObject {
  height = 35;
  width = 35;
  x;
  y;

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }

  constructor(x, y) {
    super()
    this.y = y;
    this.x = x;
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COLLECTIBLE);
    }, 1000 / 8);
  }
}
