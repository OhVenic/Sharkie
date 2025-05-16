class StatusBar extends DrawableObject {
  percentage;

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

    setPercentage(percentage) {
    this.percentage = percentage;
    const images = this.imageMap[this.type];
    const index = this.resolveImageIndex();
    const path = images[index];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage === 100) return 5;
    if (this.percentage === 80) return 4;
    if (this.percentage === 60) return 3;
    if (this.percentage === 40) return 2;
    if (this.percentage === 20) return 1;
    return 0;
  }
}
