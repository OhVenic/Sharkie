class MovableObject {
  x = 50;
  y = 230;
  img;
  height = 150;
  width = 150;
  imageCache = [];
  currentImage = 0; // Index of the current image in the array
  speed = 0.05; // Speed of the object
  otherDirection = false;

  // loadImage("img/test.png");
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
  ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }


  drawFrame(ctx) {
    if(this instanceof Character || this instanceof Pufferfish || this instanceof Endboss) {
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.strokeStyle = "red";
    ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
    ctx.stroke();
    }
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // Ensure the index is within bounds
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
  moveRight() {
   setInterval(() => {
      this.x += this.speed; // Move the object to the left
    }, 1000 / 15); // Move the object to the left at 5 pixels per frame
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed; // Move the object to the left
    }, 1000 / 15); // Move the object to the left at 5 pixels per frame
  }

isColliding(mo) {
  console.log(this.x + this.width - this.offset.right, mo.x - mo.offset.left)
  return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
    this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
    this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
    this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    ;
    
}

}

