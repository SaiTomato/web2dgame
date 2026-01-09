import Phaser from 'phaser';

export class Player {
  sprite: Phaser.GameObjects.Rectangle;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(private scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.add.rectangle(x, y, 32, 32, 0x00ff00);
    this.cursors = scene.input.keyboard!.createCursorKeys();
  }

  update() {
    const speed = 2;

    if (this.cursors.left.isDown) this.sprite.x -= speed;
    if (this.cursors.right.isDown) this.sprite.x += speed;
    if (this.cursors.up.isDown) this.sprite.y -= speed;
    if (this.cursors.down.isDown) this.sprite.y += speed;
  }
}