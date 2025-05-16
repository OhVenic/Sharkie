class Level {
  enemies;
  backgroundObjects;
  coins;
  poisonFlasks;
  level_end_x = 720*4;

  constructor(enemies, backgroundObjects, coins = [], poisonFlasks = []) {
    this.enemies = enemies;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.poisonFlasks = poisonFlasks;
  }
}
