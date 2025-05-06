class Light extends MovableObject {

    x = 300;
    y = 0;
    width = 720; // Set the width of the light
    height = 480; // Set the height of the light

    constructor() {
        super().loadImage("img/3. Background/Layers/1. Light/1.png");
        this.animate()
  }

  animate() {
    setInterval(() => {
      this.x -= 0.15;
  }, 1000 / 60); // Move the light to the left at 5 pixels per frame
  }
}