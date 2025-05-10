class Pufferfish extends MovableObject {
  height = 120; // Set the height of the Pufferfish
  width = 120; // Set the width of the Pufferfish
  y = 350; // Set the y position of the Pufferfish
  IMAGES_WALKING = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];

  constructor() {
    super().loadImage(
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png"
    );
    this.x = 250 + Math.random() * 500; // Random x position
    this.speed = 0.05 + Math.random() * 0.15; // Random speed between 0.05 and 0.15
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft(); // Call the moveLeft method to move the Pufferfish
      this.playAnimation(this.IMAGES_WALKING); // Call the playAnimation method to animate the Pufferfish
    }, 150);
  }
}
