class ThrowableObject extends MovableObject {

speedx = 0;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
}

  throw() {
    setInterval(() => {
      this.x += this.speedx; // Move the object to the left
    }, 1000 / 60); // Move the object to the left at 5 pixels per frame
  }

  constructor(x, y, speedx) {
    super().loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    this.x = x; // Set the x position of the object
    this.y = y; // Set the y position of the object
    this.speedx = speedx
    this.height = 30; // Set the height of the object
    this.width = 30; // Set the width of the object
    this.throw(); // Call the throw method with initial coordinates
  }
}
