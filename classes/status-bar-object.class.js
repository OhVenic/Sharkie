class StatusBar extends DrawableObject {

    IMAGE_LIFE = [
    `img/4. Marcadores/Purple/0_ .png`,
    `img/4. Marcadores/Purple/20_ .png`,
    `img/4. Marcadores/Purple/40_ .png`,
    `img/4. Marcadores/Purple/60_ .png`,
    `img/4. Marcadores/Purple/80_ .png`,
    `img/4. Marcadores/Purple/100_ .png`,
  ]

  IMAGE_POISON = [
        "img/4. Marcadores/Purple/100_.png",
        "img/4. Marcadores/Purple/80_.png",
        "img/4. Marcadores/Purple/60_.png",
        "img/4. Marcadores/Purple/40_.png",
        "img/4. Marcadores/Purple/20_.png",
        "img/4. Marcadores/Purple/0_.png"
  ]
  
  IMAGE_COINS = [
        "img/4. Marcadores/Purple/100__1.png",
        "img/4. Marcadores/Purple/80_ _1.png",
        "img/4. Marcadores/Purple/60_ _1.png",
        "img/4. Marcadores/Purple/40_ _1.png",
        "img/4. Marcadores/Purple/20_ _1.png",
        "img/4. Marcadores/Purple/0_ _1.png",
  ]

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGE_LIFE);
    this.loadImages(this.IMAGE_POISON);
    this.loadImages(this.IMAGE_COINS);
    this.x = 40;
    this.y = 0;
    this.width = 220;
    this.height = 80;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGE_LIFE[this.resolveImageIndex()];
    this.img = this.imageCache[path]
}

    resolveImageIndex() {
          if(this.percentage == 100) {
            return 5;
    } else if(this.percentage == 80) {
            return 4;
    } else if(this.percentage == 60) {
            return 3;
    } else if(this.percentage == 40) {
            return 2;
    } else if(this.percentage == 20) {
            return 1;
    } else {
            return 0;
    }
  }
}