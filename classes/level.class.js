class Level {
  enemies;
  backgroundObjects;
  level_end_x = 720*4;

  constructor(enemies, backgroundObjects) {
    this.enemies = enemies;
    this.backgroundObjects = backgroundObjects;
  }
}
