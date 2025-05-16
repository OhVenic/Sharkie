class Level {
  enemies;
  backgroundObjects;
  collectibles;
  level_end_x = 720*4;

  constructor(enemies, backgroundObjects, collectibles) {
    this.enemies = enemies;
    this.backgroundObjects = backgroundObjects;
    this.collectibles = collectibles;
  }
}
