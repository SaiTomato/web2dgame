import Phaser from 'phaser';

export class Player {
  sprite: Phaser.GameObjects.Rectangle;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  private lastX: number;
  private lastY: number;

  constructor(
    private scene: Phaser.Scene,
    x: number,
    y: number,
    enableInput = false // 👈 是否本地玩家
  ) {
    this.sprite = scene.add.rectangle(x, y, 32, 32, 0x00ff00);

    if (enableInput) {
      this.cursors = scene.input.keyboard!.createCursorKeys();
    }

    this.lastX = x;
    this.lastY = y;
  }

  update(): boolean {
    if (!this.cursors) return false;

    const speed = 2;
    let moved = false;

    if (this.cursors.left.isDown) {
      this.sprite.x -= speed;
      moved = true;
    }
    if (this.cursors.right.isDown) {
      this.sprite.x += speed;
      moved = true;
    }
    if (this.cursors.up.isDown) {
      this.sprite.y -= speed;
      moved = true;
    }
    if (this.cursors.down.isDown) {
      this.sprite.y += speed;
      moved = true;
    }

    return moved;
  }

  setPosition(x: number, y: number) {
    this.sprite.setPosition(x, y);
  }

  get x() {
    return this.sprite.x;
  }

  get y() {
    return this.sprite.y;
  }
}