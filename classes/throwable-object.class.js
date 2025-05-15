class ThrowableObject extends MovableObject {

markedForDeletion = false

speedx = 0;
type = "bubble";

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
}

  constructor(x, y, speedx, world, type = "bubble") {
    super();
    this.x = x;
    this.y = y;
    this.speedx = speedx;
    this.height = 30;
    this.width = 30;
    this.world = world;
    this.type = type;

    this.loadTypeImage();
    this.throw();
    this.checkDespawn();
  }

  loadTypeImage() {
    if (this.type === "bubble") {
      this.loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    } else if (this.type === "fin") {
      this.img = new Image(); // unsichtbar (leeres Image)
    }
  }

  checkDespawn() {
    if (this.type === "fin") {
      setTimeout(() => this.markedForDeletion = true, 200);
    }
  }

  throw() {
    setInterval(() => {
      this.x += this.speedx;
    }, 1000 / 60);
  }
}
